import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id:{type: String},

  titulo:{type: String, 
    required: [true, "The book title is required"]},

  autor:{
    type: mongoose.Schema.Types.ObjectId,ref: "autores", 
    required: [true, "The book author is required"]},

  editora:{
    type: String, 
    required: [true, "The book publisher is required"],
    enum:{
      values:["Editora 1", "Editora 2", "Editora 3", "Editora 4", "Editora 5"],
      message:"Publisher {VALUE} not allowed."
    }
  },
  
  numeroPaginas:{
    type: Number,
    min:[10, "The number of pages must be greater than 9. Current value: {VALUE}."],
    max:[5000, "The number of pages must be less than 5001. Current value: {VALUE}."]
  }

});

const livros = mongoose.model("livros", livroSchema);

export default livros;