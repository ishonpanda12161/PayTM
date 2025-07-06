const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware =require("../middlewares/userMiddleware");

// Define ZOD Schemas first . This will be used for verifying if input is valid or not.  
// REMEMBER db schema is to send data as a format to mongo
// but zod schema is for frontend validation

//User signup schema 
const userSignup = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
});

//User Signin schema
const userSignin = zod.object({
    username:zod.string(),
    password:zod.string().min(6)
});


//User / Schema for updation 

const updateSchema = zod.object({
    username:zod.string().email().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().min(6).optional(),
});

//SIGNUP

router.post("/signup",async(req,res)=> {
    const safe = userSignup.safeParse(req.body);
    if(!safe.success)
    {
        return res.status(411).json({
            message:"Invalid Format"
        });
    }
    
    const user = await User.findOne({ username: req.body.username });

    if(user)
    {
        return res.status(411).json({
            message:"Username Already Taken"
        });
    }

    const newUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    
    const userId = newUser._id;

    // Create entry in Account table 

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    });

    const token = jwt.sign({ userId },JWT_SECRET);
    
    res.json({
        message:"User Created!!",
        token:token
    });
    
});

//SIGNIN

router.post("/signin",async (req,res)=> {
    const safe = userSignin.safeParse(req.body);
    if(!safe.success)
    {
        return res.status(411).json({
            message:"Invalid Input Format"
        });
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(!user)
    {
        return res.status(411).json({
            message:"User Not FOUND"
        });
    }

    const token = jwt.sign({userId: user._id},JWT_SECRET);

    res.json({
        message:"Got the User",
        token: token
    });

});


//PUT update with middleware 

router.put("/",userMiddleware,async (req,res)=> {
    const safe = updateSchema.safeParse(req.body);
    if(!safe.success)
    {
        return res.status(411).json({msg:"Enter Value!"});
    }

    await User.updateOne({_id: req.userId},req.body);

    res.json({msg:`Updated User , id : ${req.userId}`});

});


//GET request with seach using headers

router.get("/bulk",async (req,res)=>{

    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
            }
        },{
            lastName:  {
                "$regex": filter
            }
        },
        {
            username:  {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            id:user._id
        }))
    });
})


// export router
module.exports = router;
