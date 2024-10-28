const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate_login = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

const validate_register = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().label("first_name"),
    last_name: Joi.string().required().label("last_name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate_register, validate_login };
