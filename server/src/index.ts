import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";
import app from "./app";

mongoose
  .connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to Insta API Database - Initial Connection");
  })
  .catch((err) => {
    console.log(`Initial Insta API Database connection error occured -`, err);
  });

app.listen(3001, () => {
  console.log("started");
});
