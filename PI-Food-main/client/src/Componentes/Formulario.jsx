import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createRecipe, getName } from "../redux/actions/acciones";

const Formulario = () => {
  const recipes = useSelector((state) => state.Recipes);
  const [inputName, setInputName] = useState("");
  const dispatch = useDispatch();

  const [formulario, setFormulario] = useState({
    name: "",
    summary: "",
    healthscore: "",
    steps: "",
    diets: [],
  });
  const stateReset = () => {
    setFormulario({
      name: "",
      summary: "",
      healthscore: "",
      steps: "",
      diets: [],
    });

    setInputName("");
  };
  const submitInput = (e) => {
    e.preventDefault();
    setInputName(e.target.value);
  };

  const setDataHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "diets")
      value =
        inputName !== ""
          ? [...e.target.options]
              .filter((option) => option.selected)
              .map((x) => x.value)
              .concat(formulario.steps)
          : [...e.target.options]
              .filter((option) => option.selected)
              .map((x) => x.value);
    setFormulario({
      ...formulario,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    dispatch(getName(inputName));
  }, [inputName]);

  const submitForm = (e) => {
    e.preventDefault();
    var form = true;
    if (formulario.name.length < 2 || !formulario.diets.length >= 1) {
      form = false;
    }
    if (form) {
      dispatch(createRecipe(formulario))
        .then(() => stateReset())
        .then(() => alert("Adhered Recipe"));
    } else {
      return alert(
        "Plece complete all the fields before creating the new recipe"
      );
    }
  };
  return (
    <div>
      <p>Describe your recipe</p>
      <form onSubmit={(e) => submitForm(e)} onReset={() => stateReset()}>
        <input
          name="name"
          placeholder="Name your Recipe"
          value={formulario.name}
          onChange={setDataHandler}
        />
        <p>Summary</p>
        <input
          name="summary"
          placeholder="summary"
          value={formulario.summary}
          onChange={setDataHandler}
        />
        <p>STEPS</p>
        <input
          name="steps"
          placeholder="STEPS"
          value={formulario.steps}
          onChange={setDataHandler}
        />
        <p>HEALTHSCORE</p>
        <input
          type="number"
          name="healthscore"
          max="100"
          min="1"
          value={formulario.healthscore}
          onChange={setDataHandler}
        />
        <button type="submit">Add Recepi</button>
        <button type="reset">Delete Recepi</button>
      </form>
    </div>
  );
};
export default Formulario;
