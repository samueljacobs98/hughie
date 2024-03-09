import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import { v4 as uuid } from "uuid";

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "src/views");

app.use(cors());

app.post("/submit", (req, res) => {
  const message = req.body.message;
  const context = req.body.context;

  if (!(typeof message === "string" && message.length > 0)) {
    res.render("components/error", {
      message: "Error: Please provide a [valid] message",
    });
    return;
  }

  res.render("components/chat", {
    userMessage: message,
    aiMessage: "I am a bot, I don't understand your message",
  });
});

app.post("/summarise", (req, res) => {
  const message = req.body.message;
  const context = req.body.context;

  console.log("body", req.body);

  // if (!(typeof message === "string" && message.length > 0)) {
  //   res.render("components/error", {
  //     layout: false,
  //     message: "Error: Please provide a [valid] message",
  //   });
  //   return;
  // }

  // res.render("components/chat", {
  //   layout: false,
  //   userMessage: message,
  //   aiMessage: "I am a bot, I don't understand your message",
  // });

  res.send(`<li>Hello World</li>`);
});

app.get("/", (req, res) => {
  res.render("home", { layout: false, session: `Session Id: ${uuid()}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
