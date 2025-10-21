class LoginPage {
  visitar() {
    cy.visit('https://front.serverest.dev/login');
  }

  preencherEmail(email) {
    cy.get('[data-testid="email"]').type(email);
  }

  preencherSenha(senha) {
    cy.get('[data-testid="senha"]').type(senha);
  }

  submeter() {
    cy.get('[data-testid="entrar"]').click();
  }

  verificarLogin() {
    cy.url().should('include', '/home');
    cy.contains('Lista de Compras').should('be.visible');
  }
}

module.exports = new LoginPage();
