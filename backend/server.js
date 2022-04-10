import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabse } from "./config/database.js";
import cloudinary from "cloudinary";

dotenv.config({ path: "./backend/config/config.env" });

connectDatabse();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected to port: ${process.env.PORT}`);
});
