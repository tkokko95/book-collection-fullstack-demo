describe('Library App', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/books', {
            title: 'ExampleBook',
            author: 'ExampleAuthor',
            description: 'ExampleDescription'
        })
        cy.visit('http://localhost:3000') // We assume that the tests are run on the production build, this must be changed accordingly if we're using the production build instead
    })

    it('App opens and books are shown', function() {
        cy.contains('Title *')
        cy.contains('ExampleBook')
    })

    it('Books can be added, notification is shown',function() {
        cy.get('#titleInput').type('testtitle')
        cy.get('#authorInput').type('testauthor')
        cy.get('#saveNewButton').click()
        cy.wait(1000)
        cy.contains('testtitle')
        cy.contains('Book succesfully added')
    })

    it('Book information is shown when clicked and cancel button clears the form', function() {
        cy.contains('ExampleBook').click()
        cy.get('#titleInput').should('have.value', 'ExampleBook')
        cy.get('#authorInput').should('have.value', 'ExampleAuthor')
        cy.get('#descriptionInput').should('have.value', 'ExampleDescription')
        cy.get('#cancelButton').click()
        cy.get('#titleInput').should('have.value', '')
        cy.get('#authorInput').should('have.value', '')
        cy.get('#descriptionInput').should('have.value', '')
    })

    it('Books can be deleted, notification is shown', function() {
        cy.contains('ExampleBook').click()
        cy.get('#deleteButton').click()
        cy.wait(1000)
        cy.contains('ExampleBook').should('not.exist')
        cy.contains('Book successfully deleted')
    })
    it('Book information can be changed, notification is shown', function() {
        cy.contains('ExampleBook').click()
        cy.get('#descriptionInput').clear().type('ChangedDescription')
        cy.get('#saveEditedButton').click()
        cy.wait(1000)
        cy.contains('Book successfully modified')
        cy.contains('ExampleBook').click()
        cy.contains('ChangedDescription')
    })

})