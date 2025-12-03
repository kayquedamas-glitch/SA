describe('Funcionalidade do Protocolo Diário', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('Deve exibir a lista de tarefas corretamente', () => {
    cy.contains('h1', 'Protocolo Diário').should('be.visible')
    cy.get('.task-item').should('have.length', 3)
  })

  it('Deve marcar e desmarcar uma tarefa visualmente', () => {
    cy.get('.task-item').first().as('primeiraTarefa')

    cy.get('@primeiraTarefa').click()
    cy.get('@primeiraTarefa').should('have.class', 'concluida')
    cy.get('@primeiraTarefa').find('i').should('have.class', 'text-red-500')

    cy.get('@primeiraTarefa').click()
    cy.get('@primeiraTarefa').should('not.have.class', 'concluida')
    cy.get('@primeiraTarefa').find('i').should('not.have.class', 'text-red-500')
  })

})