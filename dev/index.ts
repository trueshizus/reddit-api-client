import * as dotenv from "dotenv";
import * as repl from "repl";

import CreateRedditApiClient from "../src/index";
dotenv.config();

console.log(process.env);
const credentials = {
  client_id: process.env.REDDIT_CLIENT_ID!,
  client_secret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
};

const client = CreateRedditApiClient(credentials);

const replServer = repl.start({
  prompt: "> ",
});

replServer.context.client = client;
