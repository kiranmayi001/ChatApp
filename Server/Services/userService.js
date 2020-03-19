const model = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const emailExistence = require("email-existence");
const jwt = require("../Middleware/JWT.js");
const mailer = require("../Middleware/nodeMailer.js");
exports.userreg = (req, callback) => { //the input ,err and data to be sent
    try {
        // console.log("In model", req.body.email);
        emailExistence.check(req.body.email, (err, response) => {
            if (response) {
                //finding the user is already existing or not
                model.registerU.findOne({ "email": req.body.email }, (err, user) => { //this will help in matching with the existing user , so that we could use different emailId if found one
                    console.log("user", user);
                    //if a user was found, that means the user's email matches the entered email
                    if (user) {
                        callback("Existing User");
                        // "A user with that email has already registered. Please use a different email.."
                    } else {
                        //code if no user with entered email was found
                        console.log("password", req.body.password);
                        bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                            console.log(encrypted);
                            if (err) {
                                console.log("err find it out");
                            } else {
                                var new_register = new model.registerU({ //
                                    fullName: req.body.fullName,
                                    password: encrypted,
                                    email: req.body.email,
                                    country: req.body.country
                                });
                                // Save User in the database
                                new_register.save()
                                    .then(data => {
                                        // res.send(data);
                                        callback(null, data);
                                    })
                                    .catch(err => {
                                        callback(err);
                                    });
                            }
                        });
                    }
                });
            } else {
                console.log(err);
                callback("Email Id is not valid check with email is exist or not");
            }
        });
    } catch (err) {
        callback("Email is not Exist");
        console.log(err);
    }
}

//------------------------------USER LOGIN-------------------------------//

exports.userlog = (req, callback) => {
    try {

        model.registerU.findOne({ "email": req.body.email }, (err, user) => { //this will help in matching with the existing user , so that we could use different emailId if found one
            console.log("user", user);
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
                    console.log(encrypted);
                    if (!encrypted) {
                        callback("Password  not matched ");
                    }
                    else {
                        callback(null, user);

                    }

                });

            }


        })
    }

    catch (err) {
        callback("Email not registered yet or Error while Logging in");
        console.log(err);
    }
};

//----------------------------Forgot Password-------------------------------//
exports.forgotPassword = (req, callback) => {
    //finding the email is persent or not
    model.registerU.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            let data_id = user._id;
            console.log(user._id);
            let obj = jwt.generateToken(data_id);//exported token
            let url = `http://localhost:3000/resetpassword`;
            let response = {};
            //calling sendMailer()
            mailer.sendMailer(url, req.body.email);
            response.token = obj.token;
            response.success = true;
            response.user = user;
            //calling callback()
            callback(null, response)
        } else {
            callback(" invalid user email ");
        }
    });
};

//-------------------------ResetPassword----------------------------------//
exports.resetPassword = (req, callback) => {
    console.log(req);
    model.registerU.findOne({ "email": req.body.email }, (err, user) => {
        if (err) {
            callback("Invalid Email request");
        }
        else if(user) {
            bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                if (err) {
                    callback(" match password with confirm password");
                }
                else if (encrypted) {
                    model.registerU.updateOne({ password: encrypted }, (err, data) => {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, data);
                        }
                    });

                }


            });
        }
    });
};