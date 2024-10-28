const router = require("express").Router();
const { validate_register, User } = require("../models/user_model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate_register(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "the user is existed" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: "user created successfully", status: 200 });

    return res.status();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Oops something is wrong" });
  }
});

module.exports = router;
