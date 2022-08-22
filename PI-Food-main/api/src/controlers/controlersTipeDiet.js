const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

async function nuevaRecipe(req, res) {
  const { name, summary, healthscore, steps, diets } = req.body;

  const findRecipe = await Recipe.findOne({
    where: {
      name: name,
    },
  });
  if (!findRecipe) {
    const addRecipe = await Recipe.create({
      name: name,
      summary: summary,
      healhscore: healthscore,
      steps: steps,
      diets: diets,
    });
  }
  const DietMatch = await Diet.findAll({
    where: { name: diets },
  });
  const addDiet = await findRecipe.addDiet(DietMatch);
  return res.send(addDiet);
}
async function listarDietas(req, res) {
  try {
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
    const typeDb = await Diet.findAll();
    res.send(typeDb);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  nuevaRecipe,
  listarDietas,
};
