// These tests can be a bit wonky but they are reliable enough so that any errors can be blamed on the tests instead of the app
describe('Book Collection App', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/books', {
            title: 'ExampleBook',
            author: 'ExampleAuthor',
            description: 'ExampleDescription'
        })

        // We assume that the tests are run on the production build, this must be changed accordingly if we're using the production build instead
        cy.visit('http://localhost:3000')
    })

    it('App opens and books are shown', function() {
        cy.contains('Title *')
        cy.contains('ExampleBook')
    })

    it('Save New button is disabled until Title and Author fields are not empty', function() {
        cy.get('#saveNewButton').should('be.disabled')
        cy.get('#titleInput').type('ASD')
        cy.get('#saveNewButton').should('be.disabled')
        cy.get('#authorInput').type('FSD')
        cy.get('#saveNewButton').should('not.be.disabled')
    })

    it('Save Changes button is disabled until Title and Author fields are not empty', function() {
        cy.contains('ExampleBook').click()
        cy.get('#titleInput').clear()
        cy.get('#authorInput').clear()
        cy.get('#saveEditedButton').should('be.disabled')
        cy.get('#titleInput').type('ASD')
        cy.get('#authorInput').type('FSD')
        cy.get('#saveEditedButton').should('not.be.disabled')
    })

    it('Books can be added, notification is shown',function() {
        cy.get('#titleInput').type('testtitle')
        cy.get('#authorInput').type('testauthor')
        cy.get('#saveNewButton').click()
        cy.wait(1000)
        cy.get('.bookList').contains('testtitle')
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
        cy.get('.bookList').contains('ExampleBook').should('not.exist')
        cy.contains('Book successfully deleted')
    })
    it('Book information can be changed, notification is shown', function() {
        cy.contains('ExampleBook').click()
        cy.get('#descriptionInput').clear().type('ChangedDescription')
        cy.get('#saveEditedButton').click()
        cy.wait(1000)
        cy.contains('Book successfully modified')
        cy.get('.bookList').contains('ExampleBook').click()
        cy.contains('ChangedDescription')
    })

})