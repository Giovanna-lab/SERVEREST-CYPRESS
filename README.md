# SERVEREST-CYPRESS

⚙️ Pré-requisitos

Node.js >= 18

npm ou yarn

Cypress instalado globalmente ou no projeto

Instalação das dependências:

npm install
# ou
yarn install

🚀 Executando os testes
Front-end

Os testes de Front-end simulam todo o fluxo do usuário:

Cadastro de usuário aleatório via API

Login no front-end

Adição de produtos à lista de compras

Limpeza da lista e logout

Executar:

npx cypress open
# ou
npx cypress run --spec "cypress/e2e/front/*.cy.js"

API

Os testes de API cobrem:

CRUD de usuários

CRUD de produtos (com criação aleatória de nomes)

Operações com carrinhos de compras

Executar:

npx cypress open
# ou
npx cypress run --spec "cypress/e2e/api/*.cy.js"

🔧 Configurações importantes

Cadastro de usuário aleatório: todos os testes criam e usam usuários com email único gerado via timestamp para evitar conflitos.

Produtos aleatórios: nomes de produtos são gerados dinamicamente para garantir a integridade dos testes.

Autenticação: os testes de API obtêm um token JWT automaticamente para realizar operações protegidas.

🧪 Tecnologias utilizadas

Cypress
 - Automação de testes Front-end e API

JavaScript / Node.js

Page Object Model para organização dos testes de interface

📌 Observações

O ambiente de teste usado é: Serverest API

Os testes estão configurados para não falhar caso o usuário já exista.

Todos os testes são independentes e podem ser executados várias vezes sem afetar o ambiente.
