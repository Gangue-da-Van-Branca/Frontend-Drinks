/// <reference types="cypress" />

describe('Cadastro em Lote de Itens no Painel de Administrador', () => {
    const itens = [
      {
        nome: 'Spicy Passion',
        descricao: 'Vodka, maracujá, syrup de pimenta dedo-de-moça e limão taiti',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Moscow Mule',
        descricao: 'Vodka, xarope de gengibre, limão taiti e espuma de gengibre',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Heineken 250 ml',
        descricao: 'Cerveja premium em garrafa de 250 ml',
        preco: 9,
        tipo: 'Opcional',
      },
      {
        nome: 'Bar Rústico',
        descricao:
          'Caipirinha flambada com cachaça envelhecida, Drink de catuaba com frutas vermelhas e espuma de maracujá, Moscow Mule na caneca de cobre com espuma de gengibre',
        preco: 1600,
        tipo: 'Bar',
      },
      {
        nome: 'Pink Lemonade',
        descricao:
          'Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes',
        preco: 15,
        tipo: 'Soft Drink',
      },
      {
        nome: 'Busca Vida artesanal em mini garrafas',
        descricao: 'Cachaça Busca Vida artesanal em mini garrafas',
        preco: 10,
        tipo: 'Shot',
      },
      {
        nome: 'Classic Tonic',
        descricao: 'Limão siciliano, xarope e tônica',
        preco: 15,
        tipo: 'Soft Drink',
      },
      {
        nome: 'Penicilin',
        descricao: 'Whisky, suco de limão siciliano, xarope de gengibre e scotch defumado',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Drink na Lâmpada',
        descricao: 'Drink especial servido em recipiente em formato de lâmpada',
        preco: 8,
        tipo: 'Opcional',
      },
      {
        nome: 'Ponche para Welcome Drink',
        descricao: 'Lillet, hortelã, laranja bahia e tônica com gelo especial (Bloco grande de gelo com Orquídea)',
        preco: 3500,
        tipo: 'Bar',
      },
      {
        nome: 'Piña Descalada',
        descricao: 'Suco de abacaxi, leite de coco, leite condensado e granulados coloridos',
        preco: 15,
        tipo: 'Soft Drink',
      },
      {
        nome: 'Mini Beer (Licor 43) com espuma',
        descricao: 'Shot de Licor 43 com camada de creme, assemelhando-se a uma mini cerveja',
        preco: 12,
        tipo: 'Shot',
      },
      {
        nome: 'Espumante Freixenet Brut',
        descricao: 'Garrafa de Espumante Freixenet Brut',
        preco: 75,
        tipo: 'Opcional',
      },
      {
        nome: 'Cerveja Stella Artois',
        descricao: 'Cerveja Stella Artois long neck ou lata',
        preco: 9,
        tipo: 'Opcional',
      },
      {
        nome: 'Bar de Café & Expresso Drinks',
        descricao: 'Espresso Martini, Irish Coffee, Cold Brew Tônica',
        preco: 1300,
        tipo: 'Bar',
      },
      {
        nome: 'Margarita',
        descricao: 'Tequila, Cointreau, suco de limão taiti e borda de sal',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Cucumber Fizz',
        descricao: 'Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Aperol Spritz',
        descricao: 'Aperol, espumante, água com gás e laranja',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Paradise',
        descricao: 'Vodka, água de coco, syrup de baunilha e raspas de coco desidratado',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Whisky Johnnie Walker Red Label',
        descricao: 'Garrafa de Whisky Johnnie Walker Red Label',
        preco: 100,
        tipo: 'Opcional',
      },
      {
        nome: 'Espumante Salton Brut',
        descricao: 'Garrafa de Espumante Salton Brut',
        preco: 40,
        tipo: 'Opcional',
      },
      {
        nome: 'Tequila de café em copinhos de chocolate',
        descricao: 'Shot de tequila de café servido em copinhos de chocolate comestíveis',
        preco: 16,
        tipo: 'Shot',
      },
      {
        nome: 'Bar de Gin Tônica + Box de Especiarias',
        descricao:
          'TORANJA TONIC – Gin, xarope de grapefruit, tangerina, pimenta rosa e tônica. CLASSIC TONIC – Gin, limão siciliano, zimbro e tônica',
        preco: 1400,
        tipo: 'Bar',
      },
      {
        nome: 'Classic Tonic',
        descricao: 'Gin, limão siciliano e tônica',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Lichai Paradise',
        descricao: 'Água com gás, morangos simples, lichia, suco de limão e hortelã',
        preco: 15,
        tipo: 'Soft Drink',
      },
      {
        nome: 'Whisky Black Label',
        descricao: 'Garrafa de Whisky Black Label',
        preco: 160,
        tipo: 'Opcional',
      },
      {
        nome: 'Fitzgerald',
        descricao: 'Gin, syrup de açúcar, suco de limão siciliano, angostura bitters e zest',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Bar de Caipirinhas – Vodka, Saquê e Cachaça',
        descricao: 'Abacaxi com hortelã, Uva com manjericão, Kiwi com limão',
        preco: 1500,
        tipo: 'Bar',
      },
      {
        nome: 'Cirque Blue',
        descricao: 'Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta',
        preco: 15,
        tipo: 'Soft Drink',
      },
      {
        nome: 'Daiquiri Clássico',
        descricao: 'Rum branco, suco de limão taiti e xarope de açúcar',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Mini milk-shakes de Oreo',
        descricao: 'Deliciosos mini milk-shakes feitos com biscoito Oreo',
        preco: 15,
        tipo: 'Shot',
      },
      {
        nome: 'Negroni Twist',
        descricao: 'Gin, vermute rosso, Campari e zest de laranja bahia',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Bar Whiskeria – Harmonizações',
        descricao:
          'Gelos em cubos com folha de ouro, Gelos em Esferas, Zest de casca de limão siciliano e Zest de casca de laranja e defumação.',
        preco: 3500,
        tipo: 'Bar',
      },
      {
        nome: 'Basil Smash',
        descricao: 'Gin, suco de limão siciliano, syrup de manjericão e folhas de manjericão',
        preco: 15,
        tipo: 'Drink Alcoólico',
      },
      {
        nome: 'Jagermeister em tubos de ensaio',
        descricao: 'Shot de Jagermeister servido em tubos de ensaio',
        preco: 10,
        tipo: 'Shot',
      },
    ];

    let itemIndex = 0;
  
    beforeEach(() => {
      // Login
      cy.visit('http://localhost:5173/');
      cy.get('.Login').click();
      cy.get('input[type="email"]').type('victor.boaventura@gec.inatel.br');
      cy.get('input[type="password"]').first().type('senha123');
      cy.get('form').find('button[type="submit"]').contains('Entrar').click();
      cy.contains('Victor').should('be.visible');
    });
  
    it('deve cadastrar todos os itens da lista', () => {
        itens.forEach((item) => {
          itemIndex++;
          cy.log(`Cadastrando item: ${item.nome}`);
    
          cy.visit('http://localhost:5173/administrador');
    
          cy.get('#nome').clear().type(item.nome);
          cy.get('#descricao').clear().type(item.descricao);
          cy.get('#preco').clear().type(item.preco.toString());
          cy.get('#tipo').select(item.tipo);
          cy.get('.btn-submit').click();
    
          cy.reload();
    
          cy.contains('.item-info', item.nome).should('be.visible');
        });
      });

      it('Deve alterar o primeiro item cadastrado na lista', () => {
        const novoNome = 'Alterado ';
        cy.log(`Alterando o último item cadastrado`);
        cy.visit('http://localhost:5173/administrador');
        cy.wait(1000);
        cy.get('.item-list').find('.item-actions > .icon-btn-edit-btn').first().click();
        cy.get('#nome').type(' Alterado');
        cy.get('.btn-submit').click();
        cy.reload();
        cy.contains('.item-info', novoNome).should('be.visible');
      });

  });