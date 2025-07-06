const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const userMiddleware = (req,res,next)=> {

    const headToken = req.headers.authorization;

    //If authorization field is null or not bearer type

    if(!headToken || !headToken.startsWith('Bearer '))
    {
        return res.status(403).json({
            error:"Authentication Failed"
        });
    }
    const token = headToken.split(" ")[1];

    try{const decoded = jwt.verify(token,JWT_SECRET);
    req.userId = decoded.userId;
    next();
}
catch(err){
        return res.status(403).json({
            error:"Authentication Failed"
        });
    }
};

module.exports = userMiddleware;

