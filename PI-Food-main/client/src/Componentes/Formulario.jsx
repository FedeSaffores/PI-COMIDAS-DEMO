import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createRecipe, getDiets } from "../redux/actions/acciones";
import { Link } from "react-router-dom";
import "./Formulario.css";

const Formulario = () => {
  const allDiets = useSelector((state) => state.TipeDiet);
  const [inputName, setInputName] = useState("");
  const dispatch = useDispatch();

  const [formulario, setFormulario] = useState({
    name: "",
    summary: "",
    healthscore: "1",
    steps: "",
    diets: [],
  });
  const stateReset = () => {
    setFormulario({
      name: "",
      summary: "",
      healthscore: "1",
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
              .concat(formulario.diets)
          : [...e.target.options]
              .filter((option) => option.selected)
              .map((x) => x.value);
    setFormulario({
      ...formulario,
      [e.target.name]: value,
    });
  };
  console.log(inputName);
  useEffect(() => {
    dispatch(getDiets(inputName));
  }, [inputName]);

  const submitForm = (e) => {
    e.preventDefault();
    var form = true;
    if (
      formulario.name.length < 2 ||
      !formulario.diets.length >= 1 ||
      formulario.healthscore < 1 ||
      formulario.healthscore > 100
    ) {
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
      <Link to="/recipes" className="Home">
        HOME
      </Link>
      <p>DESCRIBES YOUR RECIPE</p>
      <form onSubmit={(e) => submitForm(e)} onReset={() => stateReset()}>
        <input
          className="DESCRIBES"
          name="name"
          autoComplete="off"
          placeholder="Name your Recipe"
          value={formulario.name}
          onChange={setDataHandler}
        />
        <p>SUMMARY</p>
        <input
          className="SUMMARY"
          name="summary"
          autoComplete="off"
          placeholder="summary"
          value={formulario.summary}
          onChange={setDataHandler}
        />
        <p>STEPS</p>
        <input
          className="STEPS"
          name="steps"
          autoComplete="off"
          placeholder="STEPS"
          value={formulario.steps}
          onChange={setDataHandler}
        />
        <p>HEALTHSCORE</p>
        <input
          className="HEALTHSCORE"
          type="number"
          autoComplete="off"
          name="healthscore"
          value={formulario.healthscore}
          onChange={setDataHandler}
        />
        <p>SELECT TYPE OF DIET</p>
        <input
          className="TDIET"
          type="text"
          name="select"
          autoComplete="off"
          placeholder="find your Diets..."
          onChange={submitInput}
        />
        <select
          multiple
          name="diets"
          onChange={setDataHandler}
          value={formulario.diets}
          options={allDiets.map((e) => ({ value: e.id, label: e.name }))}
        >
          {allDiets.map((e) => (
            <option value={e.id} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <button type="submit" className="button">
          Add Recepi
        </button>
        <button type="reset" className="button1">
          Delete Recepi
        </button>
      </form>
    </div>
  );
};
export default Formulario;
