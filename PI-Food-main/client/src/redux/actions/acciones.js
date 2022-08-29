import axios from "axios";
import {
  GET_RECIPES,
  GET_DETAIL,
  GET_DIETS,
  ORD_ALF,
  ORD_ALF_REV,
  ORD_SCORE,
  ORD_SCORE_REV,
} from "./accionesName";

export function getAllRecipes() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/recipe/");
    dispatch({ type: GET_RECIPES, payload: res.data });
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/recipe/${id}`);
    dispatch({ type: GET_DETAIL, payload: res.data });
  };
}
export function getName(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/recipe?recipe=${name}`
      );
      dispatch({ type: GET_RECIPES, payload: res.data });
    } catch (err) {
      throw err;
    }
  };
}
export function getDiets(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/diet/?name=${name}`);
      dispatch({ type: GET_DIETS, payload: res.data });
    } catch (err) {
      throw err;
    }
  };
}
export function ordAlf() {
  return {
    type: ORD_ALF,
  };
}
export function ordenAlfRev() {
  return {
    type: ORD_ALF_REV,
  };
}
export function ordScore() {
  return {
    type: ORD_SCORE,
  };
}
export function ordScoreRev() {
  return {
    type: ORD_SCORE_REV,
  };
}

export function createRecipe(recipe) {
  return async function () {
    try {
      const newRecipe = await axios.post(
        "http://localhost:3001/makeRecipe",
        recipe
      );
    } catch (err) {
      throw err;
    }
  };
}
