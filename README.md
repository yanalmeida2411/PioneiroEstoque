Documentação Sistema de Estoque Pioneiro

1. Nome do Projeto

Sistema de Estoque Pioneiro

 2. Descrição

Este sistema permite gerenciar o estoque de produtos, registrando entradas, saídas e atualizando a quantidade disponível. Além do gerenciamento de estoque, é possível também realizar o cálculo da compra efetuada, onde o item comprado é retirado na mesma hora do estoque.

3. Tecnologias Utilizadas

Frontend: React.js (JavaScript)
Backend: Node.js (Express)
Banco de Dados: MySQL

 4. Como Rodar o Projeto

Parte do Back-end(Parte do Servidor)

I) Instale as dependências do Back-end (Parte do Servidor)

cd backend
npm install (mysql2,dotenv,express,cors,nodemon)
npm start (ativa o nodemon e o servidor fica sendo observado para atualizações dinâmicas)

II) Configure o acesso ao banco de dados (`.env`):

MYSQL_HOST= localhost
MYSQL_USER= root
MYSQL_PASSWORD= senha_do_db
MYSQL_NAME= estoque_pioneiro_db

Parte do Front-end (Parte do Usuário)

I) Instale as dependências do Front-end (Parte do Usuário)

cd frontend
npm install (axios)
npm run dev

 5. Rotas da API (Back-end)

GET - /produtos - Lista todos os produtos

POST - /produtos - Adiciona um novo produto

PUT - /produtos/:id - Atualiza um produto

DELETE - /produtos/:id - Remove um produto

6. Funcionalidades

Adicionar e excluir produtos  
Controle de estoque (entrada/saída)  

7. Melhorias Futuras

Criar dashboard com gráficos controlando a saída dos itens e os valores.
Editar Produtos.
Relatórios do Estoque.
