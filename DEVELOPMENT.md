# Bonnie Extension Development

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run compile
```

Or watch for changes:
```bash
npm run watch
```

## Running the Extension

1. Press F5 in VS Code to open the Extension Development Host
2. The extension will load with the `example/` folder as the test workspace
3. Open a `.feature` file to activate the extension

## Testing

Test the extension with the example project:
- Open `example/calculator.feature`
- Use Command Palette (Ctrl+Shift+P / Cmd+Shift+P):
  - "Bonnie: Run All Features"
  - "Bonnie: Run Current Feature"
  - "Bonnie: Run Scenario Under Cursor"

## Project Structure

```
bonnie/
├── src/
│   ├── extension.ts              # Extension entry point
│   ├── core/
│   │   └── pythonEnvironment.ts  # Python detection
│   └── commands/
│       └── commandManager.ts     # Command handlers
├── .vscode/
│   ├── launch.json              # Debug configuration
│   └── tasks.json               # Build tasks
├── package.json                 # Extension manifest
├── tsconfig.json                # TypeScript configuration
└── webpack.config.js            # Webpack bundler config
```

## Development Workflow

1. Make changes to TypeScript files in `src/`
2. Run `npm run watch` to automatically recompile
3. Press F5 to launch Extension Development Host
4. Test changes in the development window
5. Reload window (Ctrl+R / Cmd+R) after code changes

## Phase 1 Implementation Status

### 1.1 Extension Scaffolding ✅
- [x] TypeScript project structure
- [x] Webpack configuration
- [x] Extension entry point with activation
- [x] Package.json with extension metadata
- [x] Development environment (launch.json, tasks.json)

### 1.2 Python Environment Detection ✅
- [x] Python interpreter detection module
- [x] VS Code Python extension integration
- [x] Fallback detection methods
- [x] Configuration settings for manual override
- [x] Status bar indicator showing Python/Behave version
- [x] Behave installation verification

### Commands Implemented ✅
- [x] Run All Features
- [x] Run Current Feature
- [x] Run Scenario Under Cursor

## Next Steps

Ready to proceed to **Phase 2: Gherkin Language Support**
- Feature file parsing
- Syntax highlighting
- Document outline
- Snippets
