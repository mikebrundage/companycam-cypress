const LOGIN_EMAIL = 'input[id=user_email_address]'
const LOGIN_PASSWORD = 'input[id=user_password]'
const LOGIN_BUTTON = 'Sign In'
const USER_PROFILE_BUTTON = 'div[data-testid=navigation__dropdown-trigger]'
const USER_SIGN_OUT_BUTTON = 'Sign Out'

class Login {
  loginAsCustomer = (email, password) => {
    cy.visit('signin')
    cy.get(LOGIN_EMAIL).type(email)
    cy.get(LOGIN_PASSWORD).type(password)
    cy.contains(LOGIN_BUTTON).click()
    cy.url().should('include', '/projects')
    
  }

  logout = () => {
    cy.get(USER_PROFILE_BUTTON).click()
    cy.contains(USER_SIGN_OUT_BUTTON).click()
    cy.url().should('include', '/sign_in')
  }
}

module.exports = Login