const user = require('../../../models/user');

module.exports = async (id) => {
    return await user.findById(id);
}