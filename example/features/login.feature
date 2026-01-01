@login @wip
Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account

  Background:
    Given the login page is displayed
    And the following users exist:
      | username | password  | status |
      | alice    | pass123   | active |
      | bob      | secret456 | active |
      | charlie  | temp789   | locked |

  @smoke
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "alice"
    And I enter password "pass123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message "Welcome, alice!"

  Scenario: Failed login with invalid password
    Given I am on the login page
    When I enter username "alice"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page

  Scenario: Failed login with locked account
    Given I am on the login page
    When I enter username "charlie"
    And I enter password "temp789"
    And I click the login button
    Then I should see an error message "Account is locked"
    And I should see a link to "Contact Support"

  Scenario: Password reset request
    Given I am on the login page
    When I click the "Forgot Password" link
    And I enter my email "alice@example.com"
    And I click the "Send Reset Link" button
    Then I should see a confirmation message "Password reset email sent"
    And I should receive an email with reset instructions

  Scenario Outline: Login attempts with various credentials
    Given I am on the login page
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should see the result "<result>"

    Examples:
      | username | password  | result              |
      | alice    | pass123   | Dashboard           |
      | bob      | secret456 | Dashboard           |
      | charlie  | temp789   | Account is locked   |
      | invalid  | wrong     | Invalid credentials |
