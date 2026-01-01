# Example Behave Project

This is a simple BDD test project using Python Behave, created to serve as a test bed for the Bonnie VS Code extension.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running Tests

Run all features:
```bash
behave
```

Run a specific feature:
```bash
behave features/calculator.feature
```

Run with tags:
```bash
behave --tags=@smoke
behave --tags=@calculator
behave --tags=@wip
```

Run with a specific profile:
```bash
behave -D profile=smoke
```

## Project Structure

```
example/
├── features/
│   ├── calculator.feature      # Basic arithmetic tests
│   ├── login.feature           # Authentication scenarios (some undefined)
│   ├── steps/
│   │   ├── calculator_steps.py # Step definitions for calculator
│   │   ├── login_steps.py      # Partial login step definitions
│   │   └── common_steps.py     # Reusable common steps
│   └── environment.py          # Behave hooks and setup
├── requirements.txt            # Python dependencies
├── behave.ini                  # Behave configuration
└── README.md                   # This file
```

## Test Scenarios

### Calculator Feature
- ✅ Basic addition
- ✅ Basic subtraction
- ✅ Scenario Outline with multiple examples
- Tagged with @smoke, @calculator

### Login Feature
- ⚠️ User login (partially implemented)
- ❌ Invalid credentials (undefined steps)
- ❌ Password reset (undefined steps)
- Tagged with @wip, @login

## Purpose

This project demonstrates:
- Multiple feature files
- Various Gherkin constructs (Scenario, Scenario Outline, Background, Examples)
- Mix of implemented and undefined steps
- Different step matcher styles (regex, parse)
- Tags for test organization
- Configuration profiles
- Both passing and intentionally failing tests
