import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Recipe.css";

function Recipe() {
  const { receta } = useParams();
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    if (receta)
      fetch("http://localhost:3001/recipe/" + receta)
        .then((res) => res.json())
        .then((res) => setRecipe(res));
  }, [receta, setRecipe]);
  if (!recipe) return null;

  return (
    <div>
      <Link to="/recipes" className="Home">
        HOME
      </Link>
      <h2>RECETA</h2>
      <h3>{recipe.name}</h3>
      <img src={recipe.image} alt={recipe.image} />
      <h2>DISHTYPES</h2>
      <h3 className="DISHTYPES">{recipe.dishTypes}</h3>
      <h2>SUMMARY</h2>
      <div
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
        className="caja"
      />

      <h2>HEALTHSCORE</h2>
      <h3 className="SCORE"> {recipe.healthscore}</h3>

      <h2>STEPS</h2>
      <div className="caja1">{recipe.steps}</div>
      <h2>TIPE OF DIET</h2>
      {recipe.diets.map((e) => (
        <h3 key={e.name}>{e.name}</h3>
      ))}
    </div>
  );
}
export default Recipe;
