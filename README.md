# Reddit API Client

Interact with Reddit API. Built with [Bun](https://bun.sh/) and [Typescript](https://www.typescriptlang.org/).

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:trueshizus/reddit-api-client.git
```

2. Get your [Reddit Credentials](https://old.reddit.com/prefs/apps/).
3. Rename `.env.sample` to `.env` and change the values with your credentials.

4. Run npm install

```bash
bun install
```

## How to use it

Set up your credentials and instantiate the client;

```typescript
import RedditAPIClient from 'reddit-api-client'

const credentials = {
  client_id: env.REDDIT_CLIENT_ID!,
  client_secret: env.REDDIT_CLIENT_SECRET!,
  username: env.REDDIT_USERNAME!,
  password: env.REDDIT_PASSWORD!,
};

const client = await RedditAPIClient(credentials);
const me = await client.me()

console.log(me);
```


## Testing

`npm run test`
