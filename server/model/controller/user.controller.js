const db = require("../index.js");
const users = db.User;

exports.create = async function (req, res) {
  const { companyName } = req.body;
  
    if (!companyName) throw new Error("Invalid arguments");
    const user = await users.create({ companyName: companyName });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
