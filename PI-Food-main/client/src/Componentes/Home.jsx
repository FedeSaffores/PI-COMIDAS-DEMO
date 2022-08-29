import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllRecipes,
  getName,
  ordAlf,
  ordenAlfRev,
  ordScore,
  ordScoreRev,
} from "../redux/actions/acciones";
import "./Home.css";
import "./order/order";
function Home() {
  const dispatch = useDispatch();
  const Recipe = useSelector((state) => state.Recipes);
  const [page, setPage] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [dieta, setDieta] = useState("");

  const inputHandler = (e) => {
    setBusqueda(e.target.value);
  };
  const onClickHandler = () => {
    dispatch(getName(busqueda));
  };
  const homeHandler = () => {
    dispatch(getAllRecipes());
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <div>
      <button
        className="btn"
        onClick={() => setPage(page + 1)}
        disabled={Recipe?.slice((page + 1) * 9).length === 0}
      >
        Siguiente
      </button>
      <button
        className="btn1"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Anterior
      </button>

      <Link className="makeRecipe" to={"/makerecipe"}>
        MAKE YOUR RECIPE
      </Link>

      <input
        type="text"
        placeholder="Search"
        className="SearchInput"
        name="input"
        autoComplete="off"
        onChange={inputHandler}
      />

      <button className="search" onClick={onClickHandler}>
        Search
      </button>
      <button className="reset" onClick={homeHandler}>
        Reset
      </button>
      <button className="ord1" onClick={() => dispatch(ordAlf())}>
        ORDER A-Z
      </button>
      <button className="ord2" onClick={() => dispatch(ordenAlfRev())}>
        ORDER Z-A
      </button>
      <button className="ord3" onClick={() => dispatch(ordScore())}>
        HIGHEST RANKED
      </button>
      <button className="ord4" onClick={() => dispatch(ordScoreRev())}>
        LOWEST RANKED
      </button>

      <select
        onChange={(e) => {
          setDieta(e.target.value);
          setPage(0);
          console.log(e.target.value);
        }}
        defaultValue={""}
        className="ORDIETA"
      >
        <option value={""}>All the Recipes</option>
        <option value={"gluten free"}>Gluten Free</option>
        <option value={"dairy free"}>Dairy Free</option>
        <option value={"lacto ovo vegetarian"}>Lacto ovo Vegetarian</option>
        <option value={"vegan"}>Vegan</option>
        <option value={"paleolithic"}>Paleolithic</option>
        <option value={"primal"}>Primal</option>
        <option value={"whole 30"}>Whole 30</option>
        <option value={"pescatarian"}>Pescatarian</option>
        <option value={"ketogenic"}>Ketogenic</option>
        <option value={"fodmap friendly"}>Fodmap friendly</option>
      </select>

      {Recipe?.filter((e) =>
        dieta !== "" ? e.diets.map((x) => x.name).includes(dieta) : true
      )
        .slice(page * 10, (page + 1) * 9)
        .map((e) => {
          return (
            <div key={e.id}>
              <h2>
                <Link className="Link" to={`/recipes/${e.id}`}>
                  {e.name}
                </Link>
              </h2>
              <img src={e.image} alt={e.name} />
              <h2 className="Types">TYPS OF DIETS</h2>
              {e.diets.map((x) => (
                <h3 className="Dietas" key={x.name}>
                  {x.name}{" "}
                </h3>
              ))}
            </div>
          );
        })}
    </div>
  );
}
export default Home;
