const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://pandaishon:0007@paytm0.fjgtn8n.mongodb.net/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(" Connected to MongoDB");
})
.catch((err) => {
    console.error(" Error connecting to MongoDB:", err);
});

// Define schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account = mongoose.model("Account",accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User,Account };