import RedditApiClient, { Credentials } from "./index";

describe("RedditApiClient", () => {
  const mockCredentials = {
    client_id: "123",
    client_secret: "091823",
    username: "redditUsername",
    password: "redditPassword",
  };

  it("throws and error when the credentials are empty", () => {
    let credentials: Credentials;
    expect(() => RedditApiClient(credentials)).toThrow();
  });

  it("me", async () => {
    const client = await RedditApiClient(mockCredentials);
    const response = await client.me();

    expect(response).toHaveProperty("name");
  });

  describe("subreddit", () => {
    test("modqueue", async () => {
      const client = await RedditApiClient(mockCredentials);
      const subreddit = await client.subreddit("fakesub");
      const modqueue = await subreddit.modqueue();
      const listing = await modqueue.listing();

      expect(listing).toHaveProperty("name");
    });
  });
});
