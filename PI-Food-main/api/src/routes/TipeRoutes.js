const { Router } = require("express");
const {
  nuevaRecipe,
  listarDietas,
} = require("../controlers/controlersTipeDiet");

const router = Router();
router.get("/", listarDietas);
router.post("/", nuevaRecipe);

module.exports = router;
