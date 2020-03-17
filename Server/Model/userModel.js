const mongoose = require("mongoose");

//schema for registration of new user

    const registerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "provide full name"]
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank"]
    },
    email: {
      type: String,
      required: [true, "Email address cannot be left blank"]
    },
    country: {
      type: String,
      required: [true, "country cannot be left blank"]
    }
  },
  {
    timestamps: true
  }
);



 exports.registerU = mongoose.model('user', registerSchema);
// module.exports=registerUser; even this worked
// module.exports= mongoose.model('user', registerSchema); even this worked 

//register with valid email ID
//check for email existence 
