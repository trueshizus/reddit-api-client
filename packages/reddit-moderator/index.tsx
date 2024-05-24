import { html } from "@elysiajs/html";

import { Elysia } from "elysia";
import Modque from "./components/Modqueue";
import RedditApiClient from "api-client/RedditApiClient";
import { Layout } from "./components/Layout";

const credentials = {
  client_id: Bun.env.REDDIT_CLIENT_ID!,
  client_secret: Bun.env.REDDIT_CLIENT_SECRET!,
  username: Bun.env.REDDIT_USERNAME!,
  password: Bun.env.REDDIT_PASSWORD!,
};

const client = await RedditApiClient(credentials);

new Elysia()
  .get("/mod", async () => {
    const subreddit = await client.subreddit("argentina");
    const modqueue = await subreddit.modqueue();
    return modqueue.listings();
  })
  .get("/feed", async () => {
    const subreddit = await client.subreddit("argentina");
    const feed = await subreddit.feed({ limit: 10, after: "" });
    return feed.listing();
  })
  .get("/me", async () => await client.me())
  .use(html())
  .get("/moderate", async () => {
    const subreddit = await client.subreddit("argentina");
    const modqueue = await subreddit.modqueue();
    return (
      <Layout>
        <Modque modqueue={modqueue} />
      </Layout>
    );
  })
  .listen(3000);
