const participant = require('../../../models/participant');

module.exports = async (req, res, next) => {
    const { body: { email } } = req;

    console.log(await participant.findOne({email}))

    if (await participant.findOne({email})){
        req.checkUserExistance = true;
    } else { 
        req.checkUserExistance = false;
    }
    next();
};