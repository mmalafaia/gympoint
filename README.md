# gympoint

Projeto final do Curso Omnistack Rocketseat
# Premissa
Term todo o ambiente configurado nos padrões da RockeatSeat

Criar uma pasta local e executar o comando:
# #git clone git@github.com:mmalafaia/gympoint.git

Instalar os pacotes necessários:
acessar a pasta raíz do projeto
digitar o seguinte comando:
# #cd server && yarn && cd .. && cd web && yarn && cd .. && cd mobile && yarn && cd ..

#Server
Instalar Docker e rodar o comando para criar os bancos:
# #docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11 && docker run --name mongo -p 27017:27017 -d -t mongo && docker run --name redis -p 6379:6379 -d -t redis:alpine
Utilizando um gerenciar de Bando do Postgres, criar um database com nome: gympoint

Acessar a pasta server e executar o comando:
# #yarn sequelize db:migrate && yarn sequelize db:seed:all

O Server tem o Seed para criar o usuário administrador.

Rodar o servidor:
# #yarn dev

Acessar a pasta web
Rodar o comando:
# #yarn start

O Sistema Móvel foi desenvolvido apenas em android.
Está configurado para ambiente linux, ajustar o IP do reactotron
Com o celular plugado ou máquina virtual rodando, execute o comando:
# #react-native run-android && react-native start
