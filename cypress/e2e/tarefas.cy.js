describe('Funcionalidade do Protocolo Diário', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('Deve exibir a lista de tarefas corretamente', () => {
    cy.contains('h1', 'Protocolo Diário').should('be.visible')
    cy.get('.task-item').should('have.length', 3)
  })

  it('Deve marcar e desmarcar TODAS as tarefas da lista', () => {

    
    cy.get('.task-item').each(($tarefa) => {
      

      cy.wrap($tarefa).click()

      
      cy.wrap($tarefa).should('have.class', 'concluida')
      cy.wrap($tarefa).find('i').should('have.class', 'text-red-500')


      
      cy.wrap($tarefa).click()


      
      cy.wrap($tarefa).should('not.have.class', 'concluida')
      cy.wrap($tarefa).find('i').should('not.have.class', 'text-red-500')
    })
  })

})