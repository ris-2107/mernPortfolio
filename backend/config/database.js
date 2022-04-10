import mongoose from "mongoose";

export const connectDatabse = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((c) => {
      console.log(`MongoDB Connected to: ${c.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
