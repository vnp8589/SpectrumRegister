const user = require('../../../models/user');

module.exports = async (req, res, next) => {
    const { body: { email } } = req;

    if (await user.findOne({email})){
        req.checkUserExistance = true;
    } else { 
        req.checkUserExistance = false;
    }
    next();
};