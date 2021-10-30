const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passportUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

passportUserSchema.pre("save", async function (next) {
  hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

passportUserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const passportUser = mongoose.model("user", passportUserSchema);

module.exports = passportUser;
