import livros from "../models/Livro.js";

class LivroController{

  static listarLivros = async (req, res)=>{
    try{
      livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livros);
    }catch(erro){
      res.status(500).json({ message: "Server internal error" });
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
      res.status(400).send({message: `${erro.message} -  book Id not found.`});
    }        
  };

  static cadastrarLivro = async (req, res)=>{
    try{
      let livro = new livros(req.body);
      const livroSalvo = await livro.save();
      res.status(201).send(livroSalvo.toJSON());
    }catch(erro){
      res.status(500).send({message: `${erro.message} -  failed to create new book.`});
    }
  };

  static atualizarLivro = async (req, res)=>{
    try{
      const id = req.params.id;
      await livros.findByIdAndUpdate(id,{$set: req.body});
      res.status(200).send({message: "Book successfully updated!"});
    }catch(erro){
      res.status(500).send({message: `${erro.message} -  failed to uptade book.`});
    }
  };

  static excluirLivro = async (req, res)=>{
    try{
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Book successfully deleted!"});
    }catch(erro){
      res.status(500).send({message: `${erro.message} -  failed to delete book.`});
    }
  };

  static listarLivrosPorEditora = async (req,res)=>{
    try{
      const editora = req.query.editora;
      const livrosEditora = await livros.find({"editora": editora});
      res.status(200).send(livrosEditora);
    }catch(erro){
      res.status(500).send({message: `${erro.message} -  book publisher not found.`});
    }
  };

}

export default LivroController;