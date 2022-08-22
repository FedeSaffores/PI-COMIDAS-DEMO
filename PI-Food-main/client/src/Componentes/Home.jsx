import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllRecipes,
  getDetail,
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
        ORD ALP A-Z
      </button>
      <button className="ord2" onClick={() => dispatch(ordenAlfRev())}>
        ORD ALP Z-A
      </button>
      <button className="ord3" onClick={() => dispatch(ordScore())}>
        HIGHEST RANKED
      </button>
      <button className="ord4" onClick={() => dispatch(ordScoreRev())}>
        LOWEST RANKED
      </button>

      {Recipe?.slice(page * 10, (page + 1) * 9).map((e) => {
        return (
          <div key={e.id}>
            <h2>
              <Link to={`/recipes/${e.id}`}>{e.name}</Link>
            </h2>
            <img src={e.image} alt={e.name} />
            <h3>{e.diets}</h3>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
