import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js"
import routes from "./routes/index.js"

db.on("error",console.log.bind(console,'Connection error'));
db.once("open",()=>{
  console.log("DB connection was successful.")
})

const app = express();

app.use(express.json());

routes(app);

  app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.json(livros[index]);
  });

  app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
  })

  app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index,1);
    res.send(`Book ${id} removed successfully!`);
  })

  function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id);
  }

  export default app