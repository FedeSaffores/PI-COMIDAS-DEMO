import { ordAlf, ordScore } from "../../Componentes/order/order";
import {
  GET_RECIPES,
  GET_DETAIL,
  ORD_ALF,
  GET_DIETS,
  ORD_ALF_REV,
  ORD_SCORE,
  ORD_SCORE_REV,
} from "../actions/accionesName";

const inicialState = {
  Recipes: [],
  TipeDiet: [],
};
const rootReducer = (state = inicialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPES: {
      return {
        ...state,
        Recipes: payload,
      };
    }
    case GET_DETAIL: {
      return {
        ...state,
        RecipesDetail: payload,
      };
    }
    case GET_DIETS: {
      return {
        ...state,
        TipeDiet: payload,
      };
    }
    case ORD_ALF: {
      return {
        ...state,
        Recipes: state.Recipes.slice().sort(ordAlf),
      };
    }
    case ORD_ALF_REV: {
      return {
        ...state,
        Recipes: state.Recipes.slice().sort(ordAlf).reverse(),
      };
    }
    case ORD_SCORE: {
      return {
        ...state,
        Recipes: state.Recipes.slice().sort(ordScore),
      };
    }
    case ORD_SCORE_REV: {
      return {
        ...state,
        Recipes: state.Recipes.slice().sort(ordScore).reverse(),
      };
    }

    default:
      return state;
  }
};
export default rootReducer;
