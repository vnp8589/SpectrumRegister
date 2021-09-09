const nodemailer = require("nodemailer");
const ejs = require("ejs");


const sendEmail = async (emailData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vatsalpateltoronto@gmail.com',
                pass: 'Vatsal@8589'
            }
        });
        
        ejs.renderFile(__dirname + "/templates/email.ejs", emailData, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("qr code ", emailData.qrCode)
            var mainOptions = {
                from: '"Tester" vatsalpateltoronto@gmail.com',
                to: emailData.email,
                subject: 'Hello, world',
                html: data,
                attachments: [
                    {   
                        path: emailData.qrCode, 
                        cid: 'qrcodeimage' 
                    },
                ]
            };
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
        
        });
    } catch (error) {
        console.log("err", error);
        return error;
    }

}

module.exports = {
    sendEmail
}
