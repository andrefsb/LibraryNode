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

  static listarLivroPorId = async (req, res)=>{
   
    try{
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livroResultados);

    }catch(erro){
      res.status(404).send({message: `${erro.message} -  book Id not found.`});
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

      await livros.findByIdAndUpdate(id,{$set: req.body});

      res.status(200).send({message: "Book successfully updated!"});

    }catch(erro){
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next)=>{
    try{
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Book successfully deleted!"});

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