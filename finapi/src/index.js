const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  // Regra de negócio (2)
  if(!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  request.customer = customer;

  return next();
}

/* 

 - CPF - string
 - name - string
 - id - UUID
 - statement - array

*/

// Requisito (1)
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  // Regra de negócio (1)
  if(customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

// Requisito (2)
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.listen(3333);