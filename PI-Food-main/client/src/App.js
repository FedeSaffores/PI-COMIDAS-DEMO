import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Componentes/Home";
import Intro from "./Componentes/Intro";
import Recipe from "./Componentes/Recipe";
import Formulario from "./Componentes/Formulario";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Food</h1>
        <Switch>
          <Route path="/makerecipe">
            <Formulario />
          </Route>
          <Route path="/recipes/:receta">
            <Recipe />
          </Route>
          <Route path="/recipes">
            <Home />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
