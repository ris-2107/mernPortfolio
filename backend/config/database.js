import mongoose from "mongoose";

export const connectDatabse = () => {
  mongoose
    .connect('mongodb+srv://user-portfolio:rishabh123@cluster0.ffesr.mongodb.net/portfolio?retryWrites=true', {
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
