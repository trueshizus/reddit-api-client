import { z } from "zod";

const envSchema = z.object({
  ENV: z.union([z.literal("development"), z.literal("production")]),
  REDDIT_CLIENT_ID: z.string(),
  REDDIT_CLIENT_SECRET: z.string(),
  REDDIT_USERNAME: z.string(),
  REDDIT_PASSWORD: z.string(),
  REDDIT_SUBREDDIT: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
