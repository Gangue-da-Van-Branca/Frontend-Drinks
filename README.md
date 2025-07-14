# Frontend Elo Drinks

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1832929-87d0-4f29-8319-48a9a7bc5c95/deploy-status)](https://app.netlify.com/projects/elo-drinks/deploys)

Interface web do site Elo Drinks, um projeto desenvolvido para facilitar a gestão e a requisição de serviços de bebidas em eventos, bares e ambientes de convivência. Esta aplicação foi construída com foco em responsividade, praticidade e boa experiência do usuário.

🔗 Acesse a aplicação em produção:
[EloDrinks](https://elo-drinks.netlify.app/)

---

## Como usar

Essas instruções ajudarão você a obter uma cópia do projeto rodando localmente para desenvolvimento e testes. Veja a seção *Deployment* para detalhes sobre como colocar o sistema em produção.

### Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas: 
- [Node.js](https://nodejs.org/pt)
- [Git](https://git-scm.com/)

### Installing

Clone o repositório:


    git clone https://github.com/Gangue-da-Van-Branca/Frontend-Drinks.git
    cd Frontend-Drinks

Instale as dependências:

    npm install

    
Execute o servidor de desenvolvimento:

    npm run dev

Abra o navegador e acesse http://localhost:5173 (ou a porta especificada) para visualizar a aplicação rodando.

## Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione a URL da API que será utilizada:

    VITE_API_URL=http://localhost:8080  # ou a URL de produção

🔗 Nossa API: [Backend-Drinks](https://github.com/Gangue-da-Van-Branca/Backend-Drinks)

##  Testes Automatizados
### Cypress E2E

Para rodar os testes automatizados com o Cypress:


    npx cypress open
    #ou
    npx cypress run

Esses testes garantem que:

- Os principais fluxos de navegação funcionam corretamente
- Formulários e interações com o backend ocorrem como esperado
- A aplicação se comporta de forma confiável na perspectiva do usuário final


## Deployment

Para rodar em produção, gere a build com o comando:

    npm run build

Depois, sirva a pasta dist/ em qualquer servidor web (como Nginx, Vercel, Netlify ou GitHub Pages).

## Tecnologias Utilizadas

  - [React](https://react.dev/)
  - [Vite](https://vite.dev/)
  - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - [Cypress](https://www.cypress.io/) - testes end-to-end
  - [Netlify](https://www.netlify.com/) - Hospedagem


## Authors

  - [**Felipe Henrique Conrado**](https://github.com/FConrado) - UI Developer
    - Responsável pela estilização visual da aplicação e adaptação responsiva.
  - [**Pedro Henrique Passos Carreira**](https://github.com/PedroPassos87) - Front-end Developer
    - Responsável pela implementação das páginas, integração com o backend, criação das funcionalidades e deploy no Netlify.
    - Também atuou na organização das tarefas, revisão de código e estruturação geral do projeto.
  - [**Victor Boaventura**](https://github.com/bsmvictor) - QA
    - Responsável pela criação e execução dos testes automatizados end-to-end utilizando Cypress.
