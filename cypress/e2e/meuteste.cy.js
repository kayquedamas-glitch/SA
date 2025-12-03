describe('Teste de Integração', () => {

  it('Valida o email: kayquedamas@gmail.com na API real e loga', () => {
    
    // 1. Acesso ao site
    cy.visit('http://127.0.0.1:5500/login.html') 

    cy.intercept('GET', '**/search?email=kayquedamas@gmail.com').as('chamadaRealAPI')

    // 3. Interação Real
    cy.get('#email').type('kayquedamas@gmail.com')
    cy.get('#btnSubmit').click()

    // Aguardar a Internet
    // O Cypress vai esperar até que o SheetDB responda de verdade.
    // Isso seria um time de 10 segundos.
    cy.wait('@chamadaRealAPI', { timeout: 10000 }).then((interception) => {
     
    })



    // Verificação se carregou
    cy.contains('h1', 'Protocolo Diário').should('be.visible')
  })

})