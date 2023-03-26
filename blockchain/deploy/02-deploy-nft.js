const { verify } = require("../utils/verify");

module.exports = async ({ deployments, getNamedAccounts, network }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const ecommerce = await deployments.get("Ecommerce");
    const args = [ecommerce.address];
    log("Start deploying nft...");
    const nft = await deploy("NFT", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log("Deployed nft at:", nft.address);
    log("--------------------------------------------");

    if (network.name === "goerli" && process.env.ETHERSCAN_API_KEY) {
        log("Start verifying nft...");
        await verify(nft.address, args);
        log("Nft contract verified!");
    }
};

module.exports.tags = ["all", "ecommerce"];
