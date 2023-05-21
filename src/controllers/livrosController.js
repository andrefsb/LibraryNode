import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController{

  static listarLivros = async (req, res, next)=>{
    try{
      const livrosResultado =  await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);

    }catch(erro){
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next)=>{
   
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Book Id not found."));
      }
    } catch (erro) {
      next();
    }     
  };

  static cadastrarLivro = async (req, res, next)=>{
    try{
      let livro = new livros(req.body);

      const livroSalvo = await livro.save();

      res.status(201).send(livroSalvo.toJSON());

    }catch(erro){
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next)=>{
    try{
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id,{$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Book successfully updated."});
      } else {
        next(new NaoEncontrado("Book Id not found."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next)=>{
    try{
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Book successfully deleted."});
      } else {
        next(new NaoEncontrado("Book Id not found."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static listarLivrosPorEditora = async (req, res, next)=>{
    try{
      const editora = req.query.editora;

      const livrosEditora = await livros.find({"editora": editora});

      res.status(200).send(livrosEditora);

    }catch(erro){
      next(erro);
    }
  };

}

export default LivroController;