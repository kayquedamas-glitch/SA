  describe('Funcionalidade de Login', () => {
    
    // Antes de cada teste, visita a página de login
    beforeEach(() => {
      // IMPORTANTE: Para funcionar bem, recomendo usar o "Live Server" do VS Code.
      // Se estiver usando arquivo direto, o caminho pode variar.
      // Aqui assumo que o projeto roda na porta 5500 (padrão do Live Server)
      cy.visit('http://127.0.0.1:5500/login.html') 
    })

 it('Deve realizar login com sucesso (Caminho Feliz)', () => {
    // 1. Interceptamos a chamada para a API
    cy.intercept('GET', '**/search?email=*', {
      statusCode: 200,
      body: [
        { nome: "Usuário Teste", email: "teste@exemplo.com", status: "ativo" }
      ]
    }).as('buscaUsuario')

    // 2. Interagir com os elementos
    cy.get('#email').type('teste@exemplo.com')
    cy.get('#btnSubmit').click()

    // 3. Esperar a requisição acontecer
    cy.wait('@buscaUsuario')

    // 4. Verificar se redirecionou para a home
    cy.url().should('include', 'index.html')
    
    // 5. Verificar se salvou no LocalStorage (CORRIGIDO)
    cy.getAllLocalStorage().then((result) => {
        // Pegamos exatamente o dado salvo naquela URL
        const sessionData = result['http://127.0.0.1:5500']['Area de membros_session_v2']
        
        // Verificamos se ele existe e se contém o email
        expect(sessionData).to.exist
        expect(sessionData).to.contain('teste@exemplo.com')
    })
  })
  })