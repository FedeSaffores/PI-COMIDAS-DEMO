const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const sequelize = require("sequelize");

async function nuevaRecipe(req, res) {
  const { name, summary, healthscore, steps, diets } = req.body;

  const findRecipe = await Recipe.findOne({
    where: {
      name: name,
    },
  });
  if (!findRecipe) {
    const dieta = await Diet.findAll({ where: { id: diets } });
    const addRecipe = await Recipe.create({
      name: name,
      summary: summary,
      healhscore: healthscore,
      steps: steps,
    });
    addRecipe.addDiets(dieta);
    return res.send(addRecipe);
  }
}
async function listarDietas(req, res, next) {
  try {
    const count = await Diet.count();
    if (count === 0) {
      const typesApi = (
        await axios(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
        )
      ).data.results;
      const dataApi = typesApi
        .map((e) => e.diets)
        .join()
        .split(",")
        .filter((e) => e.length);
      dataApi.forEach((e) => {
        Diet.findOrCreate({
          where: { name: e },
        });
      });
    }
    if (req.query.name) {
      const typeDiet = await Diet.findAll({
        where: {
          name: { [sequelize.Op.iLike]: "%" + req.query.name + "%" },
        },
      });
      return res.send(typeDiet);
    }
    const typeDb = await Diet.findAll();
    res.send(typeDb);
  } catch (err) {
    next(err);
  }
}

async function GetDietsById(req, res, next) {
  try {
    let diets = await Diet.findOne({
      where: { id: req.params.idDiet },
    });
    res.json(diets);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  nuevaRecipe,
  listarDietas,
  GetDietsById,
};
