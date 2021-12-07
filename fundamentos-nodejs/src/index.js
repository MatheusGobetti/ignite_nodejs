const express = require('express');

const app = express();



app.get("/", (request, response) => {
  // Metodo send permite que a aplicação envie uma mensagem para quem está fazendo a solicitação do GET
  return response.json({message: "Hello world Ignite!"});
})

// localhost:3333
app.listen(3333);

