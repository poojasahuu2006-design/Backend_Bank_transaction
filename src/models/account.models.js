const mongoose=require("mongoose")
const accountSchema=new mongoose.Schema({
     
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["Active", "Blocked", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);


const accountModel=mongoose.model("Account",accountSchema);
module.exports=accountModel;