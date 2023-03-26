const auth = async (req, res, next) => {
  // Get the access key from req
  // call api to verify
  // If verified ==> get public key and add to req.body ==> next
  //
  next();
};

module.exports = { auth };
