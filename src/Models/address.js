import mongoose from "mongoose";

const newaddressSchema = new mongoose.Schema(
  {
   
    fullname: String,
    address: String,
    city: String,
    country: String,
    postalcode: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", newaddressSchema);

export default Address;
