# Changelog

All notable changes to the Bonnie VS Code Behave Extension project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2026-01-01

### Added - Project Planning & Setup

#### Documentation
- Created comprehensive implementation plan in `docs/plan_outline.md`
  - 8 development phases covering all planned features
  - Technical architecture decisions documented
  - 5 milestones with 12-16 week estimated timeline
  - Complete feature breakdown from requirements
- Created feature requirements document in `docs/features.md`
  - 15 core features identified and documented
  - Organized into logical groups (execution, intelligence, tooling)
- Initial README.md with project description
- This CHANGELOG.md to track project progress

#### Example BDD Project (Phase 0 - Completed)
Created fully functional Behave test project in `example/` directory for extension development and testing:

**Project Structure:**
- `example/README.md` - Setup instructions and documentation
- `example/requirements.txt` - Python dependencies (behave, parse, parse-type)
- `example/behave.ini` - Configuration with multiple profiles (dev, smoke, ci)

**Feature Files:**
- `example/features/calculator.feature`
  - 5 test scenarios including basic arithmetic operations
  - Scenario Outline with Examples table demonstrating data-driven testing
  - Tags: @calculator, @smoke
  - Fully implemented step definitions
  
- `example/features/login.feature`
  - 5 authentication scenarios
  - Background section with user data table
  - Scenario Outline for multiple credential testing
  - Tags: @login, @wip
  - Partially implemented (intentional undefined steps for testing)

**Step Definitions:**
- `example/features/steps/calculator_steps.py`
  - Complete Calculator class implementation
  - Step definitions using regex patterns
  - Support for add, subtract, multiply, divide operations
  - Error handling for division by zero
  
- `example/features/steps/login_steps.py`
  - Partial implementation (3 steps defined, ~15 intentionally undefined)
  - Uses parse expressions (ready for parse-style matchers)
  - Demonstrates undefined step workflow for extension testing
  
- `example/features/steps/common_steps.py`
  - Reusable common steps (wait, screenshot, debug)
  - Demonstrates step definition sharing across features

**Environment Configuration:**
- `example/features/environment.py`
  - Behave hooks (before_all, after_all, before_feature, etc.)
  - Test output formatting with status indicators
  - Feature and scenario summary reporting

**Key Characteristics:**
- Mix of passing and intentionally failing tests
- Multiple Gherkin constructs: Scenario, Scenario Outline, Background, Examples
- Various tag types for test organization
- Different step matcher styles (regex and parse-ready)
- Configuration profiles for different test environments
- Realistic test scenarios for extension development validation

### Technical Decisions

#### Finalized Technology Stack
- **Language:** TypeScript (chosen for type safety and VS Code API integration)
- **Build System:** webpack (VS Code standard)
- **Testing Framework:** Mocha (VS Code default)
- **Architecture:** Modular monolithic with clear component boundaries
- **Approach:** Direct VS Code extension APIs (not Language Server Protocol)

#### Implementation Choices
- **Python Detection:** VS Code Python extension API with custom fallback
- **Gherkin Support:** Custom implementation for Behave-specific features
- **Step Indexing:** On workspace open + file save for optimal performance
- **Step Matching:** Parse expressions with regex support
- **Test Results Storage:** Workspace state
- **Test Explorer:** Custom TreeView implementation
- **Formatter:** Custom implementation with configurable rules
- **Extension Activation:** On .feature file open or behave project detection
- **Platform Support:** Windows, Linux, macOS from day one
- **Multi-root Workspaces:** Single root first, multi-root in later phases

### Status

**Completed:**
- ✅ Phase 0: Example BDD Project Setup
- ✅ Project planning and architecture definition
- ✅ All technology stack decisions finalized

**Next Steps:**
- Phase 1: Foundation & Core Setup
  - Extension scaffolding with TypeScript and webpack
  - Python environment detection module
  - Basic activation and configuration

**Progress:** Milestone 0 complete (1/6 milestones)

---

## Project Milestones

### Milestone 0: Example Project ✅ COMPLETED
- Create example Behave project for testing
- Basic features with various scenarios
- Mix of implemented and undefined steps

### Milestone 1: MVP (In Planning)
- Basic extension activation
- Run behave commands (all, file, scenario)
- Go to step definition
- Step definition hover
- **Timeline:** 2-3 weeks

### Milestone 2: Enhanced Experience (Planned)
- CodeLens support
- Step autocomplete
- Test explorer tree view
- Basic diagnostics (undefined steps)
- **Timeline:** 3-4 weeks

### Milestone 3: Code Generation (Planned)
- Generate step stubs
- Bulk stub generation
- Quick fixes
- **Timeline:** 2-3 weeks

### Milestone 4: Advanced Features (Planned)
- Tag management
- Configuration profiles
- Formatting
- Debugging support
- **Timeline:** 3-4 weeks

### Milestone 5: Release Ready (Planned)
- Full documentation
- Testing and bug fixes
- Performance optimization
- Marketplace preparation
- **Timeline:** 2 weeks

---

[Unreleased]: https://github.com/maximinus/bonnie/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/maximinus/bonnie/releases/tag/v0.0.1
