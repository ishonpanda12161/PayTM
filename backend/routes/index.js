const express = require("express");
const router = express.Router();
const useAccount = require("./account");
const userRouter = require("./user");

router.use("/user", userRouter);
router.use("/account",useAccount);

module.exports = router;
