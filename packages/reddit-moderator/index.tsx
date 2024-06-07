import { Hono } from "hono";
import Modqueue from "./components/Modqueue";
import RedditApiClient from "api-client/RedditApiClient";
import ReactDOMServer from "react-dom/server";
import Layout from "./components/Layout";

const credentials = {
  client_id: Bun.env.REDDIT_CLIENT_ID,
  client_secret: Bun.env.REDDIT_CLIENT_SECRET,
  username: Bun.env.REDDIT_USERNAME,
  password: Bun.env.REDDIT_PASSWORD,
};

const client = await RedditApiClient(credentials);

const app = new Hono();

app.get("/auth", async (c) => {
  const auth = await client.me();
  return c.json(auth);
});

app.get("/mod", async (c) => {
  const subreddit = await client.subreddit("argentina");
  const modqueue = await subreddit.modqueue();
  return c.json(modqueue.listings());
});

app.get("/feed", async (c) => {
  const subreddit = await client.subreddit("argentina");
  const feed = await subreddit.feed({ limit: 10, after: "" });
  return c.json(feed.listing());
});

app.get("/me", async (c) => {
  const me = await client.me();
  return c.json(me);
});

app.get("/moderate", async (c) => {
  const subreddit = await client.subreddit("argentina");
  const modqueue = await subreddit.modqueue();
  const content = ReactDOMServer.renderToString(
    <Layout>
      <div>Your string here</div>
    </Layout>
  );
  return c.html(content);
});

export default app;
