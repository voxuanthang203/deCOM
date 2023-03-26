const Sequelize = require("sequelize-cockroachdb");
require("dotenv").config();
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "deCom_node-sequelize",
  },
});

sequelize.sync({ force: true }).then(() => console.log("Succeeded!"));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Transaction = require("./transaction.model.js")(sequelize);
db.User = require("./user.model.js")(sequelize);

module.exports = db;
