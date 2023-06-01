
# Cars Control - Controle de carros

Projeto de controle de cadastro de carros, nele você consegue cadastrar, editar, excluir e listar veículos. A seguir a lsita de técnologias utilizadas:

* Typescript;
* NodeJS
* Express
* Mocha
* Chai
* Angular
* Sass

* Neste repositório estão todas as partes do projeto (monorepo), api (back-end) e front-end.

## Documentação da API

#### Retorna todas as categorias

```http
  GET /categories
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
| `id`      | `string (uuid)` | **Obrigatório**. O ID do carro que você quer |


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

#### Cadastra um novo pedido

```http
  POST /orders
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `mesa`      | `string` | **Obrigatório**. Identificação da mesa |
| `products`      | `Array<object>` | **Obrigatório**. Produtos do pedido |

Objeto products
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `product`      | `string` | **Obrigatório**. Id do produto |
| `quantity`      | `string` | **Obrigatório**. Quantidade |

#### Validar credenciais

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `e-mail`      | `string` | **Obrigatório**. E-mail do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuaŕio |

#### Validar JWT Token

```http
  POST /token
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório**. Token JWT |

#### Alterar status de um pedido

```http
  PATCH /orders/:orderId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `orderId`      | `string` | **Obrigatório**. Id do pedido |
| `status`      | `string` | **Obrigatório**. enum(WAITING, IN_PRODUCTION, DONE) |

#### Deletar um pedido

```http
  DELETE /orders/:orderId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `orderId`      | `string` | **Obrigatório**. Id do pedido |



## Demonstração

Insira um gif ou um link de alguma demonstração


## Screenshots

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047183122661388328/image.png?width=1242&height=632)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047184310416986162/image.png?width=1440&height=355)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047184731256651776/image.png?width=1287&height=632)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047185705018867722/Screenshot_20221129_131443.jpg?width=311&height=632)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047185975463391282/image.png)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047185316706013214/Screenshot_20221129_131548.jpg?width=311&height=632)

![App Screenshot](https://media.discordapp.net/attachments/1044691984260010016/1047185315829391410/Screenshot_20221129_131611.jpg?width=311&height=632)
