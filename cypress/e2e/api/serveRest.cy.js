/// <reference types="cypress" />

// Função para gerar email e nome aleatórios
function gerarEmailAleatorio() {
  const timestamp = Date.now();
  return `admin_${timestamp}@qa.com`;
}

function gerarNomeProduto() {
  const timestamp = Date.now();
  return `Produto Cypress ${timestamp}`;
}

describe('ServeRest API - Testes Cypress', () => {
  let token = '';
  let usuarioId = '';
  let produtoId = '';
  const adminEmail = gerarEmailAleatorio();
  const adminPassword = 'Teste123!';
  const produtoNome = gerarNomeProduto();

  before(() => {
    // Cadastro de usuário administrador
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: 'Administrador QA',
        email: adminEmail,
        password: adminPassword,
        administrador: 'true'
      },
      failOnStatusCode: false // evita falhar caso já exista
    }).then((res) => {
      if (res.status === 201) {
        usuarioId = res.body._id;
        cy.log('Usuário administrador cadastrado: ' + usuarioId);
      } else {
        cy.log('Usuário já existente, prosseguindo com login...');
      }
    });

    // Login do administrador
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: adminEmail,
        password: adminPassword
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.authorization;
      cy.log('Token obtido: ' + token);
    });
  });

  context('Usuários', () => {
    it('Listar usuários', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios'
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.usuarios).to.be.an('array');
      });
    });
  });

  context('Produtos', () => {
    it('Cadastrar produto aleatório', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { Authorization: token },
        body: {
          nome: produtoNome,
          preco: 150,
          descricao: 'Produto gerado automaticamente para teste',
          quantidade: 20
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.contain('Cadastro realizado com sucesso');
        produtoId = res.body._id;
        cy.log('Produto criado: ' + produtoNome);
      });
    });

    it('Listar produtos', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos'
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.produtos).to.be.an('array');
      });
    });

    it('Editar produto cadastrado', () => {
      cy.request({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${produtoId}`,
        headers: { Authorization: token },
        body: {
          nome: `${produtoNome} - Editado`,
          preco: 180,
          descricao: 'Produto editado automaticamente',
          quantidade: 30
        }
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);
      });
    });
  });

  context('Carrinhos', () => {
    it('Cadastrar carrinho com o produto', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: token },
        body: {
          produtos: [
            { idProduto: produtoId, quantidade: 1 }
          ]
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.contain('Cadastro realizado com sucesso');
      });
    });

    it('Listar carrinhos', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/carrinhos'
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.carrinhos).to.be.an('array');
      });
    });

    it('Cancelar carrinho', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/cancelar-compra',
        headers: { Authorization: token }
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
