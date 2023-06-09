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
    validate:{
      validator: (valor)=>{
        return valor >=10 && valor<=5000;
      },
      message: "The number of pages must be between 10 and 5000. Current value: {VALUE}."
    }
  }

});

const livros = mongoose.model("livros", livroSchema);

export default livros;