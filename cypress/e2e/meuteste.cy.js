describe('Suíte de Testes: Sistema de Membros e Protocolos', () => {

  // O beforeEach roda antes de CADA teste (it).
  // Garante tela limpa e tamanho Desktop.
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://127.0.0.1:5500/login.html')
  })
  it('Página 404 - Deve redirecionar para erro ao tentar criar conta e voltar ao início', () => {
    
    // 1. Clica no link de criar conta na tela de Login
    cy.contains('a', 'Criar Conta de Membro').click()

    // 2. Valida se a URL mudou para a página de erro
    cy.url().should('include', '/error.html')

    // 3. Valida os textos visuais da página 404 (baseado no seu error.html)
    cy.contains('h1', '404').should('be.visible')
    cy.contains('h2', 'Em Construção').should('be.visible')
    cy.contains('p', 'O módulo que você está tentando acessar ainda está sendo desenvolvido').should('be.visible')

    // 4. Clica no botão de Voltar
    cy.contains('a', 'Voltar ao Início').click()

    // 5. Valida se retornou para a tela de Login
    cy.url().should('include', '/login.html')
    cy.contains('h1', 'Bem-vindo de volta').should('be.visible')
  })

  it('Validação Visual - Deve exibir todos os elementos da interface de login corretamente', () => {
    cy.title().should('eq', 'Entrar - Area de membros')

    // Esquerda
    cy.contains('h2', 'Area de membros').should('be.visible')
    cy.contains('p', 'Acesse seu painel de controle e retome o comando da sua rotina.').should('be.visible')
    cy.contains('Sistema Online').should('be.visible')

    // Direita
    cy.contains('h1', 'Bem-vindo de volta').should('be.visible')
    cy.contains('p', 'Digite seu e-mail de compra para acessar.').should('be.visible')
    cy.contains('label', 'E-MAIL CORPORATIVO / PESSOAL').should('be.visible')
    
    cy.get('#email').should('be.visible').and('have.attr', 'placeholder', 'seu@email.com')
    cy.get('#btnSubmit').should('be.visible').and('contain.text', 'Acessar Painel')

    cy.contains('a', 'Criar Conta de Membro').should('be.visible')
    cy.contains('p', 'Area de membros Security System © 2025').should('be.visible')
  })

  it('Login Falho - Deve bloquear acesso e exibir alerta vermelho com e-mail inexistente', () => {
    cy.intercept('GET', '**/search?email=naoexiste@teste.com').as('apiEmailInvalido')

    cy.get('#email').type('naoexiste@teste.com')
    cy.get('#btnSubmit').click()

    cy.wait('@apiEmailInvalido')

    cy.get('#errorMsg')
      .should('be.visible')
      .and('contain.text', 'E-mail não encontrado')
      .and('have.class', 'text-red-500')

    cy.get('#btnSubmit').should('contain.text', 'Acessar Painel')
    cy.url().should('include', '/login.html')
  })


  it('Login com Sucesso e Dashboard - Deve autenticar e concluir as 3 tarefas do dia', () => {
    const emailCorreto = 'kayquedamas@gmail.com'
    
    cy.intercept('GET', `**/search?email=${emailCorreto}`).as('apiEmailSucesso')

    cy.get('#email').type(emailCorreto)
    cy.get('#btnSubmit').click()

    cy.get('#btnSubmit').should('contain', 'VALIDANDO...')

    cy.wait('@apiEmailSucesso', { timeout: 10000 }).then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })

    cy.get('#btnSubmit').should('contain', 'ACESSO AUTORIZADO')

    cy.url().should('include', '/index.html')

    cy.contains('h1', 'Protocolo Diário').should('be.visible')
    cy.get('#lista .task-item').should('have.length', 3)

    const tarefas = ['Estudar documentação', 'Revisar código fonte', 'Pausa para café']

    tarefas.forEach(tarefa => {
      cy.contains('span', tarefa)
        .parents('.task-item')
        .click()
        .should('have.class', 'concluida')
    })
  })




})