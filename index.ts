import express, { Request, Response } from "express";
import { sequelize } from "./src/database";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "./src/controllers/books";
import { createUser, getUsers } from "./src/controllers/user";
import { createAuthor, getAuthors } from "./src/controllers/author";
const formData = require('express-form-data');
// const bodyParser = require('body-parser');
const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(formData.parse());

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );

app.get('/', (request: Request, response: Response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/books', getBooks);
app.post('/book', createBook);
app.get('/book/:id', getBook);
app.put('/book/:id', updateBook);
app.delete('/book/:id', deleteBook);
app.post('/user', createUser);
app.get('/users', getUsers);
app.post('/author', createAuthor);
app.get('/authors', getAuthors);


async function main() {
  await sequelize.sync({alter: true});
  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
  console.log("Server on port 4000");
}

main();
