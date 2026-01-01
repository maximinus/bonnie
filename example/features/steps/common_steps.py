"""
Common step definitions that can be reused across features
"""
from behave import given, then


@given('I wait {seconds:d} seconds')
def step_wait_seconds(context, seconds):
    """Common wait step for timing"""
    import time
    time.sleep(seconds)


@then('I take a screenshot')
def step_take_screenshot(context):
    """Common screenshot step (placeholder)"""
    context.screenshot_taken = True


@given('debug mode is enabled')
def step_enable_debug(context):
    """Enable debug mode for verbose output"""
    context.debug = True


@then('I print the current state')
def step_print_state(context):
    """Debug step to print context state"""
    if hasattr(context, 'debug') and context.debug:
        print(f"Current context: {vars(context)}")
