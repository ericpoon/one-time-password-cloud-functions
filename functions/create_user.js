module.exports = function(req, res) {
  // req.body contains all the data passed to the function when the user calls it
  res.send(req.body);
}
