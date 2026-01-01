import * as vscode from 'vscode';
import { PythonEnvironment } from '../core/pythonEnvironment';

/**
 * Manages all command registrations for the extension
 */
export class CommandManager {
    private context: vscode.ExtensionContext;
    private pythonEnv: PythonEnvironment;

    constructor(context: vscode.ExtensionContext, pythonEnv: PythonEnvironment) {
        this.context = context;
        this.pythonEnv = pythonEnv;
    }

    /**
     * Register all extension commands
     */
    registerCommands(): void {
        // Run All Features
        this.context.subscriptions.push(
            vscode.commands.registerCommand('bonnie.runAllFeatures', async () => {
                await this.runAllFeatures();
            })
        );

        // Run Current Feature
        this.context.subscriptions.push(
            vscode.commands.registerCommand('bonnie.runCurrentFeature', async () => {
                await this.runCurrentFeature();
            })
        );

        // Run Scenario Under Cursor
        this.context.subscriptions.push(
            vscode.commands.registerCommand('bonnie.runScenarioUnderCursor', async () => {
                await this.runScenarioUnderCursor();
            })
        );
    }

    /**
     * Run all Behave features
     */
    private async runAllFeatures(): Promise<void> {
        const pythonPath = this.pythonEnv.getPythonPath();
        
        if (!pythonPath) {
            vscode.window.showErrorMessage('Python interpreter not found. Please configure in settings.');
            return;
        }

        const envInfo = this.pythonEnv.getInfo();
        if (!envInfo.behaveInstalled) {
            vscode.window.showErrorMessage('Behave is not installed in the current Python environment.');
            return;
        }

        // Get workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        // Get additional behave arguments from configuration
        const additionalArgs = vscode.workspace.getConfiguration('bonnie').get<string[]>('behaveArgs') || [];
        
        // Build command
        const command = `"${pythonPath}" -m behave ${additionalArgs.join(' ')}`;

        // Create terminal and run
        const terminal = vscode.window.createTerminal({
            name: 'Bonnie - Run All Features',
            cwd: workspaceFolder.uri.fsPath
        });
        terminal.show();
        terminal.sendText(command);
    }

    /**
     * Run current feature file
     */
    private async runCurrentFeature(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor.');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'feature') {
            vscode.window.showErrorMessage('Current file is not a feature file.');
            return;
        }

        const pythonPath = this.pythonEnv.getPythonPath();
        if (!pythonPath) {
            vscode.window.showErrorMessage('Python interpreter not found. Please configure in settings.');
            return;
        }

        const envInfo = this.pythonEnv.getInfo();
        if (!envInfo.behaveInstalled) {
            vscode.window.showErrorMessage('Behave is not installed in the current Python environment.');
            return;
        }

        // Get workspace folder
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('File is not in a workspace folder.');
            return;
        }

        // Get relative path to feature file
        const relativePath = vscode.workspace.asRelativePath(document.uri);
        
        // Get additional behave arguments from configuration
        const additionalArgs = vscode.workspace.getConfiguration('bonnie').get<string[]>('behaveArgs') || [];
        
        // Build command
        const command = `"${pythonPath}" -m behave "${relativePath}" ${additionalArgs.join(' ')}`;

        // Create terminal and run
        const terminal = vscode.window.createTerminal({
            name: 'Bonnie - Run Feature',
            cwd: workspaceFolder.uri.fsPath
        });
        terminal.show();
        terminal.sendText(command);
    }

    /**
     * Run scenario under cursor
     */
    private async runScenarioUnderCursor(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor.');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'feature') {
            vscode.window.showErrorMessage('Current file is not a feature file.');
            return;
        }

        const pythonPath = this.pythonEnv.getPythonPath();
        if (!pythonPath) {
            vscode.window.showErrorMessage('Python interpreter not found. Please configure in settings.');
            return;
        }

        const envInfo = this.pythonEnv.getInfo();
        if (!envInfo.behaveInstalled) {
            vscode.window.showErrorMessage('Behave is not installed in the current Python environment.');
            return;
        }

        // Find scenario name at cursor position
        const cursorLine = editor.selection.active.line;
        let scenarioLine = -1;
        let scenarioName = '';

        // Search backwards for Scenario: or Scenario Outline:
        for (let i = cursorLine; i >= 0; i--) {
            const line = document.lineAt(i).text.trim();
            const match = line.match(/^(Scenario|Scenario Outline):\s*(.+)$/);
            if (match) {
                scenarioLine = i + 1; // Behave uses 1-based line numbers
                scenarioName = match[2];
                break;
            }
        }

        if (scenarioLine === -1) {
            vscode.window.showErrorMessage('No scenario found at cursor position.');
            return;
        }

        // Get workspace folder
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('File is not in a workspace folder.');
            return;
        }

        // Get relative path to feature file
        const relativePath = vscode.workspace.asRelativePath(document.uri);
        
        // Get additional behave arguments from configuration
        const additionalArgs = vscode.workspace.getConfiguration('bonnie').get<string[]>('behaveArgs') || [];
        
        // Build command with line number to run specific scenario
        const command = `"${pythonPath}" -m behave "${relativePath}:${scenarioLine}" ${additionalArgs.join(' ')}`;

        // Create terminal and run
        const terminal = vscode.window.createTerminal({
            name: `Bonnie - ${scenarioName}`,
            cwd: workspaceFolder.uri.fsPath
        });
        terminal.show();
        terminal.sendText(command);
    }
}
