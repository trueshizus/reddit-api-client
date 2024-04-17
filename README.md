# Reddit API Client

A typescript client to interact with the Reddit API

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:trueshizus/reddit-api-client.git
```

2. Get your [Reddit Credentials](https://old.reddit.com/prefs/apps/).
3. Rename `.env.sample` to `.env` and change the values with your credentials.

4. Run npm install

```bash
npm i
```

## How to use it

### Using the CLI

```bash
npm run dev
```

```typescript
const me = await client.me();
console.log(me);
```

## Testing

`npm run test`
