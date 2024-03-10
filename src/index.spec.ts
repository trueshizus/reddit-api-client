import RedditApiClient, { Credentials } from "./index";

describe("RedditApiClient", () => {
  const mockCredentials = {
    client_id: "123",
    client_secret: "091823",
    username: "redditUsername",
    password: "redditPassword",
  };

  it("should be defined", () => {
    expect(RedditApiClient).toBeDefined();
  });

  it("throws and error when the credentials are empty", () => {
    let credentials: Credentials;
    expect(() => RedditApiClient(credentials)).toThrow();
  });

  it("me", async () => {
    const client = await RedditApiClient(mockCredentials);
    const response = await client.me();

    expect(response).toHaveProperty("name");
  });
});
