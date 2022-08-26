const { Router } = require("express");
const RecipeRoutes = require("./RecipeRoutes");
const TipeRouter = require("./TipeRoutes");
const { nuevaRecipe } = require("../controlers/controlersTipeDiet");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/recipe", RecipeRoutes);
router.use("/diet", TipeRouter);
router.post("/makeRecipe", nuevaRecipe);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
