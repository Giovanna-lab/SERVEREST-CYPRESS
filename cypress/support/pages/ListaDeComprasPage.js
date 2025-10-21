class ListaDeComprasPage {
  limparLista() {
    cy.get('[data-testid="limparLista"]').click();
  }
}

module.exports = new ListaDeComprasPage();
