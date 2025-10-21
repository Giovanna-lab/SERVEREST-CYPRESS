// gera email aleatório
Cypress.Commands.add('generateEmail', () => {
  const random = Math.floor(Math.random() * 1000000);
  return `admin${random}@qa.com`;
});

// comando para cadastro de admin
Cypress.Commands.add('registerAdmin', () => {
  const email = Cypress._.get(Cypress.env(), 'adminEmail') || Cypress.Commands.generateEmail();
  const user = {
    nome: "Administrador Teste",
    email,
    password: "teste123",
    administrador: "true"
  };

  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/usuarios',
    body: user,
    failOnStatusCode: false // caso já exista
  }).then((res) => {
    if(res.status === 201){
      cy.log('Admin cadastrado com sucesso');
    } else {
      cy.log('Admin já cadastrado, reutilizando');
    }
    Cypress.env('adminEmail', email);
    Cypress.env('adminPassword', user.password);
  });
});

// comando para login
Cypress.Commands.add('loginAdmin', () => {
  const body = {
    email: Cypress.env('adminEmail'),
    password: Cypress.env('adminPassword')
  };

  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body
  }).then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env('token', res.body.authorization);
  });
});
