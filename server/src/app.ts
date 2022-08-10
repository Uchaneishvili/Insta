import express from "express";

const app = express();

app.listen(3001, () => {
  console.log("started");
});

export default app;
