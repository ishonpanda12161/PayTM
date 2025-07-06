const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const { Account } = require("../db");
const mongoose = require("mongoose");
const router = express.Router();

//get user balance

router.get("/balance",userMiddleware,async (req,res)=> {
    const data = await Account.findOne({
        userId : req.userId,
    });

    res.json({BalanceAvailable: data.balance});

});

//Transfer using Session Txn 

router.post("/transfer",userMiddleware,async (req,res)=>{

    //start session
    const session = await mongoose.startSession();
    //start transaction
    session.startTransaction();

    const {amount,to} = req.body;

    const sender = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(!sender || sender.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        });
    }

    const reciever = await Account.findOne({
        userId:to
    }).session(session);

    if(!reciever)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Account Invalid"
        });
    }

    //if success , perform transfer 

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //commit transaction
    await session.commitTransaction();
    res.json({
        msg:"Transaction Successfull!"
    });

    //end session
    session.endSession();

});

module.exports = router;