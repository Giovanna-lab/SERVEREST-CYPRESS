class CadastroAPI {
  cadastrarUsuario(usuario) {
    return cy.request('POST', 'https://serverest.dev/usuarios', usuario);
  }

  gerarUsuarioAleatorio() {
    const timestamp = Date.now();
    return {
      nome: `Usuário Teste ${timestamp}`,
      email: `user_${timestamp}@teste.com`,
      password: 'teste123',
      administrador: 'false'
    };
  }
}

module.exports = new CadastroAPI();
