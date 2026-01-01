# Bonnie

> A Visual Studio Code extension for Python Behave BDD development

**Bonnie** enhances your Behavior-Driven Development workflow by providing intelligent tooling for Gherkin feature files and Python step definitions in VS Code.

## 🎯 Project Status

**Current Phase:** Planning & Setup  
**Version:** 0.0.1-dev  
**Status:** 🚧 In Development

✅ Phase 0 Complete: Example project and planning documentation  
🔄 Phase 1 Next: Extension scaffolding and core setup

## ✨ Planned Features

- **Execution** - Run Behave tests directly from VS Code (all features, current file, or scenario under cursor)
- **Navigation** - Jump to step definitions with F12, hover for implementation details
- **Intelligence** - Autocomplete step text as you type with smart suggestions
- **Code Generation** - Automatically generate missing step definition stubs
- **Test Explorer** - Visual tree view of features and scenarios with run controls
- **Diagnostics** - Real-time detection of undefined steps and duplicate definitions
- **Tag Management** - Toggle and filter tests by tags (@smoke, @wip, etc.)
- **Formatting** - Auto-format feature files, align tables, and organize tags
- **Debugging** - Full debugging support with breakpoints in step definitions

See [docs/features.md](docs/features.md) for the complete feature list.

## 📋 Documentation

- [Implementation Plan](docs/plan_outline.md) - Detailed development roadmap
- [Feature Requirements](docs/features.md) - Complete feature specifications
- [Changelog](CHANGELOG.md) - Project progress and updates
- [Example Project](example/README.md) - Sample Behave project for testing

## 🚀 Quick Start (Future)

Once released, you'll be able to:

1. Install the extension from VS Code Marketplace
2. Open a Python project with Behave tests
3. Start writing `.feature` files with full IntelliSense support
4. Run tests with CodeLens "Run" buttons or command palette

## 🛠️ Development

This extension is currently in early development. The project structure:

```
bonnie/
├── docs/              # Documentation and planning
├── example/           # Sample Behave project for testing
└── README.md          # This file
```

**Tech Stack:** TypeScript, webpack, VS Code Extension API

## 📅 Timeline

- **Milestone 0** ✅ Complete (Jan 2026) - Planning & example project
- **Milestone 1** (2-3 weeks) - MVP: Basic execution and navigation
- **Milestone 2** (3-4 weeks) - Enhanced: CodeLens, autocomplete, test explorer
- **Milestone 3** (2-3 weeks) - Code generation and quick fixes
- **Milestone 4** (3-4 weeks) - Advanced features and debugging
- **Milestone 5** (2 weeks) - Polish and marketplace release

**Estimated Total:** 12-16 weeks

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This project is in early development. Contribution guidelines will be added as the project matures.

---

**Note:** This extension is under active development and not yet available for public use.
