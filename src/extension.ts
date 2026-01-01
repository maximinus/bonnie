import * as vscode from 'vscode';
import { PythonEnvironment } from './core/pythonEnvironment';
import { CommandManager } from './commands/commandManager';

/**
 * Extension activation
 * Called when the extension is activated
 */
export async function activate(context: vscode.ExtensionContext) {
    console.log('Bonnie extension is now active!');

    // Show welcome message on first activation
    const hasShownWelcome = context.globalState.get<boolean>('bonnie.hasShownWelcome');
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            'Welcome to Bonnie! Your Behave BDD development companion is ready.'
        );
        await context.globalState.update('bonnie.hasShownWelcome', true);
    }

    // Initialize Python environment detection
    const pythonEnv = new PythonEnvironment(context);
    await pythonEnv.initialize();

    // Display Python/Behave version in status bar
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        100
    );
    statusBarItem.text = '$(python) Bonnie: Detecting...';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Update status bar with detected environment
    pythonEnv.onEnvironmentChanged((info) => {
        if (info.pythonPath) {
            statusBarItem.text = `$(python) Python ${info.version || 'detected'}`;
            statusBarItem.tooltip = `Python: ${info.pythonPath}\nBehave: ${info.behaveInstalled ? 'installed' : 'not found'}`;
        } else {
            statusBarItem.text = '$(warning) Python not found';
            statusBarItem.tooltip = 'Python interpreter not detected. Configure in settings.';
        }
    });

    // Register commands
    const commandManager = new CommandManager(context, pythonEnv);
    commandManager.registerCommands();

    console.log('Bonnie extension activation complete');
}

/**
 * Extension deactivation
 * Called when the extension is deactivated
 */
export function deactivate() {
    console.log('Bonnie extension deactivated');
}
