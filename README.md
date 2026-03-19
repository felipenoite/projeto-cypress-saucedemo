# 🧪 SauceDemo - Automação de Testes com Cypress

![Cypress](https://img.shields.io/badge/Cypress-13.x-04C38E?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-2.x-orange?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![CI](https://github.com/felipenoite/projeto-cypress-saucedemo/actions/workflows/cypress.yml/badge.svg)

> Projeto de estudos para automação de testes **E2E** e **API** do site [SauceDemo](https://www.saucedemo.com), utilizando **Cypress** com relatórios via **Allure** e **Mochawesome**.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar os Testes](#-como-executar-os-testes)
- [Testes E2E](#-testes-e2e)
- [Testes de API](#-testes-de-api)
- [Relatórios](#-relatórios)
- [CI/CD](#-cicd---github-actions)
- [Evidências](#-evidências)

---

## 📖 Sobre o Projeto

Este projeto cobre dois tipos de testes para o site SauceDemo:

- **Testes E2E (End-to-End):** Validam o fluxo completo da aplicação via interface gráfica, utilizando Cypress com seletores `data-test` para máxima estabilidade.
- **Testes de API:** Validam as requisições HTTP diretamente, utilizando `cy.request()` do próprio Cypress — sem necessidade de bibliotecas externas.

---

## 🛠 Tecnologias Utilizadas

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^13.x | Framework de testes E2E e API |
| [Allure Report](https://docs.qameta.io/allure/) | ^2.x | Relatórios detalhados com histórico |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | ^7.x | Relatórios HTML estáticos |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^20.x | Suporte a escrita BDD com Gherkin |
| [GitHub Actions](https://github.com/features/actions) | - | Pipeline CI/CD automatizada |

---

## 📁 Estrutura do Projeto

```
projeto-cypress-pipeline/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js          # Testes de autenticação
│   │   ├── inventory.cy.js      # Testes do inventário de produtos
│   │   ├── cart.cy.js           # Testes do carrinho de compras
│   │   ├── checkout.cy.js       # Testes do fluxo de checkout
│   │   ├── menu.cy.js           # Testes do menu e logout
│   │   └── api/
│   │       └── api.cy.js        # Testes de API (cy.request)
│   ├── fixtures/
│   │   └── example.json         # Massa de dados para os testes
│   └── support/
│       ├── commands.js          # Comandos customizados reutilizáveis
│       └── e2e.js               # Importações e configurações globais
├── allure-results/              # Resultados brutos do Allure (gerado automaticamente)
├── allure-report/               # Relatório HTML do Allure (gerado automaticamente)
├── reports/                     # Relatórios Mochawesome (gerado automaticamente)
├── screenshots/                 # Capturas de tela de falhas (gerado automaticamente)
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline CI/CD GitHub Actions
├── .gitignore
├── cypress.config.js            # Configuração principal do Cypress
├── package.json
└── README.md
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 8.x
- [Allure CLI](https://docs.qameta.io/allure/#_installing_a_commandline) (para geração de relatórios Allure)

Para instalar o Allure CLI via npm:
```bash
npm install -g allure-commandline
```

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/projeto-cypress-pipeline.git
cd projeto-cypress-pipeline
npm install
```

---

## ▶️ Como Executar os Testes

### Executar todos os testes (modo headless)
```bash
npm test
# ou
npx cypress run
```

### Executar com geração de relatório Allure
```bash
npm run cy:run
```

### Abrir o Cypress no modo interativo (GUI)
```bash
npx cypress open
```

### Executar um arquivo de teste específico
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Executar apenas os testes de API
```bash
npx cypress run --spec "cypress/e2e/api/api.cy.js"
```

---

## 🖥 Testes E2E

Os testes E2E cobrem os principais fluxos da aplicação:

| Arquivo | Cenários |
|---|---|
| `login.cy.js` | Login válido, senha incorreta, usuário bloqueado, campos vazios, performance_glitch_user |
| `inventory.cy.js` | Listagem de produtos, ordenação por nome e preço |
| `cart.cy.js` | Adicionar produto, remover produto, verificar itens no carrinho |
| `checkout.cy.js` | Fluxo completo de compra, validação de campos obrigatórios |
| `menu.cy.js` | Abertura do menu, logout, reset do estado da aplicação |

### Comandos customizados disponíveis (`commands.js`)

| Comando | Descrição |
|---|---|
| `cy.login(username, password)` | Realiza login na aplicação. Padrão: `standard_user` / `secret_sauce` |
| `cy.addToCart(productName)` | Adiciona um produto ao carrinho pelo nome |
| `cy.goToCart()` | Navega para a página do carrinho |
| `cy.fillCheckoutInfo(firstName, lastName, zipCode)` | Preenche o formulário de checkout |

---

## 🔌 Testes de API

Os testes de API utilizam `cy.request()` do próprio Cypress para validar requisições HTTP diretamente contra o backend do SauceDemo, sem passar pela interface gráfica.

> 📁 Arquivo: `cypress/e2e/api/api.cy.js`

### Cenários cobertos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/` | Valida que a página principal retorna status 200 |
| `GET` | `/inventory.html` | Valida acesso autenticado ao inventário |
| `GET` | `/cart.html` | Valida acesso à página do carrinho |
| `GET` | `/checkout-step-one.html` | Valida acesso à página de checkout |
| `GET` | `/404` | Valida resposta para rota inexistente |

### Exemplo de teste de API

```javascript
it("GET / - deve retornar status 200", () => {
  cy.request({
    method: "GET",
    url: "/",
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.headers["content-type"]).to.include("text/html");
  });
});
```

---

## 📊 Relatórios

### Allure Report (recomendado)

O Allure gera relatórios detalhados com histórico de execuções, gráficos e rastreabilidade de falhas.

```bash
# 1. Executar os testes gerando os resultados Allure
npm run cy:run

# 2. Gerar o relatório HTML
npm run allure:report

# 3. Abrir o relatório no navegador
npm run allure:open
```

### Mochawesome Report

Relatório HTML estático gerado automaticamente durante a execução:

```bash
npx cypress run --reporter mochawesome
```

O relatório é salvo em: `reports/html/cypress/reports/`

---

## 🔁 CI/CD - GitHub Actions

A pipeline está configurada em `.github/workflows/cypress.yml` e roda automaticamente a cada **push** ou **Pull Request** na branch `main`.

### Jobs da pipeline

| Job | Specs executadas | Gatilho |
|---|---|---|
| 🖥️ Testes E2E | `login`, `inventory`, `cart`, `checkout`, `menu` | Push e PR na main |
| 🔌 Testes de API | `api/api.cy.js` | Push e PR na main |

### Artifacts gerados

Após cada execução, os relatórios Allure ficam disponíveis para download na aba **Actions** do GitHub, em **Artifacts**:

- `allure-report-e2e` — relatório dos testes E2E
- `allure-report-api` — relatório dos testes de API

### Visualizar o relatório Allure localmente

Após baixar e extrair o `.zip` do artifact:

```bash
# Dentro da pasta extraída
npx serve .
```

Acesse `http://localhost:3000` no navegador.

> ⚠️ O Allure não funciona abrindo o `index.html` diretamente pelo navegador — sempre use um servidor local.

---

## 🖼 Evidências

O Cypress captura screenshots automaticamente em caso de falha nos testes. As imagens são salvas em:

```
screenshots/
└── nome-do-spec/
    └── nome-do-teste (failed).png
```

> 💡 **Dica:** Os vídeos estão desativados neste projeto (`video: false` no `cypress.config.js`) para reduzir o tamanho do repositório. Para ativar, altere para `video: true`.

---

## 👤 Usuários de Teste

O SauceDemo disponibiliza os seguintes usuários para testes:

| Usuário | Senha | Comportamento |
|---|---|---|
| `standard_user` | `secret_sauce` | Usuário padrão, fluxo normal |
| `locked_out_user` | `secret_sauce` | Usuário bloqueado, não consegue logar |
| `problem_user` | `secret_sauce` | Apresenta bugs visuais propositais |
| `performance_glitch_user` | `secret_sauce` | Login com delay proposital |
| `error_user` | `secret_sauce` | Apresenta erros em algumas ações |
| `visual_user` | `secret_sauce` | Apresenta problemas visuais específicos |

---

## 📝 Licença

Este projeto é de uso educacional e não possui fins comerciais.