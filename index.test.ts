import { expect, test } from "bun:test";
import createRedditApiClient from ".";

test("Reddit API Client", async () => {
  test("createRedditApiClient", async () => {
    const credentials = {
      client_id: "client_id",
      client_secret: "client_secret",
      username: "username",
      password: "password",
    };
    const client = await createRedditApiClient(credentials);
    expect(client).toBeDefined();
  });

  //   test("me", async () => {
  //     const me = await client.me();
  //     expect(me).toBeDefined();
  //   });
});
