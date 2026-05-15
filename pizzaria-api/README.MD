# 🍕 Pizzaria API

API REST desenvolvida para gerenciamento de pedidos de uma pizzaria.

---

## 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* MongoDB
* Mongoose

---

## 📦 Funcionalidades

* Criar pedidos
* Listar pedidos
* Atualizar status do pedido

---

## 📡 Rotas da API

### ➤ Criar pedido

POST /orders

Exemplo:
{
"customerName": "Vinicius",
"items": ["Pizza Calabresa"]
}

---

### ➤ Listar pedidos

GET /orders

---

### ➤ Atualizar status

PUT /orders/:id

Exemplo:
{
"status": "ENTREGUE"
}

---

## ▶️ Como rodar o projeto

```bash
npm install
npm run dev
```

---

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```
MONGO_URL=sua_string_do_mongodb
```

---

## 📌 Status do projeto

🚧 Em desenvolvimento

---

## 👨‍💻 Autor

Vinicius
