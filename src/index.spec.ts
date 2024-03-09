import fetch from "jest-fetch-mock";
import RedditApiClient, { Credentials } from "./index";

describe("RedditApiClient", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should be defined", () => {
    expect(RedditApiClient).toBeDefined();
  });

  it("throws and error when the credentials are empty", () => {
    let credentials: Credentials;
    expect(() => RedditApiClient(credentials)).toThrow();
  });
});
