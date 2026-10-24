require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is connected successfully on port ${PORT}`);
    console.log(`Swagger docs available at /api-docs`);
  });
}).catch(err => {
  console.error("Failed to connect to DB:", err);
  process.exit(1);
});
