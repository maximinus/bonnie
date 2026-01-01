"""
Behave environment setup and hooks
"""


def before_all(context):
    """Run before all tests"""
    print("Starting Behave test suite")
    context.config.setup_logging()


def before_feature(context, feature):
    """Run before each feature"""
    print(f"\n{'='*60}")
    print(f"Feature: {feature.name}")
    print(f"{'='*60}")


def before_scenario(context, scenario):
    """Run before each scenario"""
    print(f"\nScenario: {scenario.name}")
    # Reset any shared state
    context.errors = []


def after_scenario(context, scenario):
    """Run after each scenario"""
    if scenario.status == "failed":
        print("  ✗ FAILED")
        if hasattr(context, 'errors') and context.errors:
            for error in context.errors:
                print(f"    Error: {error}")
    elif scenario.status == "passed":
        print("  ✓ PASSED")
    elif scenario.status == "skipped":
        print("  ○ SKIPPED")


def after_feature(context, feature):
    """Run after each feature"""
    passed = sum(1 for s in feature.scenarios if s.status == "passed")
    failed = sum(1 for s in feature.scenarios if s.status == "failed")
    skipped = sum(1 for s in feature.scenarios if s.status == "skipped")
    
    print("\nFeature Summary:")
    print(f"  Passed: {passed}")
    print(f"  Failed: {failed}")
    print(f"  Skipped: {skipped}")


def after_all(context):
    """Run after all tests"""
    print("\nTest suite completed")
