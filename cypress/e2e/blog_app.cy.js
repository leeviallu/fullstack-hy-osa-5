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
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('leeviallu')
      cy.get('#password').type('ananasalaS')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Test blog').should('not.exist')
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test blog')
      cy.get('#author-input').type('Leevi Leppänen')
      cy.get('#url-input').type('www.testi.com')
      cy.contains('save').click()
      cy.contains('Test blog')
      cy.contains('Leevi Leppänen')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test blog')
      cy.get('#author-input').type('Leevi Leppänen')
      cy.get('#url-input').type('www.testi.com')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('0')
      cy.contains('1').should('not.exist')
      cy.contains('like').click()
      cy.contains('1').click()
      cy.contains('0').should('not.exist')
    })

    it('User can delete a blog that he has made', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test blog')
      cy.get('#author-input').type('Leevi Leppänen')
      cy.get('#url-input').type('www.testi.com')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.reload()
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.contains('Test blog').should('not.exist')
    })

    it('User that made the blog is only one who can see delete button', function() {
      const user = {
        name: 'Jarppa Kanerva',
        username: 'jarppa',
        password: 'S@lasana'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user) 
      cy.visit('http://localhost:3000')

      cy.contains('new blog').click()
      cy.get('#title-input').type('Test blog')
      cy.get('#author-input').type('Leevi Leppänen')
      cy.get('#url-input').type('www.testi.com')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.reload()
      cy.contains('show').click()
      cy.contains('remove')
      cy.contains('log out').click()

      cy.contains('log in').click()
      cy.get('#username').type('jarppa')
      cy.get('#password').type('S@lasana')
      cy.get('#login-button').click()
      cy.contains('show').click()
      cy.contains('remove').should('not.exist')
    })
  })
})