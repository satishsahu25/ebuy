import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};




const connecttoDB = async () => {
  const URL =process.env.MONGO_URL;
const dbName="ebuy";
  await mongoose
    .connect(URL,{dbName}, configOptions)
    .then(() => console.log("db connected success"))
    .catch((err) => {
      console.log(err);
    });
};

export default connecttoDB;

