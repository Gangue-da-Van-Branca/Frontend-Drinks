/// <reference types="cypress" />

describe('Gerenciamento de Itens (CRUD)', function() {
    
  before(function() {
      cy.visit('https://elo-drinks.netlify.app/');
      cy.get('.Login').click();
      cy.get('input[type="email"]').type('admin@admin.com');
      cy.get('input[type="password"]').type('senha123');
      cy.get('form').find('button[type="submit"]').contains('Entrar').click();
      cy.contains('admin').should('be.visible');
      cy.wait(500);
  });

  it('deve realizar o ciclo completo de um item: Criar, Verificar, Atualizar e Deletar', function() {
      
      // --- DADOS DE TESTE ---
      const nomeItemOriginal = `Drink Teste Cypress ${Date.now()}`;
      const dadosItem = {
          nome: nomeItemOriginal,
          descricao: 'Descrição gerada pelo teste automatizado.',
          preco: '25.50',
          tipo: 'Soft Drink'
      };

      const dadosAtualizados = {
          nome: `${nomeItemOriginal} (Editado)`,
          preco: '30.00'
      };

      // --- 1. FASE DE CRIAÇÃO (CREATE) ---
      cy.log('--- INICIANDO FASE DE CRIAÇÃO ---');
      
      // Navega para o painel de administração
      cy.get('.user-greeting').click();
      cy.get('.user-menu').contains('Admin board').click();
      cy.url().should('include', '/administrador');
      cy.get('h1').contains('Painel Administrativo - ELO DRINKS').should('be.visible');

      // Preenche o formulário para criar um novo item
      cy.get('#nome').clear().type(dadosItem.nome);
      cy.get('#descricao').clear().type(dadosItem.descricao);
      cy.get('#preco').clear().type(dadosItem.preco);
      cy.get('#tipo').select(dadosItem.tipo);
    
      cy.contains('button', 'Cadastrar Item').click();
      cy.on('window:alert', (str) => {
          expect(str).to.equal(`Item ${dadosItem.nome} cadastrado com sucesso!`);
      }
      );
      cy.wait(500);
      cy.reload();

      // --- 2. FASE DE VERIFICAÇÃO (READ) ---
      cy.log('--- INICIANDO FASE DE VERIFICAÇÃO PÓS-CRIAÇÃO ---');

      // Usa o filtro para encontrar o item recém-criado
      cy.get('input[placeholder="Buscar por nome..."]').clear().type(dadosItem.nome);
      cy.get('.item-card').should('have.length', 1); // Garante que apenas um item foi encontrado
      cy.contains('.item-card', dadosItem.nome).should('be.visible');
      
      // --- 3. FASE DE ATUALIZAÇÃO (UPDATE) ---
      cy.log('--- INICIANDO FASE DE ATUALIZAÇÃO ---');
      
      // Encontra o item na lista e clica no botão de editar
      cy.contains('.item-card', dadosItem.nome)
        .find('button[title="Editar"]')
        .click();

      // Na página de edição, altera os campos desejados
      cy.get('#nome').clear().type(dadosAtualizados.nome);
      cy.get('#preco').clear().type(dadosAtualizados.preco);
      cy.get('.btn-submit').click();
      cy.wait(500);
      cy.reload();

      // --- 4. FASE DE VERIFICAÇÃO PÓS-ATUALIZAÇÃO ---
      cy.log('--- INICIANDO FASE DE VERIFICAÇÃO PÓS-ATUALIZAÇÃO ---');

      // Filtra pelo NOVO nome do item
      cy.get('input[placeholder="Buscar por nome..."]').clear().type(dadosAtualizados.nome);

      // Verifica se o item com o nome atualizado aparece e contém o preço novo
      cy.contains('.item-card', dadosAtualizados.nome)
        .should('be.visible')
        .and('contain.text', dadosAtualizados.preco);

      // --- 5. FASE DE EXCLUSÃO (DELETE) ---
      cy.log('--- INICIANDO FASE DE EXCLUSÃO ---');

      // Encontra o item atualizado e clica para deletar
      cy.contains('.item-card', dadosAtualizados.nome)
        .find('button[title="Excluir"]')
        .click();

      // --- 6. FASE DE VERIFICAÇÃO PÓS-EXCLUSÃO ---
      cy.log('--- INICIANDO FASE DE VERIFICAÇÃO PÓS-EXCLUSÃO ---');
      
      // Filtra novamente pelo nome do item deletado
      cy.get('input[placeholder="Buscar por nome..."]').clear().type(dadosAtualizados.nome);

      // Garante que o item não existe mais na lista
      cy.contains('.item-card', dadosAtualizados.nome).should('not.exist');
  });
});