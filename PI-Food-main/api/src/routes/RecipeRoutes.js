const { Router } = require("express");
const {
  getAllRecipe,
  GetRecipeById,
} = require("../controlers/controlersRecipe");

const router = Router();
router.use("/:idRecipe", GetRecipeById);
router.use("/", getAllRecipe);

module.exports = router;
