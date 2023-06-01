
# Cars Control - Controle de carros

Projeto para controle de carros, nele você consegue cadastrar, editar, excluir e listar veículos. A seguir a lsita de técnologias utilizadas:

* Typescript;
* NodeJS;
* Express;
* Mocha;
* Chai;
* Angular;
* Sass;
* O banco de dados está em memória.


#### Neste repositório estão todas as partes do projeto (monorepo), api (back-end) e front-end.
#### Este foi o primeiro projeto que fiz utilizando o framework Angular no front-end, foi um experiência muito boa e de aprendizados.

## Como iniciar a aplicação

* Clone o projeto;
* Entre na pasta do projeto de terminal;

#### Iniciando o Back-end
  * Para iniciar o back-end, primeiro acesse a pasta back-end dentro da pasta principal do projeto;
  * Execute 'npm install' ou o comando de instalar de seu gerenciador de pacotes;
  * Crie um arquivo .env na raiz do projeto, seguindo as especificações do arquivo .env.example que também está na raiz do projeto.
  * Para iniciar o back-end execute 'npm run dev', ou execute o script 'dev' com seu gerenciador de pacotes;
  * Para rodas os testes execute 'npm run test', ou execute o script 'test' com seu gerenciador de pacotes;
  * O projeto estará rodando na posta definida no arquivo .env ou na porta padrão que é a 3000.

#### Iniciando o Front-end
  * Para iniciar o front-end, primeiro acesse a pasta front-end dentro da pasta principal do projeto;
  * Execute 'npm install' ou o comando de instalar de seu gerenciador de pacotes;
  * Para iniciar o front-end execute 'npm start', ou execute o script 'start' com seu gerenciador de pacotes;
  * O projeto estará rodando na posta padrao do Angular que é a 4200 ou irá mostrar no output do console qual é a porta.

## Documentação da API

#### Exemplo de objeto para cadastrar/editar carro:

```json

{
  "car": {
    "placa": "ABC-123",
    "chassi": "AAABBBCCCDDD",
    "modelo": "Uno",
    "marca": "Fiat",
    "ano": 2020
  }
}

```

#### Exemplo de objeto para de retorno ao cadastrar um novo carro:

```json
{
  "placa": "ABC-123",
  "chassi": "AAABBBCCCDDD",
  "modelo": "Uno",
  "marca": "Fiat",
  "ano": 2020
 }
```


#### Retorna todos os carros

```http
  GET /cars
```

#### Retorna um determinado carro

```http
  GET /cars/:id
```

| Parâmetro | Tipo          | Descrição                                      |
| :-------- | :------------ | :--------------------------------------------- |
| `id`      | `string (uuid)` | **Obrigatório**. O ID do carro |


#### Cadastrar um novo carro

```http
  POST /cars
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `car`      | `Object` | **Obrigatório**. Dados do carro |

Objeto car
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `placa`      | `string` | **Obrigatório**. Placa do carro |
| `chassi`      | `string` | **Obrigatório**. Chassi do carro |
| `modelo`      | `string` | **Obrigatório**. Modelo do carro |
| `marca`      | `string` | **Obrigatório**. Marca do carro |
| `ano`      | `number` | **Obrigatório**. Ano do carro |


#### Alterar dado(s) de um carro

```http
  PUT /cars/:id
```

| Parâmetro | Tipo          | Descrição                                      |
| :-------- | :------------ | :--------------------------------------------- |
| `id`      | `string (uuid)` | **Obrigatório**. O ID do carro que você quer alterar |
| `car`      | `Object` | **Obrigatório**. Dados do carro |

- Dentro do objeto car você irá passar o(s) dado(s) que você deseja alterar.

#### Deletar um carro

```http
  DELETE /cars/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string (uuid)` | **Obrigatório**. O ID do carro que você quer alterar |



## Demonstração

Screenshots da aplicação front-end


## Screenshots

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898686632701986/1.jpg?width=1238&height=612)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898686892757083/2.jpg?width=878&height=430)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898687115047053/3.jpg?width=880&height=430)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898687505125406/4.jpg?width=873&height=430)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898687752573019/5.jpg?width=871&height=430)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898687966490724/6.jpg?width=869&height=430)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1113898688318820432/7.jpg?width=873&height=430)
