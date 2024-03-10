# Reddit Api Client

## Getting Started

1. Clone the repository

`git clone git@github.com:trueshizus/reddit-api-client.git`

2. Get your [Reddit Credentials](https://old.reddit.com/prefs/apps/).

3. Rename `.env.sample` to `.env` and change the values with your credentials.

4. Run npm install

`npm i`

5. To use the client for the command line use:

`npm run dev`

- install package
- get reddit credentials.
- usage examples

## Example

```typescript
const credentials = {
  client_id: "999999999",
  client_secret: "8888888",
  username: "myAccount",
  password: "myPassword",
};

const client = await CreateRedditApiClient(credentials);
const me = await client.me();

console.log(me);
```

## Testing

`npm run test`
