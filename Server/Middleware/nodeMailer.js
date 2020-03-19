
const nodemailer = require("nodemailer");
exports.sendMailer = (url, email) => {
    // console.log(process.env.PASSWORD);
    // //sets the variables from the env file
    // const transporter = nodemailer.createTransport({
    //     service: "Gmail",
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASSWORD
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //       }

    //     });
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
 //setup mail configuration and this object is given as input to transporter.endMail() for the client
//  const mailOptions = {
//     from: process.env.EMAIL, //sender email
//     to: email, //receiver email
//     subject: "reset password",
//     description: "click to reset your password",
//     text: url
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Email sent: " + info.response);
//     }
// });
// };
var mailOptions={
    from: process.env.EMAIL,
    to : "kiranmayi.raj29@gmail.com",
    subject : "It Worked",
    text : "gyuyugyugyugyuguyg"
 }
 console.log(mailOptions);
 smtpTransport.sendMail(mailOptions, function(error, response){
 if(error){
 console.log(error);
 }else{
 console.log("Message sent: " + response.message);
 }
 });
}