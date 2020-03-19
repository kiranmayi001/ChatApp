const userService = require("../Services/userService");
//input is given/posted here
exports.registerUser = (req, res) => {
    console.log('controller');
    console.log(req.body);
    // checking the Name want to have min 3 character
    req.checkBody("fullName", "Name is invalid").notEmpty().isAlpha().len({ min: 3 });
    //checking password is not empty
    req.checkBody("password", "Password is invalid").notEmpty();
    //Checking the email is valid or not
    req
        .checkBody("email", "Email is invalid")
        .notEmpty()
       
        .isEmail();
        
    //Checking the validation for the country
    req
        .checkBody("country", "Country is invalid")
        .notEmpty()
        .isAlpha();
    //checking for the Input Validation
    const errors = req.validationErrors();
    //if Validation gets error send response to the user
    if (errors) {
        res.status(202).send(errors);
        console.log("error in registration invalid input", errors);
    } else {
        console.log(req.body);
        userService.userreg(req, (err, data) => {
            if (err) {
                res.status(202).send(err);
            } else {
                res.status(200).send({ message: "Registered Successfully", data: data });
            }
        });
    }
};



//-------------------- VALIDATION LOGIN USER---------------------------------------//
exports.userLogin=(req,res)=>{
    console.log(req.body);
     //checking password is not empty
    req.checkBody("password", "Password is invalid").notEmpty();

    //Checking the email is valid or not
    req.checkBody("email", "Email is invalid").isEmail();

    const errors = req.validationErrors();
    userService.userlog(req,(err,data)=>{ //if only exports to userreg then we use userService.userreg()
        if(errors)
        {
            res.status(203).send(errors);
            console.log("error in Logging in, Invalid", errors);
        }
        else{

 res.status(200).send({ message: "Logged Successfully", data:data });
        }

    });
};


//-----------------------Validation ForGot Password-----------------------------//
//forgot Password
exports.forgotpassword = (req, res) => {
    //checking email is valid or not
    req.checkBody("email", "Email is invalid").isEmail();

    //checking for error while validating input
    const errors = req.validationErrors();
    //if Validation gets error send response to the user
    if (errors) {
        res.status(203).send(errors);
    } else {
        userService.forgotPassword(req, (err, data) => {
            if (err) {
                res.status(402).send(err);
            } else {
                res.send({ message: "Email successfully send to reset password", data: data });
            }
        });
    }
};
//---------------------------------RESRT PASSWORD VALIDATION--------------------------------//
exports.resetpassword=(req,res)=>
{
    // console.log(req.body);
    req.checkBody("password", "Password is invalid").notEmpty();
    req.checkBody("Confirmpassword", "Password is invalid").notEmpty();
    const errors = req.validationErrors();
    //if Validation gets error send response to the user
    if (errors) {
        res.status(204).send(errors);
    } else {
    userService.resetPassword(req, (err,data)=>{
        if (err) {
            res.status(402).send(err);
        } else {
            res.send({ message: "Changed password Successfully", data: data });
        }

    });
}
};