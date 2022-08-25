const { Router } = require("express");
const {
  nuevaRecipe,
  listarDietas,
  GetDietsById,
} = require("../controlers/controlersTipeDiet");

const router = Router();
router.get("/:idDiet", GetDietsById);
router.get("/", listarDietas);
router.post("/", nuevaRecipe);

module.exports = router;
