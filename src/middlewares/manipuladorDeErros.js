import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro,req,res, next){
  if(erro instanceof mongoose.Error.CastError){
    res.status(400).send({message: "Incorrect data sent."});
  }
  else{
    res.status(500).json({message:"Internal server error."}); 
  }
}

export default manipuladorDeErros;