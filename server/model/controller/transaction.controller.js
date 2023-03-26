const db = require("../index.js");
const transactions = db.Transaction;

// Create and save a new transaction in the database
const create = async (req, res) => {
  const { nftAddress, tokenId, phoneNumber, address } = req.body;
  if (!nftAddress || !tokenId || !phoneNumber || !address)
    res.status(400).json({ error: "Invalid arguments" });
  
    const transaction = await transactions.create({
      nftAddress,
      tokenId,
      phoneNumber,
      address,
    });
    res.status(200).json(transaction);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
};

// Get all transactions
const get = async (req, res) => {
<<<<<<< HEAD
  
    const transactions = await transactions.findAll();
    res.status(200).json(users);
=======
  try {
    const alltransactions = await transactions.findAll();
    res.status(200).json(alltransactions);
>>>>>>> refs/remotes/origin/master
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  
    await transactions.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ deleted_id: id });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
};

module.exports = { create, get, remove };
