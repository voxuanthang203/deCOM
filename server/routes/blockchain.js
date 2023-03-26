const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/blockchainAuth");
const {
  mintNft,
  buyNft,
  confirmReceiveItem,
  reportNotReceiveItem,
  listItem,
  unlistItem,
  signupNewUser,
  signupNewManufacturer,
} = require("../model/controller/blockchain.controller.js");

router.post("/mintNft", auth, mintNft);

router.post("/buyNft", auth, buyNft);

router.post("/confirmReceiveItem", auth, confirmReceiveItem);

router.post("/reportNotReceiveItem", auth, reportNotReceiveItem);

router.post("/listItem", auth, listItem);

router.post("/unlistItem", auth, unlistItem);

router.post("/signupNewUser", auth, signupNewUser);

router.post("/signupNewManufacturer", auth, signupNewManufacturer);

module.exports = router;
