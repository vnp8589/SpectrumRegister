const bcrypt = require("bcryptjs");
const {
  Format: { generateErrorObject, notFound, conflict },
} = require("../../../commons");
const user = require('../../../models/user');

module.exports = async (req, res, next) => {
  try {
    let location = "body";
    let param = "userName";
    const { checkUserExistance,
      body: { email, password, userName },
    } = req;

    if (checkUserExistance) {
      const error = generateErrorObject(param, "User already exists", location);
      conflict(req, res, error);
      return;
    }
    const userDetails = {
      email,
      password,
      userName,
    };
    const newUser = new user(userDetails);
    if (password) {
      newUser.password = bcrypt.hashSync(password, 10);
    }

    await newUser.save();

    res.body = {
      message: "User created successfully",
    };
    next();
  } catch (error) {
    next(error);
  }
};
