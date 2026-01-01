from behave import given

"""
Login step definitions using parse expressions
Some steps are intentionally left undefined for testing
"""


@given('the login page is displayed')
def step_login_page_displayed(context):
    context.login_page = {
        'displayed': True,
        'url': '/login'
    }


@given('the following users exist')
def step_users_exist(context):
    context.users = {}
    for row in context.table:
        context.users[row['username']] = {
            'password': row['password'],
            'status': row['status']
        }


@given('I am on the login page')
def step_on_login_page(context):
    context.current_page = 'login'
    context.login_attempt = {
        'username': None,
        'password': None,
        'result': None
    }


# Note: The following steps are intentionally NOT implemented
# to test the extension's ability to detect undefined steps:
#
# - When I enter username "{username}"
# - And I enter password "{password}"
# - And I click the login button
# - Then I should be redirected to the dashboard
# - And I should see a welcome message "{message}"
# - Then I should see an error message "{message}"
# - And I should remain on the login page
# - And I should see a link to "{link_text}"
# - When I click the "{link_text}" link
# - And I enter my email "{email}"
# - And I click the "{button_text}" button
# - Then I should see a confirmation message "{message}"
# - And I should receive an email with reset instructions
# - Then I should see the result "{result}"
