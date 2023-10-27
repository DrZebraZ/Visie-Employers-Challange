import { FastifyReply } from "fastify";
import { ResultValidation } from "../../utils/result-validation";

export function applyResult(result: ResultValidation, res: FastifyReply, successStatusCode:number) {
	if (result.hasError()) {
    console.log("Tem ERRO")
		if (result.hasCriticalError()) {
      console.log("É CRITICO!")
      for(let error in result.getErrorList()){
        console.log("============ ERROR ============")
        console.log(`${error}`)
      }
			res.code(500);
      res.send("INTERNAL SERVER ERROR")
		} else {
      console.log("NÃO É CRITICO!")
			res.code(400);
		}
		res.send(JSON.stringify(result.getErrorList()));
	}else{
    if (result.isResultEmpty()) {
      res.code(204);
      res.send();
    } else {
      res.code(successStatusCode);
      res.send(JSON.stringify(result.getResult()));
    } 
  }
}