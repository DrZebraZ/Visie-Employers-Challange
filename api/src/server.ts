import app from "./app";
import env from "./env";
import setRoutes from "./routes";
import setSchemas from "./schemas";


async function server(){
  try{
    await setSchemas(app)
    await setRoutes(app)
    app.listen({
      host:'0.0.0.0',
      port:env.PORT
    }).then(()=>{
        console.log("Server listening on port ", env.PORT);
      }
    )    
  }catch(err){
    console.log(err)
  }
}

server()




