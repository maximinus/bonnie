"""
Calculator step definitions using regex patterns
"""
from behave import given, when, then


class Calculator:
    def __init__(self):
        self.stack = []
        self.result = None
        self.error = None

    def enter(self, number):
        self.stack.append(float(number))

    def add(self):
        if len(self.stack) >= 2:
            b = self.stack.pop()
            a = self.stack.pop()
            self.result = a + b
        else:
            self.error = "Insufficient operands"

    def subtract(self):
        if len(self.stack) >= 2:
            b = self.stack.pop()
            a = self.stack.pop()
            self.result = a - b
        else:
            self.error = "Insufficient operands"

    def multiply(self):
        if len(self.stack) >= 2:
            b = self.stack.pop()
            a = self.stack.pop()
            self.result = a * b
        else:
            self.error = "Insufficient operands"

    def divide(self):
        if len(self.stack) >= 2:
            b = self.stack.pop()
            a = self.stack.pop()
            if b == 0:
                self.error = "Cannot divide by zero"
            else:
                self.result = a / b
        else:
            self.error = "Insufficient operands"


@given(r'I have a calculator')
def step_have_calculator(context):
    context.calculator = Calculator()


@given(r'I have entered (\d+) into the calculator')
def step_enter_number(context, number):
    context.calculator.enter(number)


@when(r'I press add')
def step_press_add(context):
    context.calculator.add()


@when(r'I press subtract')
def step_press_subtract(context):
    context.calculator.subtract()


@when(r'I press multiply')
def step_press_multiply(context):
    context.calculator.multiply()


@when(r'I press divide')
def step_press_divide(context):
    context.calculator.divide()


@then(r'the result should be (\d+) on the screen')
def step_verify_result(context, expected):
    assert context.calculator.result == float(expected), \
        f"Expected {expected}, but got {context.calculator.result}"


@then(r'I should see an error message "([^"]*)"')
def step_verify_error_message(context, expected_message):
    assert context.calculator.error == expected_message, \
        f"Expected error '{expected_message}', " \
        f"but got '{context.calculator.error}'"
