import dotenv from "dotenv";
import repl from "repl";

import CreateRedditApiClient from "../src/index";
dotenv.config();

const credentials = {
  client_id: process.env.REDDIT_CLIENT_ID!,
  client_secret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
};

const startDevelopment = () => {
  const createClient = async () => {
    const client = await CreateRedditApiClient(credentials);
    const replServer = repl.start({
      prompt: "> ",
    });

    replServer.context.client = client;
  };

  return createClient();
};

startDevelopment();
