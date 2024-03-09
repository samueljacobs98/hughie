import { Request, Response } from "express";

const handleRequest = (req: Request, res: Response) => {
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
};

export { handleRequest };
