const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { YOUR_API_KEY } = process.env;
const sequelize = require("sequelize");

async function getAllRecipe(req, res, next) {
  try {
    let recipe;
    const count = await Recipe.count();
    if (count === 0) {
      recipe = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
      );
      Recipe.bulkCreate(
        recipe.data.results.slice(0, 100).map((e) => {
          return {
            id: e.id,
            name: e.title,
            dishTypes: e.dishTypes.join(","),
            summary: e.summary,
            healthscore: e.healthScore,
            image: e.image,
            diets: e.diets?.map((element) => element),
            steps:
              e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
                ? e.analyzedInstructions[0].steps
                    .map((item) => item.step)
                    .join("/")
                : "",
          };
        })
      );
    }
    if (req.query.recipe) {
      let recipe = await Recipe.findAll({
        where: {
          name: { [sequelize.Op.iLike]: "%" + req.query.recipe + "%" },
        },
      });
      if (recipe.length === 0) {
        return res.status(404).json({
          error: `No se encontraron los con el nombre ${req.query.recipe}`,
        });
      }
      res.json(recipe);
    } else {
      recipe = await Recipe.findAll();
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
}
async function GetRecipeById(req, res, next) {
  try {
    let recipe = await Recipe.findOne({
      where: { id: req.params.idRecipe },
      include: Diet,
    });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllRecipe,
  GetRecipeById,
};
