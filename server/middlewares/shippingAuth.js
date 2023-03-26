const jwt = require("jsonwebtoken");
const db = require("../model/index");
const users = db.users;

const auth = async (req, res, next) => {
  
    const apikey = req.header("Authorization");
    const user = await users.findOne({ where: { apiKey: apikey } });
    if (!user) throw new Error("API Key does not exist!");
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = { auth };
