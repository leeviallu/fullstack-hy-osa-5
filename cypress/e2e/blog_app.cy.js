describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Leevi Leppänen',
      username: 'leeviallu',
      password: 'ananasalaS'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('leeviallu')
      cy.get('#password').type('ananasalaS')
      cy.get('#login-button').click()
      cy.contains('Leevi Leppänen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('vääräukko')
      cy.get('#password').type('vääräpassu')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
    })
  })
})