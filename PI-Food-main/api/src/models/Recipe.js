const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dishTypes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      healthscore: {
        type: DataTypes.FLOAT,
      },
      steps: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      summary: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
