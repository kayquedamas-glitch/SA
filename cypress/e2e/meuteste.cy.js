describe('Suíte de Testes: Sistema de Membros e Protocolos', () => {

  // O beforeEach roda antes de CADA teste (it) individualmente.
  // Isso garante que todo teste comece com a tela limpa e no tamanho certo.
  beforeEach(() => {
    cy.viewport(1280, 720) // Define resolução Desktop
    cy.visit('http://127.0.0.1:5500/login.html') // Abre o site
  })

  // ------------------------------------------------------------------------
  // TESTE 1: FOCADO APENAS NA INTERFACE (UI)
  // ------------------------------------------------------------------------
  it('Cenário 1: Validação Visual - Deve exibir todos os elementos da interface de login corretamente', () => {
    
    // Valida Título da Aba
    cy.title().should('eq', 'Entrar - Area de membros')

    // Valida Elementos da Esquerda (Banner)
    cy.contains('h2', 'Area de membros').should('be.visible')
    cy.contains('p', 'Acesse seu painel de controle e retome o comando da sua rotina.').should('be.visible')
    cy.contains('Sistema Online').should('be.visible')

    // Valida Elementos da Direita (Formulário)
    cy.contains('h1', 'Bem-vindo de volta').should('be.visible')
    cy.contains('p', 'Digite seu e-mail de compra para acessar.').should('be.visible')
    cy.contains('label', 'E-MAIL CORPORATIVO / PESSOAL').should('be.visible')
    
    // Valida Input e Botão
    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'seu@email.com')
    
    cy.get('#btnSubmit')
      .should('be.visible')
      .and('contain.text', 'Acessar Painel')

    // Valida Rodapé e Links
    cy.contains('a', 'Criar Conta de Membro').should('be.visible')
    cy.contains('p', 'Area de membros Security System © 2025').should('be.visible')
  })

  // ------------------------------------------------------------------------
  // TESTE 2: FOCADO NO ERRO (CAMINHO INFELIZ)
  // ------------------------------------------------------------------------
  it('Cenário 2: Login Falho - Deve bloquear acesso e exibir alerta vermelho com e-mail inexistente', () => {
    
    // Prepara interceptação para e-mail errado
    cy.intercept('GET', '**/search?email=naoexiste@teste.com').as('apiEmailInvalido')

    // Ação: Digita e-mail errado
    cy.get('#email').type('naoexiste@teste.com')
    cy.get('#btnSubmit').click()

    // Aguarda API responder
    cy.wait('@apiEmailInvalido')

    // Validações do Erro
    cy.get('#errorMsg')
      .should('be.visible')
      .and('contain.text', 'E-mail não encontrado') // Texto do erro
      .and('have.class', 'text-red-500') // Cor vermelha

    // Garante que o botão voltou ao estado normal e não entrou no sistema
    cy.get('#btnSubmit').should('contain.text', 'Acessar Painel')
    cy.url().should('include', '/login.html') // Garante que continua na tela de login
  })

  // ------------------------------------------------------------------------
  // TESTE 3: FOCADO NO SUCESSO E PROTOCOLOS (CAMINHO FELIZ)
  // ------------------------------------------------------------------------
  it('Cenário 3: Login com Sucesso e Dashboard - Deve autenticar e concluir as 3 tarefas do dia', () => {
    
    // --- ETAPA DE LOGIN ---
    const emailCorreto = 'kayquedamas@gmail.com'
    
    cy.intercept('GET', `**/search?email=${emailCorreto}`).as('apiEmailSucesso')

    cy.get('#email').type(emailCorreto)
    cy.get('#btnSubmit').click()

    // Valida feedback de carregamento
    cy.get('#btnSubmit').should('contain', 'VALIDANDO...')

    // Aguarda e valida sucesso da API
    cy.wait('@apiEmailSucesso', { timeout: 10000 }).then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })

    cy.get('#btnSubmit').should('contain', 'ACESSO AUTORIZADO')

    // --- ETAPA DO DASHBOARD ---
    
    // Verifica redirecionamento
    cy.url().should('include', '/index.html')

    // Valida elementos visuais do Dashboard
    cy.contains('h1', 'Protocolo Diário').should('be.visible')
    cy.contains('p', 'Clique nas tarefas para marcar como concluído.').should('be.visible')
    cy.contains('p', 'System v1.0').should('be.visible')

    // Verifica se existem exatamente 3 tarefas
    cy.get('#lista .task-item').should('have.length', 3)

    // --- INTERAÇÃO COM AS TAREFAS (LOOP DE TESTE) ---
    // Uma forma elegante de testar várias tarefas repetidas
    const tarefas = [
      'Estudar documentação',
      'Revisar código fonte',
      'Pausa para café'
    ]

    // Para cada tarefa na lista acima, o Cypress vai clicar e verificar
    tarefas.forEach(tarefa => {
      cy.contains('span', tarefa)
        .parents('.task-item')
        .click()                 // Clica
        .should('have.class', 'concluida') // Verifica se ficou verde/riscado
    })

  })

})