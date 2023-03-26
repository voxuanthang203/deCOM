const db = require("../model/index");
const users = db.User;

const auth = async (req, res, next) => {
  
    const apikey = req.header("Authorization");
    console.log("APIKEY:-----------------", apikey);
    const user = await users.findOne({ where: { apiKey: apikey } });
    console.log("User: ", user);
    if (!user) throw new Error("API Key does not exist!");
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = { auth };
