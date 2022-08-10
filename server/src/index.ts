import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";
import app from "./app";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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

const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insta Api ",
      version: "1.0.0",
    },
  },
  // ['.routes/*js]
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3001, () => {
  console.log("started");
});
