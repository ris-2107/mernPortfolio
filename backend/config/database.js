import mongoose from "mongoose";

export const connectDatabse = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017', {
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
