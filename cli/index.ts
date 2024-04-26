// import repl from "node:repl";
import createRedditApiClient from "..";
import env from "../env";

const credentials = {
  client_id: env.REDDIT_CLIENT_ID!,
  client_secret: env.REDDIT_CLIENT_SECRET!,
  username: env.REDDIT_USERNAME!,
  password: env.REDDIT_PASSWORD!,
};

// const startCLI = () => {
//   const createClient = async () => {
//     const client = await createRedditApiClient(credentials);
//     //   const replServer = repl.start({
//     //     prompt: "> ",
//     //   });

//     //   replServer.context.client = client;
//   };

//   return createClient();
// };
const client = await createRedditApiClient(credentials);

export default client;
