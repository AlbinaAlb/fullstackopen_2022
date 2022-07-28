describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ada Levitski',
      username: 'adalev',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('adalev')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Ada Levitski logged-in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('adalev')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Ada Levitski logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'adalev', password: 'password' })
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Cypress',
        url: 'https://www.test.com/',
      })
      cy.contains('A blog created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A blog created by cypress 1',
          author: 'Cypress',
          url: 'https://www.test.com/',
        })
        cy.createBlog({
          title: 'A blog created by cypress 2',
          author: 'Cypress',
          url: 'https://www.test.com/',
        })
        cy.createBlog({
          title: 'A blog created by cypress 3',
          author: 'Cypress',
          url: 'https://www.test.com/',
        })
      })
      it('one of those can be liked', function () {
        cy.contains('A blog created by cypress 2').parent().find('button').click()
        cy.get('#like-btn').click()
      })
      it('one of those can be deleted', function () {
        cy.contains('A blog created by cypress 2').parent().find('button').click()
        cy.get('#delete-btn').click()
        cy.get('html').should('not.contain', 'A blog created by cypress 2')
      })
      it.only('the blogs are ordered according to likes', async function () {
        cy.contains('A blog created by cypress 3').parent().find('button').click()
        cy.get('#like-btn').click()

        cy.get('.blog').eq(0).should('contain', 'A blog created by cypress 3')
      })
    })
  })
})
