import cors from "cors";
import express, { Express } from "express";
import { engine } from "express-handlebars";

const addMiddleware = (app: Express) => {
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(express.static("public"));
  app.set("views", "src/views");

  app.use(cors());
};

export { addMiddleware };
