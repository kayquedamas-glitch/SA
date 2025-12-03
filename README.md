#  Área de Membros - System v1.0

Um sistema de autenticação e dashboard para área de membros, desenvolvido com foco em **UI Design Moderno (Glassmorphism)** e validação de usuários via integração com Google Sheets (SheetDB).

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Tech](https://img.shields.io/badge/Tech-HTML5_|_Tailwind_|_JS-red)
![Tests](https://img.shields.io/badge/Tests-Cypress-green)

## Sobre o Projeto

Este projeto é uma aplicação front-end que simula uma plataforma que possui um protocolo diario. O sistema permite que usuários façam login verificando seu e-mail em uma base de dados externa e acessem um Protocolo de tarefas.

### Funcionalidades

* **Autenticação de Usuário:**
    * Validação de e-mail via API (SheetDB).
    * Feedback visual de carregamento e erro animações de "shake".
    * Armazenamento de sessão via `localStorage`.
* **Interface Moderna (Dark Mode):**
    * Estilização completa via **Tailwind CSS** (CDN).
    * Efeito **Glassmorphism** (vidro fosco) nos cartões.
    * Background com padrão de grid e gradientes.
* **Dashboard Interativo:**
    * Lista de tarefas ("Protocolo Diário") com marcação visual de conclusão.
* **Página 404 Personalizada:**
    * Design consistente para rotas inexistentes ou módulos em construção.

## Tecnologias Utilizadas

* **HTML5 & JavaScript (Vanilla):** Estrutura e lógica do cliente.
* **Tailwind CSS:** Framework de utilitários para estilização rápida (via CDN).
* **SheetDB API:** Utilizado como "Backend" para verificar a existência do usuário em uma planilha Google Sheets.
* **FontAwesome:** Ícones para UI.
* **Cypress:** Framework de testes E2E (End-to-End) instalado para garantir a qualidade do código.

## Estrutura de Arquivos

```text
/
├── index.html        # Dashboard principal (Lista de tarefas)
├── login.html        # Tela de Login com integração API
├── error.html        # Página 404 / Em construção
├── package.json      # Dependências do Node (Cypress)
└── package-lock.json # Versões travadas das dependências
