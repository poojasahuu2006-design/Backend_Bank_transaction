require("dotenv").config();
const app=require("./src/app")
const connectDB=require("./src/db/db");

connectDB().then(() => {
  app.listen(3000,()=>{
    console.log("Server is connected successfully");
  });
}).catch(err => {
  console.error("Failed to connect to DB:", err);
});