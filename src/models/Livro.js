import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id:{type: String},
  titulo:{type: String, required: [true, "The book title is required"]},
  autor:{type: mongoose.Schema.Types.ObjectId,ref: "autores", required: [true, "The book author is required"]},
  editora:{type: String, required: [true, "The book publisher is required"]},
  numeroPaginas:{type: Number}

});

const livros = mongoose.model("livros", livroSchema);

export default livros;