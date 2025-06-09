/// <reference types="cypress" />

// --- Helper para gerar números aleatórios ---
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('Fluxo de Criação de Orçamento Dinâmico', function() {
  
  beforeEach(function() {
      cy.visit('https://elo-drinks.netlify.app/');
      cy.get('.Login').click();
      cy.get('input[type="email"]').type('admin@admin.com');
      cy.get('input[type="password"]').type('senha123');
      cy.get('form').find('button[type="submit"]').contains('Entrar').click();
      cy.contains('admin').should('be.visible');
  });

  it('Deve criar um orçamento com seleções e valores aleatórios', function() {
    
    cy.log('--- Iniciando Navegação ---');
    cy.visit('https://elo-drinks.netlify.app/');
    cy.get('ul > :nth-child(4) > a').click();
    cy.get('#personalizar-botao').click();
    
    cy.log('--- Selecionando Tipo de Festa Aleatoriamente ---');
    cy.get('.tipo-opcoes .tipo-opcao').then($tipos => {
        const indiceAleatorio = getRandomInt(0, $tipos.length - 1);
        const $tipoSelecionado = cy.wrap($tipos).eq(indiceAleatorio);
        $tipoSelecionado.find('input').click({ force: true });
        $tipoSelecionado.invoke('text').then(texto => {
            cy.log(`Tipo de festa selecionado: ${texto.trim()}`);
        });
        if (indiceAleatorio === 7) {
            cy.log('--- "Outro" tipo de festa selecionado, preenchendo campo adicional ---');
            cy.get('.campo-outro').should('be.visible').type(`Festa de Teste Aleatório ${getRandomInt(1, 100)}`);
        }
    });

    cy.log('--- Selecionando Obrigatoriamente 8 Drinks Aleatórios ---');
    const numeroDeDrinksParaSelecionar = 8;
    cy.get('.quadro .item-drink').then($drinks => {
        if ($drinks.length < numeroDeDrinksParaSelecionar) {
            throw new Error(`Não há drinks suficientes para selecionar ${numeroDeDrinksParaSelecionar}. Encontrados: ${$drinks.length}`);
        }
        const todosOsDrinks = $drinks.toArray();
        const drinksEmbaralhados = todosOsDrinks.sort(() => 0.5 - Math.random());
        const drinksSelecionados = drinksEmbaralhados.slice(0, numeroDeDrinksParaSelecionar);
        cy.log(`Selecionando ${numeroDeDrinksParaSelecionar} drinks...`);
        cy.wrap(drinksSelecionados).each($drink => {
            cy.wrap($drink).find('input[type="checkbox"]').click({ force: true });
        });
    });
    
    cy.get('#botao-avancar').click();

    cy.log('--- Selecionando Bares Aleatoriamente ---');
    cy.get('.bar-card').then($bares => {
        if ($bares.length > 0) {
            const numeroDeBaresParaSelecionar = getRandomInt(1, $bares.length);
            const todosOsBares = $bares.toArray();
            const baresEmbaralhados = todosOsBares.sort(() => 0.5 - Math.random());
            const baresSelecionados = baresEmbaralhados.slice(0, numeroDeBaresParaSelecionar);
            cy.log(`Selecionando ${numeroDeBaresParaSelecionar} bares...`);
            cy.wrap(baresSelecionados).each($bar => {
                cy.wrap($bar).find('input[type="checkbox"]').click({ force: true });
            });
        } else {
            cy.log('Nenhum bar disponível para selecionar.');
        }
    });
    
    cy.log('--- Adicionando Quantidades Aleatórias de Shots ---');
    cy.get('.shot-card').each($shot => {
        if (Math.random() > 0.5) {
            const quantidade = getRandomInt(10, 150);
            cy.wrap($shot).find('.shot-input').type(quantidade.toString());
            cy.wrap($shot).find('.shot-titulo').invoke('text').then(titulo => {
                cy.log(`Adicionado ${quantidade}x de: ${titulo.trim()}`);
            });
        }
    });
    
    cy.log('--- Adicionando Quantidades Aleatórias de Opcionais ---');
    cy.get('.outro-card').each($outro => {
        if (Math.random() > 0.5) {
            const quantidade = getRandomInt(5, 50);
            cy.wrap($outro).find('.outro-input').type(quantidade.toString());
            cy.wrap($outro).find('.outro-titulo').invoke('text').then(titulo => {
                cy.log(`Adicionado ${quantidade}x de: ${titulo.trim()}`);
            });
        }
    });

    cy.get('#botao-avancar').click();

    cy.log('--- Preenchendo Formulário Final com Dados Aleatórios ---');
    const numConvidados = getRandomInt(50, 400);
    const dataAtual = new Date();
    const dataFutura = new Date(dataAtual.setDate(dataAtual.getDate() + getRandomInt(30, 365)));
    const dataFormatada = dataFutura.toISOString().split('T')[0];
    const horaInicio = `${getRandomInt(18, 20).toString().padStart(2, '0')}:${getRandomInt(0, 59).toString().padStart(2, '0')}`;
    const horaFinal = `${getRandomInt(21, 23).toString().padStart(2, '0')}:${getRandomInt(0, 59).toString().padStart(2, '0')}`;
    cy.get('[placeholder="ENDEREÇO DO EVENTO"]').type('Rua Gerada por Teste, ' + getRandomInt(1, 1000));
    cy.get('[placeholder="CEP"]').type(getRandomInt(10000000, 99999999).toString());
    cy.get('[placeholder="NÚMERO DE CONVIDADOS"]').type(numConvidados);
    cy.get('[placeholder="DATA"]').type(dataFormatada);
    cy.get('[placeholder="HORÁRIO DE INICIO"]').type(horaInicio);
    cy.get('[placeholder="HORÁRIO FINAL"]').type(horaFinal);

    // --- SUBMISSÃO E VERIFICAÇÃO FINAL ---
    cy.log('--- Submetendo o orçamento e preparando para verificar o alerta ---');
    
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Orçamento enviado com sucesso! Veja o andamento na aba "Meus pedidos"');
    });

    cy.get('.form-footer > button').click(); 
    cy.url().should('include', '/orcamento-resumo');
    cy.wait(500);
    cy.get('#confirm').contains('CONFIRMAR ENVIO').click();
    cy.wait(500);

    cy.log('--- Capturando o Preço Final para Verificação ---');
    cy.get('#preco-final')
      .invoke('text')
      .then(textoCompleto => {
        const valorDaMoeda = "R$ " + textoCompleto.split('R$ ')[1].trim();
        cy.wrap(valorDaMoeda).as('precoSalvo');
      });
});

// TESTE DE VERIFICAÇÃO
it('Deve verificar se o orçamento foi criado corretamente, buscando-o na lista', function() {
  const precoEsperado = this.precoSalvo;

  if (!precoEsperado) {
      this.skip();
  }

  cy.log(`Buscando na lista pelo pedido com o total: ${precoEsperado}`);

  cy.get('.user-greeting').click();
  cy.get('.user-menu > :nth-child(1)').click();
  cy.url().should('include', '/meus-pedidos');
  cy.get('#meus-pedidos-lista')
    .contains('p#meus-pedidos-total', precoEsperado)
    .should('be.visible');
});
});