const router = require("express").Router();
const Joi = require("joi");
const { User, validate_login } = require("../models/user_model");
const bcrybt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate_login(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ message: "Invalid emial or password" });
    }
    const validPassword = await bcrybt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    return res
      .status(200)
      .send({ data: token, message: "login successfully", status: 200 });
  } catch (error) {
    console.error(error); 
    return res.status(500).send({ message: "internal server" });
  }
});

module.exports = router;
