import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase{
  constructor(mensagem = "One or more inserted values are incorrect."){
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;