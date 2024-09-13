// authMiddelware
const {JWT_SECRET} = require('./config');
const jwt = require("jsonwebtoken");


const authMiddelware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    // to seprate info in headers.aut...
    // i.e auth type => like Bearer
    //          token => to be verified    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else{
            return res.status(403).json({});
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({});
    }
};

module.exports ={
    authMiddelware
}