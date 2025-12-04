describe('Funcionalidade do Protocolo Diário', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('Deve exibir a lista de tarefas corretamente', () => {
    cy.contains('h1', 'Protocolo Diário').should('be.visible')
    cy.get('.task-item').should('have.length', 3)
  })

  it('Deve marcar e desmarcar TODAS as tarefas da lista', () => {
    // O comando .each() pega todos os elementos encontrados (3 tarefas)
    // e executa os passos abaixo para cada um deles, um de cada vez.
    cy.get('.task-item').each(($tarefa) => {
      
      // 1. Clica na tarefa atual
      // Usamos cy.wrap($tarefa) para trazer o elemento HTML para dentro dos comandos do Cypress
      cy.wrap($tarefa).click()
      
      // 2. Verifica se marcou (se ganhou a classe 'concluida' e o ícone ficou vermelho)
      cy.wrap($tarefa).should('have.class', 'concluida')
      cy.wrap($tarefa).find('i').should('have.class', 'text-red-500')

      // 3. Clica de novo na mesma tarefa para desmarcar
      cy.wrap($tarefa).click()

      // 4. Verifica se desmarcou (se perdeu a classe e o ícone voltou ao normal)
      cy.wrap($tarefa).should('not.have.class', 'concluida')
      cy.wrap($tarefa).find('i').should('not.have.class', 'text-red-500')
    })
  })

})