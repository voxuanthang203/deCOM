const Sequelize = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      nftAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};
