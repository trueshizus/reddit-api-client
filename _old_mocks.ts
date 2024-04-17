import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import { JSONSchemaFaker } from "json-schema-faker";
import accessTokenMock from "./docs/api/v1/acccess_token.json";
import meSchema from "./docs/api/v1/me.schema.json";
import modqueueSchema from "./docs/api/v1/subreddit/modqueue.schema.json";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(async (req) => {
    if (req.url.endsWith("/api/v1/access_token")) {
      return Promise.resolve(JSON.stringify(accessTokenMock));
    }

    if (req.url.endsWith("/api/v1/me")) {
      const fakeSchema = JSONSchemaFaker.generate(meSchema);
      return JSON.stringify(fakeSchema);
    }

    if (req.url.endsWith("/about/modqueue")) {
      const fakeSchema = JSONSchemaFaker.generate(modqueueSchema);
      return Promise.resolve(JSON.stringify(fakeSchema));
    }

    return Promise.resolve(
      JSON.stringify({
        message: "No mock setup for this URL",
      })
    );
  });
});
