import { Elysia } from "elysia";
import createRedditApiClient from "..";
import env from "../env";

const credentials = {
  client_id: env.REDDIT_CLIENT_ID!,
  client_secret: env.REDDIT_CLIENT_SECRET!,
  username: env.REDDIT_USERNAME!,
  password: env.REDDIT_PASSWORD!,
};

const client = await createRedditApiClient(credentials);

new Elysia()
  .get("/mod", async () => {
    const subreddit = await client.subreddit("argentina");
    const modqueue = await subreddit.modqueue();
    return modqueue.listing();
  })
  .get("/me", async () => await client.me())
  .listen(3000);
