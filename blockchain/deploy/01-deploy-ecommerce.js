const { verify } = require("../utils/verify");

module.exports = async ({ deployments, getNamedAccounts, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Start deploying ecommerce...");
  const ecommerce = await deploy("Ecommerce", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("Deployed ecommerce at:", ecommerce.address);
  log("--------------------------------------------");

  if (network.name === "mumbai" && process.env.POLYGONSCAN_API_KEY) {
    log("Start verifying ecommerce...");
    await verify(ecommerce.address, []);
    log("Ecommerce verified!");
  }
};

module.exports.tags = ["all", "ecommerce"];
