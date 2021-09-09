const config = require("../../../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const user = require("../../../models/user");
const {
  Format: { generateErrorObject, notFound },
} = require("../../../commons");
const { conflict } = require("../../../commons/response-format");

module.exports = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    let location;
    let param;

    const retrievedUser = await user.findOne({ email });

    if (retrievedUser && bcrypt.compareSync(password, retrievedUser.password)) {
      const token = jwt.sign({ sub: user.id }, config.secret, {
        expiresIn: "1h",
      });

      res.body = {
        ...retrievedUser.toJSON(),
        token,
      };
      next();
    } else if (
      retrievedUser &&
      !bcrypt.compareSync(password, retrievedUser.password)
    ) {
      param = "password";
      location = "body";
      const error = generateErrorObject(
        param,
        "Password does not match. Please enter correct password",
        location
      );
      conflict(req, res, error);
      return;
    } else {
      param = "email";
      location = "body";
      const error = generateErrorObject(
        param,
        "User does not exist. Please register with the system first",
        location
      );
      notFound(req, res, error);
      return;
    }
  } catch (error) {
    next(error);
  }
};
