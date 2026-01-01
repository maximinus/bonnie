import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface PythonEnvironmentInfo {
    pythonPath: string | null;
    version: string | null;
    behaveInstalled: boolean;
    behaveVersion: string | null;
}

type EnvironmentChangedCallback = (info: PythonEnvironmentInfo) => void;

/**
 * Manages Python environment detection and monitoring
 */
export class PythonEnvironment {
    private pythonInfo: PythonEnvironmentInfo = {
        pythonPath: null,
        version: null,
        behaveInstalled: false,
        behaveVersion: null
    };
    private callbacks: EnvironmentChangedCallback[] = [];
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * Initialize Python environment detection
     */
    async initialize(): Promise<void> {
        // Try to get Python path from configuration
        const configuredPath = vscode.workspace.getConfiguration('bonnie').get<string>('pythonPath');
        
        if (configuredPath) {
            await this.detectEnvironment(configuredPath);
        } else {
            // Try to get from Python extension
            await this.detectFromPythonExtension();
        }

        // Watch for configuration changes
        this.context.subscriptions.push(
            vscode.workspace.onDidChangeConfiguration(e => {
                if (e.affectsConfiguration('bonnie.pythonPath')) {
                    this.initialize();
                }
            })
        );
    }

    /**
     * Detect Python environment from VS Code Python extension
     */
    private async detectFromPythonExtension(): Promise<void> {
        try {
            const pythonExtension = vscode.extensions.getExtension('ms-python.python');
            
            if (pythonExtension) {
                if (!pythonExtension.isActive) {
                    await pythonExtension.activate();
                }

                const pythonApi = pythonExtension.exports;
                if (pythonApi && pythonApi.settings) {
                    const pythonPath = pythonApi.settings.getExecutionDetails?.()?.execCommand?.[0];
                    if (pythonPath) {
                        await this.detectEnvironment(pythonPath);
                        return;
                    }
                }
            }
        } catch (error) {
            // Python extension not available or error accessing it
        }

        // Fallback: try 'python' command
        await this.detectEnvironment('python');
    }

    /**
     * Detect environment details for a given Python path
     */
    private async detectEnvironment(pythonPath: string): Promise<void> {
        try {
            // Get Python version
            const versionResult = await execAsync(`"${pythonPath}" --version`);
            const versionMatch = versionResult.stdout.match(/Python (\d+\.\d+\.\d+)/);
            const version = versionMatch ? versionMatch[1] : null;

            // Check if behave is installed
            let behaveInstalled = false;
            let behaveVersion: string | null = null;

            try {
                const behaveResult = await execAsync(`"${pythonPath}" -m behave --version`);
                behaveInstalled = true;
                const behaveMatch = behaveResult.stdout.match(/(\d+\.\d+\.\d+)/);
                behaveVersion = behaveMatch ? behaveMatch[1] : 'installed';
            } catch {
                behaveInstalled = false;
            }

            this.pythonInfo = {
                pythonPath,
                version,
                behaveInstalled,
                behaveVersion
            };

        } catch (error) {
            this.pythonInfo = {
                pythonPath: null,
                version: null,
                behaveInstalled: false,
                behaveVersion: null
            };
        }

        // Notify callbacks
        this.notifyCallbacks();
    }

    /**
     * Register callback for environment changes
     */
    onEnvironmentChanged(callback: EnvironmentChangedCallback): void {
        this.callbacks.push(callback);
        // Immediately call with current info
        callback(this.pythonInfo);
    }

    /**
     * Notify all registered callbacks
     */
    private notifyCallbacks(): void {
        this.callbacks.forEach(callback => callback(this.pythonInfo));
    }

    /**
     * Get current Python environment info
     */
    getInfo(): PythonEnvironmentInfo {
        return { ...this.pythonInfo };
    }

    /**
     * Get Python path for running commands
     */
    getPythonPath(): string | null {
        return this.pythonInfo.pythonPath;
    }
}
