const QRCode = require('qrcode'); 
const { db } = require('../../../models/user');

const qrString = async (data) => {
    try {
        const mystring = await QRCode.toDataURL(data);
        return mystring;
    } catch (error) {
        return error; 
    }
}

module.exports = {
    qrString,
}
