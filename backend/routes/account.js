
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    
    try {
        const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    if(typeof amount !== 'number' ||  amount <= 0){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Amount should be a Number"
        });
    }

   if(account.balance == null || typeof account.balance != 'number' ){
    await session.abortTransaction();
	   return res.status(400).json({
	message : "Balance should  be valid number"
    })
   }		
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

  
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
    } catch (error) {
        console.error(error);
        await session.abortTransaction();

        if(error instanceof mongoose.MongoServerError && error.code === 14 ){
            return res.status(400).json({
                message  : "Balanace should be a valid number"
            })
        }
        else{
            return res.status(500).json({message : "Internal Server error"});
        }
    }
});

module.exports = router;
