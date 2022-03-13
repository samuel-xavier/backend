BAGACO MYSQL

Documentação apoio:
SQL no Node.js com Sequelize | Masterclass #01
https://www.youtube.com/watch?v=Fbu7z5dXcRs&t=810s

1 - Criar o diretório do projeto (mkdir diretorioprojeto)
  - Criar o diretório do backend (dentro do diretório do projeto: mkdir diretoriobackend)

2 - Criar o projeto:
  - diretoriobackend\yarn init -y

3 - Instalar as ferramentas que serão utilizadas (express, 
  - diretoriobackend\yarn add express

4 - Instalar o nodemom
  - diretoriobackend\yarn add nodemon -D

5 - Instalar a extensão para conexão com MySql
  - diretoriobackend\npm install mysql2 --save

6 - Instalar o sequelize
  - diretoriobackend\yarn add sequelize
  - diretoriobackend\yarn add sequelize-cli -D

7 - Rodar o VsCode

8 - Incluir chamada pelo nodemom (yarn dev)
  - no package.json (\diretoriobackend), incluir abaixo da linha 'licence : MIT'
  - "scripts": {
    "dev": "nodemon src/server.js"
  },

9 - Incluir a rotina database.js
  - diretoriobackend\src\config\database.js

10 - Incluir a rotina server.js
   - diretoriobackend\src\server.js

XX - Incluir a rotina routes.js
   - diretoriobackend\src\routes.js

11 - Incluir a rotina index.js
   - diretoriobackend\src\database\index.js

12 - Incluir a rotina .sequelizerc
   -diretoriobackend\.sequelizerc

13 - Para criar o banco de dados (uma unica vez):
   - o nome do banco de dados está na rotina diretoriobackend\src\config\database.js
     (exemplo: database: 'bagaco2',)
   - yarn sequelize db:create

14 - Para criar as tabelas (para cada tabela)
14a - cria a pasta diretoriobackend\src\database\migrations (esta pasta terá os logs das criações/updates tabelas)
14b - criar a tabela (no diretorio backend): yarn sequelize migration:create --name=create-nometabela
      (exemplo: yarn sequelize migration:create --name=create-grpitens)
14c - ajustar o arquivo da pasta migrations da tabela correspondente (mome dos campos, etc)
14d - rodar o migrate para criar a tabela: yarn sequelize db:migrate


15 - Incluir a rotina na pasta \src\models\nome_tabela.js
16 - Incluir a rotina na pasta \src\controllers\nome_tabelaController.js
17 - Incluir/atualizar a tabela na rotina routes \src\routes.js
      Exemplo:
      const ItemController = require('./controllers/ItemController');
      routes.get('/itens', ItemController.index);
18 - Incluir/atualizar a rotina \src\database\index\index.js
   - incluir const Nometabela = require('../models/Nometabela');
   - incluir Nometabela.init(connection);

Para rodar:
 - no diretório backend: yarn dev

Para testar:
- na web: http://localhost:3333/itens 
- insomnia: similar a consulta acima

********
Para alterar uma tabela existente:
- copiar o arquivo create-nomedatabela da pasta \database\migrations\
- excluir o arquivo create-nomedatabela da pasta \database\migrations\
- excluir a tabela do banco de dados
- excluir a linha relacionada a tabela da tabela sequelizemeta (banco de dados)
- repetir os passos 14b em diante