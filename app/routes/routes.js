module.exports = app => {
    const velocity = require("../controllers/controller.js");
    var router = require("express").Router();

    router.post("/", velocity.create);
    router.get("/", velocity.findAll);

    app.use('/api/velocity', router);
  };