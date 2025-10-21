class HomePage {
  adicionarPrimeiroProdutoNaLista() {
    cy.get('[data-testid="adicionarNaLista"]').first().click();
  }

  acessarListaDeCompras() {
    cy.contains('Lista de Compras').click();
  }

  fazerLogout() {
    cy.get('[data-testid="logout"]').click();
    cy.url().should('include', '/login');
  }
}

module.exports = new HomePage();
