import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase{
  constructor(mensagem = "Page not found."){
    super(mensagem, 404);
  }
}

export default NaoEncontrado;