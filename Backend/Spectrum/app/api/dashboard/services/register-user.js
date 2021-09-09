const qrCode = require('./generate-qr');
const {
    Format: { generateErrorObject, notFound, conflict },
  } = require("../../../commons");
const participant = require('../../../models/participant');
const emailUser = require("./send-email");


module.exports = async (req, res, next ) => {

    const { body: { email, firstName, lastName, college, foodType, contact, total }, checkUserExistance } = req;
    try {
        let location = "body";
        let param = "email";
        const qrString = await qrCode.qrString(email);

        console.log("qr string", qrString);
        console.log("checkUserExistance", checkUserExistance);
        if (checkUserExistance) {
            const error = generateErrorObject(param, "User already exists", location);
            conflict(req, res, error);
            return;
        }

        const userDetails = {
            email,
            firstName,
            lastName,
            college,
            foodType,
            qrCode: qrString,
            contact,
            total
        }

        

        const newUser = new participant(userDetails);

        await newUser.save();

       

        res.body = {
            message: "User registered successfully",
          };

        // const qrImage = await qrCode.qrImage(qrString);

          const emailData = {
            name: firstName + " " + lastName,
            email,
            college,
            contact,
            qrCode: qrString,
        }
        await emailUser.sendEmail(emailData)
          console.log("calling....")
        ;
        next();
        
    } catch(err) {
        next(err);
    }
}