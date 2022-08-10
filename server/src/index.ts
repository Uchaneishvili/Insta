import mongoose, { ConnectOptions } from "mongoose";
import app from "./app";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { Router } from "express";
import { UserRoutes } from "./routes/userRoutes";

mongoose
  .connect(
    `mongodb+srv://gigauchaneishvili:giga20003030@instagramproject.qypwqbr.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then((res) => {
    console.log("Connected to Insta API Database - Initial Connection");
  })
  .catch((err) => {
    console.log(`Initial Insta API Database connection error occured -`, err);
  });

const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: "Insta Api ",
      description: "Insta API Information",
      version: "1.0.0",
    },
    contact: {
      name: "Giga Uchaneishvli",
    },
    servers: ["http://localhost:3001/"],
  },
  // ['.routes/*js]
  apis: ["**/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const router = Router();

const options = {
  origin: ["http://localhost:3001"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: true,
  credentials: true,
};

router.use(cors(options));

const userRoutes = new UserRoutes();
app.use("/users", userRoutes.route());
