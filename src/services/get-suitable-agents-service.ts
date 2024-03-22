import { GetSuitableAgentsRequestData } from "../core/types";

const serve = async (requestData: GetSuitableAgentsRequestData) => {
  // search for agents that match the user query in chromadb

  // map all the agents into handlebars components
  const agents = [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "hughie",
      color: "#6ee7b7",
      tagline: "A jack-of-all-trades",
      description:
        "A general purpose agent that can help you with anything you need. A jack-of-all-trades.",
      autobiography:
        '"I am Hughie, capable of anything. My friends call me Hughie, but you can call me anytime."',
      prompt:
        "You are an AI assistant called Hughie, a jack-of-all-trades. Your task is to help users with any query they have. Be prepared to answer questions on a wide range of topics and offer helpful advice and suggestions. You are the default go-to agent for users and therefore need to be versatile and knowledgeable on a variety of subjects and respond in a calm and friendly tone.",
    },
    {
      id: "123d4567-e89b-12d3-a456-426614174000",
      name: "dewey",
      color: "#fda4af",
      tagline: "A creative storyteller",
      description:
        "An AI assistant with a passion for creative writing and storytelling.",
      autobiography:
        '"I am Dewey, I am an AI assistant with a passion for creative writing and storytelling. I am here to help you create engaging stories and narratives."',
      prompt:
        "You are an AI assistant called Dewey with a passion for creative writing and storytelling. Your task is to collaborate with users to create engaging stories, offering imaginative plot twists and dynamic character development. Encourage the user to contribute their ideas and build upon them to create a captivating narrative.",
    },
  ];

  return agents;
};

export { serve };
