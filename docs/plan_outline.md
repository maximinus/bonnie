# Bonnie - VS Code Behave Extension Implementation Plan

## Project Overview

A Visual Studio Code extension to enhance the development experience for Python Behave (BDD) projects, providing intelligent tooling for Gherkin feature files and Python step definitions.

---

## Phase 0: Example BDD Project Setup

**Purpose:** Create a simple, working Behave project in the `example/` subdirectory to use as a test bed during extension development.

### 0.1 Project Structure
```
example/
├── features/
│   ├── calculator.feature
│   ├── login.feature
│   ├── steps/
│   │   ├── calculator_steps.py
│   │   ├── login_steps.py
│   │   └── common_steps.py
│   └── environment.py
├── requirements.txt
├── behave.ini
└── README.md
```

### 0.2 Test Scenarios
Create feature files covering various testing needs:

**calculator.feature:**
- Basic arithmetic operations
- Scenario Outline with Examples table
- Multiple scenarios in one feature
- Tags (@smoke, @calculator)

**login.feature:**
- User authentication scenarios
- Background section
- Undefined steps (intentionally left unimplemented)
- Tags (@wip, @login)

### 0.3 Step Definitions
- Implement calculator steps with regex patterns
- Implement partial login steps (leave some undefined)
- Create common reusable steps
- Use different parameter styles (regex groups, parse expressions)

### 0.4 Configuration
- `behave.ini` with multiple profiles (dev, ci, smoke)
- `requirements.txt` with behave and dependencies
- Simple `environment.py` for hooks

### 0.5 Deliverables
- ✅ Fully functional Behave project
- ✅ Mix of passing and failing tests
- ✅ Some undefined steps for testing stub generation
- ✅ Examples of all Gherkin constructs
- ✅ Documentation on how to run tests

**Timeline:** 1 day

---

## Phase 1: Foundation & Core Setup

### 1.1 Extension Scaffolding
- **Technology Stack:** TypeScript
- **Build System:** webpack (standard for VS Code extensions)
- **Testing Framework:** Mocha (VS Code default)
  
**Deliverables:**
- Basic extension structure with activation events
- Package.json with dependencies
- Development environment setup (launch.json, tasks.json)

### 1.2 Python Environment Detection
- Detect workspace Python interpreter
- Support for venv, conda, pyenv
- Integration with VS Code Python extension API
- Verify behave installation in detected environment
- Use VS Code Python extension API with custom detection as fallback

**Deliverables:**
- Python interpreter detection module
- Configuration settings for manual override
- Status bar indicator showing detected Python/Behave version

---

## Phase 2: Gherkin Language Support

### 2.1 Language Features Enhancement
- Register `.feature` file association
- Implement Behave-specific Gherkin support from scratch
- Syntax highlighting improvements

**Deliverables:**
- Custom TextMate grammar for Gherkin
- Language configuration for .feature files

### 2.2 Snippets & Templates
- Scenario / Scenario Outline snippets
- Examples table templates
- Common Given/When/Then phrases
- Background section snippets

**Deliverables:**
- Snippet definition file
- Customizable snippet library via settings

### 2.3 Document Outline & Breadcrumbs
- Parse feature files to extract structure
- Implement DocumentSymbolProvider
- Display Feature → Scenario → Steps hierarchy

**Deliverables:**
- Feature file AST parser
- Outline view integration
- Breadcrumb navigation

---

## Phase 3: Step Definition Intelligence

### 3.1 Step Definition Discovery
- Parse Python files in `steps/` and `features/steps/` directories
- Extract `@given`, `@when`, `@then`, `@step` decorators
- Build index of available step definitions with regex patterns

**Architecture Choice:**
- Index on workspace open + file save (better performance)

**Deliverables:**
- Python AST parser for step definitions
- Step definition index/cache
- Configuration for custom step definition paths

### 3.2 Go to Definition
- Implement DefinitionProvider for feature files
- Match step text against step definition patterns
- Handle regex groups and parameter matching

**Deliverables:**
- Step text to definition matcher
- "Go to Definition" (F12) support
- "Peek Definition" support

### 3.3 Hover Information
- Show matching step definition on hover
- Display file path and line number
- Show parameter information

**Deliverables:**
- HoverProvider implementation
- Formatted hover card with code preview

