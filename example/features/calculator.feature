@calculator @smoke
Feature: Calculator Operations
  As a user
  I want to perform basic arithmetic operations
  So that I can do calculations quickly

  Background:
    Given I have a calculator

  Scenario: Addition of two numbers
    Given I have entered 50 into the calculator
    And I have entered 70 into the calculator
    When I press add
    Then the result should be 120 on the screen

  Scenario: Subtraction of two numbers
    Given I have entered 100 into the calculator
    And I have entered 30 into the calculator
    When I press subtract
    Then the result should be 70 on the screen

  @smoke
  Scenario Outline: Multiple arithmetic operations
    Given I have entered <first> into the calculator
    And I have entered <second> into the calculator
    When I press <operation>
    Then the result should be <result> on the screen

    Examples:
      | first | second | operation | result |
      | 20    | 30     | add       | 50     |
      | 50    | 20     | subtract  | 30     |
      | 10    | 5      | multiply  | 50     |
      | 100   | 10     | divide    | 10     |

  Scenario: Division by zero
    Given I have entered 10 into the calculator
    And I have entered 0 into the calculator
    When I press divide
    Then I should see an error message "Cannot divide by zero"
