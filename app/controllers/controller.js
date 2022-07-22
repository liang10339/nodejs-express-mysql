const Velocity = require("../models/model.js");
exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const velocity = new Velocity({
      year: req.body.year,
      mph: req.body.mph,
      xslg: req.body.xslg,
      wOBA: req.body.wOBA,
      xwOBA: req.body.xwOBA,
      K: req.body.K,
      BB: req.body.BB
    });
    // Save Velocity in the database
    Velocity.create(velocity, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Velocity."
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
    const year = req.query.year;
    Velocity.getAll(year, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving velocitys."
        });
    else res.send(data);
    });
};