### 3.4 Autocomplete
- Implement CompletionItemProvider
- Suggest available steps as user types
- Show parameter placeholders
- Filter by Given/When/Then context
- Support both fuzzy and exact matching (configurable)

**Deliverables:**
- Step completion provider
- Parameter placeholder insertion

---

## Phase 4: Execution & Testing

### 4.1 Command Palette Commands
- "Run All Features"
- "Run Current Feature File"
- "Run Scenario Under Cursor"
- "Run Scenario with Tags"

**Deliverables:**
- Command registration and handlers
- Behave command builder with proper arguments
- Terminal integration for command execution

### 4.2 CodeLens Integration
- Display "Run" | "Debug" above each scenario
- Show last run status (✓/✗) and duration
- Click to execute specific scenario

**Implementation Choice:**
- Store results in workspace state

**Deliverables:**
- CodeLensProvider implementation
- Test result parser
- Status icons and formatting

### 4.3 Test Output Parsing
- Parse behave console output
- Extract pass/fail status per scenario
- Identify undefined steps
- Track execution timing

**Deliverables:**
- Behave output parser
- Result storage and retrieval
- Error message decoration in editor

### 4.4 Test Explorer Integration
- Tree view showing all features and scenarios
- Run buttons in tree view
- Status indicators (passed/failed/not run)
- Filter by tags

**Architecture Choice:**
- Custom TreeView implementation

**Deliverables:**
- Test Explorer provider
- Tree view with run controls
- Refresh mechanism

---

## Phase 5: Code Generation & Refactoring

### 5.1 Step Stub Generation
- Detect undefined steps from behave output
- Generate step definition skeleton
- Prompt for target file selection
- Insert with proper formatting

**Implementation Choice:**
- Generate decorators with parse expressions (behave parse)

**Deliverables:**
- Undefined step detector
- Code generation templates
- File insertion logic

### 5.2 Bulk Stub Generation
- "Generate All Missing Steps" command
- Auto-select target files based on heuristics:
  - Feature file name
  - Tags (e.g., @login → steps/login_steps.py)
  - Existing step organization

**Deliverables:**
- Batch generation workflow
- Smart file selection algorithm
- User confirmation dialog

### 5.3 Rename Refactoring
- Rename step phrase across feature files
- Update corresponding step definition
- Preview changes before applying

**Deliverables:**
- RenameProvider implementation
- Multi-file edit support
- Regex pattern update logic

### 5.4 Step Sequence Extraction
- Select multiple steps in a feature file
- Extract to reusable Background or Scenario
- Update references

**Implementation Note:**
- This is a complex feature; consider for later phase

**Deliverables:**
- Interactive refactoring command
- Code transformation logic

---

## Phase 6: Diagnostics & Linting

### 6.1 Problem Detection
- Undefined steps (no matching implementation)
- Duplicate step definitions
- Empty Examples tables
- Inconsistent Examples column counts
- Unused step definitions (optional)

**Deliverables:**
- DiagnosticCollection integration
- Real-time validation on file save
- Problem severity configuration

### 6.2 Quick Fixes
- "Create step definition" for undefined steps
- "Go to duplicate" for conflicts
- "Fix table structure" for Examples

**Deliverables:**
- CodeActionProvider implementation
- Quick fix handlers

---

## Phase 7: Advanced Features

### 7.1 Tag Management
- Tag autocomplete (@wip, @smoke, @regression, etc.)
- "Toggle tag" command
- "Run with tag" context menu
- Tag-based filtering in test explorer

**Deliverables:**
- Tag detection and indexing
- Tag manipulation commands
- Tag completion provider

### 7.2 Configuration Profile Support
- Parse `behave.ini`, `setup.cfg`, `pyproject.toml`
- Display available profiles
- Switch profiles via UI
- Pass profile to behave commands

**Deliverables:**
- Configuration file parser
- Profile switcher UI (status bar or quick pick)
- Per-workspace profile persistence

### 7.3 Formatting & Auto-fixers
- Sort tags alphabetically
- Normalize whitespace in feature files
- Align Examples tables
- Consistent And/But usage
- Implement custom formatter with configurable rules

**Deliverables:**
- DocumentFormattingProvider
- Format-on-save support
- Configurable formatting rules

### 7.4 Debugging Support
- Debug configuration generation
- Breakpoint support in step definitions
- Launch behave under debugger for specific scenario

**Deliverables:**
- DebugConfigurationProvider
- Debug adapter integration
- Step-into from feature to step definition

