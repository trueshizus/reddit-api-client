declare module "bun" {
  interface Env {
    REDDIT_CLIENT_ID: string;
    REDDIT_CLIENT_SECRET: string;
    REDDIT_USERNAME: string;
    REDDIT_PASSWORD: string;
  }
}
