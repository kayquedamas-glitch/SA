# Área de Membros - Protocolo de Tarefas

Um sistema de autenticação e dashboard para área de membros, que verifica a validação de usuários via integração com Google Sheets.

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Tech](https://img.shields.io/badge/Tech-HTML5_|_Tailwind_|_JS-red)
![Tests](https://img.shields.io/badge/Tests-Cypress-blue)

## Sobre o Projeto

Este projeto é uma aplicação front-end que simula uma plataforma de acesso restrito (Área de Membros). O sistema permite que usuários façam login validando seu e-mail em uma base de dados externa e acessem um "Protocolo Diário" de tarefas interativas.

### Funcionalidades

* **Autenticação de Usuário:**
    * Validação de e-mail em tempo real via API (SheetDB).
    * Feedback visual de carregamento e tratamento de erros (animações de "shake").
    * Persistência de sessão via `localStorage`.
* **Interface Moderna (Dark Mode):**
    * Estilização completa via **Tailwind CSS** (CDN).
    * Efeito **Glassmorphism** (vidro fosco) nos cartões.
    * Background com padrão de grid e gradientes.
* **Dashboard Interativo:**
    * Lista de tarefas ("Protocolo Diário") com marcação visual de conclusão.
    * Interatividade DOM pura (Vanilla JS).
* **Página 404 Personalizada:**
    * Design consistente para rotas inexistentes ou módulos em construção.

---

## 🛠 Tecnologias Utilizadas

* **HTML5 & JavaScript (ES6+):** Estrutura semântica e lógica do cliente.
* **Tailwind CSS:** Framework utilitário para estilização ágil e responsiva.
* **SheetDB API:** Backend as a Service (BaaS) para validação de usuários via Google Sheets.
* **FontAwesome:** Biblioteca de ícones.
* **Cypress:** Framework de testes automatizados End-to-End (E2E).

## Pré-requisitos

Para rodar o projeto e os testes localmente, você precisará ter instalado:

* **Git:** Para clonar o repositório.
* **Node.js & NPM:** Necessários apenas para instalar e rodar o Cypress.
* **VS Code (Recomendado):** Com a extensão **Live Server** instalada (essencial para que o Cypress acesse a aplicação via `http://127.0.0.1:5500`).

---



---

## Testes Automatizados (Cypress)

O projeto conta com uma suíte de testes robusta utilizando **Cypress**, garantindo a qualidade do código e a estabilidade das funcionalidades principais.

### Como rodar os testes:

Com o **Live Server rodando**, execute o seguinte comando no terminal:

```bash
npx cypress open