---

## Phase 8: Polish & Documentation

### 8.1 Settings & Preferences
- Comprehensive configuration schema
- Settings UI descriptions
- Workspace vs user settings

**Key Settings to Implement:**
- Python interpreter path override
- Step definition directory patterns
- Behave command-line arguments
- Test explorer behavior
- Formatter rules
- Diagnostic severity levels

### 8.2 Documentation
- README with feature overview
- Getting started guide
- Configuration reference
- Screenshots and GIFs
- Troubleshooting section

### 8.3 Testing & Quality
- Unit tests for core modules
- Integration tests with sample Behave projects
- CI/CD pipeline setup
- Pre-release testing

### 8.4 Publishing
- Extension marketplace metadata
- Icon and banner design
- Categories and keywords
- License and attribution

---

## Technical Architecture

### Core Components

1. **FeatureFileParser**
   - Parse .feature files into AST
   - Track scenarios, steps, tags, examples
   - Update on file changes

2. **StepDefinitionIndex**
   - Index all step definitions in workspace
   - Match step text to definitions
   - Cache for performance

3. **BehaveRunner**
   - Execute behave commands
   - Parse output and results
   - Manage test state

4. **ConfigurationManager**
   - Load and manage settings
   - Handle profiles
   - Workspace configuration

### Architecture Approach
- Modular monolithic design with clear component boundaries
- Direct VS Code extension APIs (not Language Server Protocol)
- Custom Python AST parsing for step definitions
- Support both regex and parse expression matchers

### Performance Considerations
- File watching strategy for incremental updates
- Caching mechanism for parsed data
- Debouncing for real-time validation
- Background processing for expensive operations

---

## Implementation Decisions

### Confirmed Choices
- **Language:** TypeScript
- **Build System:** webpack
- **Testing:** Mocha
- **Python Detection:** VS Code Python extension API with fallback
- **Gherkin Support:** Custom implementation
- **Step Indexing:** On workspace open + file save
- **Step Matching:** Parse expressions with regex support
- **Test Results:** Workspace state storage
- **Test Explorer:** Custom TreeView
- **Formatter:** Custom implementation
- **Extension Activation:** On .feature file open or behave project detected
- **Platform Support:** Windows, Linux, macOS from start
- **Multi-root Workspaces:** Single root first, multi-root in later phase

---

## Dependencies & Prerequisites

### Required VS Code APIs
- Language server protocol (if using LSP)
- TextDocument providers
- TreeView API
- Testing API (optional)
- Terminal API
- File system watcher

### External Dependencies
- Python AST parser (consider using tree-sitter-python)
- YAML/INI/TOML parsers for configuration
- Glob pattern matching

### Optional Dependencies
- Existing Gherkin language extension
- VS Code Python extension

---

## Development Milestones

### Milestone 0: Example Project
- Create example Behave project for testing
- Basic features with various scenarios
- Mix of implemented and undefined steps

**Timeline:** 1 day

### Milestone 1: MVP (Minimum Viable Product)
- Basic extension activation
- Run behave commands (all, file, scenario)
- Go to step definition
- Step definition hover

**Timeline:** 2-3 weeks

### Milestone 2: Enhanced Experience
- CodeLens support
- Step autocomplete
- Test explorer tree view
- Basic diagnostics (undefined steps)

**Timeline:** 3-4 weeks

### Milestone 3: Code Generation
- Generate step stubs
- Bulk stub generation
- Quick fixes

**Timeline:** 2-3 weeks

### Milestone 4: Advanced Features
- Tag management
- Configuration profiles
- Formatting
- Debugging support

**Timeline:** 3-4 weeks

### Milestone 5: Release Ready
- Full documentation
- Testing and bug fixes
- Performance optimization
- Marketplace preparation

**Timeline:** 2 weeks

**Total Estimated Timeline:** 12-16 weeks

---

## Next Steps

### Immediate Actions
1. ✅ Create example BDD project in `example/` subdirectory
2. Set up extension development environment
3. Initialize TypeScript project with webpack
4. Create basic extension structure
5. Begin Phase 1 implementation

### Weekly Goals
- **Week 1:** Complete Phase 0 and start extension scaffolding
- **Week 2-3:** Complete Phase 1 (foundation and setup)
- **Week 4-5:** Complete Phase 2 (Gherkin language support)
- Continue through milestones as planned