const index = (req, res) => {
  res.header("Content-Type", "application/json");
  res.send({ message: "Service is up and running." });
};

module.exports = { index };
