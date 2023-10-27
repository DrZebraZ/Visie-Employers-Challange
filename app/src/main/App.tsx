import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import 'bootswatch/dist/superhero/bootstrap.css'


class App extends React.Component{
  render(){
    return(
      <>
        <div>
          <BrowserRouter>
            <Router/>
          </BrowserRouter>
        </div>
      </>
    )
  }
}
export default App