const db = require("../index.js");
const users = db.User;

const create = async (req, res) => {
  const { companyName } = req.body;
  try {
    if (!companyName) throw new Error("Invalid arguments");
    const user = await users.create({ companyName: companyName });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create };
