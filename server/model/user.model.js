const Sequelize = require("sequelize-cockroachdb");
const { genApiKey } = require("../utils/genAPIKey");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apiKey: {
        type: Sequelize.STRING,
        defaultValue: genApiKey(),
      },
    },
    {
      timestamps: true,
    }
  );
  return User;
};
