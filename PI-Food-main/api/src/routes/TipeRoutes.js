const { Router } = require("express");
const {
  listarDietas,
  GetDietsById,
} = require("../controlers/controlersTipeDiet");

const router = Router();
router.get("/:idDiet", GetDietsById);
router.get("/", listarDietas);

module.exports = router;
