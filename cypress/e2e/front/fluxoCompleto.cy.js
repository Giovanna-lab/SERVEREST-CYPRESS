const CadastroAPI = require('../../support/pages/CadastroAPI');
const LoginPage = require('../../support/pages/LoginPage');
const HomePage = require('../../support/pages/HomePage');
const ListaDeComprasPage = require('../../support/pages/ListaDeComprasPage');

describe('Fluxo completo de cadastro, login, compra e logout', () => {
  it('deve realizar todo o fluxo do usuário com sucesso', () => {
    //Cria usuário aleatório
    const novoUsuario = CadastroAPI.gerarUsuarioAleatorio();

    //Cadastra via API
    CadastroAPI.cadastrarUsuario(novoUsuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    });

    //Login no front-end
    LoginPage.visitar();
    LoginPage.preencherEmail(novoUsuario.email);
    LoginPage.preencherSenha(novoUsuario.password);
    LoginPage.submeter();
    LoginPage.verificarLogin();

    //Adiciona produto e acessa lista
    HomePage.adicionarPrimeiroProdutoNaLista();
    HomePage.acessarListaDeCompras();

    //Limpa a lista e faz logout
    ListaDeComprasPage.limparLista();
    HomePage.fazerLogout();
  });
});
