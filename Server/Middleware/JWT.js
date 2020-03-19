const jwt = require("jsonwebtoken");
exports.generateToken = data_id => {
    {
        console.log(process.env.KEY);
        const token = jwt.sign({ data_id }, process.env.KEY, { expiresIn: "1h" }); // expires in 1 hour
        console.log(token);
        const obj = {
            success: true,
            message: "Token Generated Successfully!!",
            token: token
        };
        return obj;
    }
};
//after auth only reset is being done
exports.auth = (req, res, next) => {
    console.log(req);
    
    const token = req.headers['token'];
    console.log(token);
   // token=token.split(" ");
    //token=token[1];
  
    jwt.verify(token, process.env.KEY, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            
                req.decoded=result;
                next();
            }
            //req.decoded = result;
            // next();
        
    });
};