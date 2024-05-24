import type { Listing, Modqueue } from "./types";

export type Credentials = {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
};

export type OauthCredentials = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
};

const setHeaders = (credentials: OauthCredentials) => {
  console.info("Updating request header...");
  return new Headers({
    Authorization: `Bearer ${credentials.access_token}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "web:argentina-modtools:v0.0.1 (by /u/BotonAr)",
  });
};

export const getOauthCredentials = async (credentials: Credentials) => {
  const authorizationHeader = `Basic ${Buffer.from(
    `${credentials.client_id}:${credentials.client_secret}`
  ).toString("base64")}`;

  try {
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
    });

    const data: OauthCredentials = await response.json();

    console.info("Access token received");

    console.info("respose: ", data);
    return data;
  } catch (error) {
    console.error("Failed to get access token from Reddit API: ", error);
  }
};

const subredditClient = async (
  BASE_URL: string,
  HEADERS: Headers,
  name: string
) => {
  const subreddit = name;

  const modqueue = async (after?: string): Promise<Modqueue> => {
    const path = `/r/${subreddit}/about/modqueue`;
    const url = new URL(path, BASE_URL);
    url.searchParams.append("limit", "10");
    url.searchParams.append("raw_json", "1");

    if (after) {
      url.searchParams.append("after", after);
    }

    const response = await fetch(url.toString(), {
      headers: HEADERS,
    });

    if (!response.ok) {
      console.error("Failed to fetch Mod Queue", response);
      const text = await response.text();
      throw new Error(text);
    }

    const resul = await response.json();

    const next = () => {
      const nextPage = resul?.data?.after;
      if (nextPage) {
        return modqueue(nextPage);
      } else {
        return null;
      }
    };

    // listing returs children or an empty array
    const listings = () => (resul?.data?.children as Listing[]) || [];

    return {
      next,
      listings,
    };
  };

  const feed = async (params: { limit: number; after: string }) => {
    const { limit, after } = params;
    const path = `/r/${subreddit}/new`;
    const url = new URL(path, BASE_URL);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("raw_json", "1");

    if (after) {
      url.searchParams.append("after", after);
    }

    const response = await fetch(url.toString(), {
      headers: HEADERS,
    });

    if (!response.ok) {
      console.error("Failed to fetch feed", response);
      const text = await response.text();
      throw new Error(text);
    }

    const resul = await response.json();

    const next = () => {
      const nextPage = resul?.data?.after;
      if (nextPage) {
        return feed(nextPage);
      } else {
        return null;
      }
    };

    const listing = () => resul.data.children;

    return {
      next,
      listing,
    };
  };

  return {
    feed,
    modqueue,
  };
};

const redditApiClient = async (credentials: Credentials) => {
  const BASE_URL = "https://oauth.reddit.com";

  const oauthCredentials = await getOauthCredentials(credentials);

  if (!oauthCredentials) {
    throw Error("no oauthCredentials");
  }

  const HEADERS = setHeaders(oauthCredentials);

  const subreddit = (name: string) => subredditClient(BASE_URL, HEADERS, name);

  const remove = async (id: string) => {
    const path = "/api/remove";
    const url = `${BASE_URL}${path}`;
    const body = `id=${id}&spam=false`;

    console.info("Removing listing: ", id);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: HEADERS,
        body: body,
      });

      if (response.status === 200) {
        console.info("Remove request successful");
        return id;
      }
      const json_response = await response.json();
      console.info(json_response);
      console.info("Remove request failed");
    } catch (error) {
      console.info(`Error removing listing ${id}`);
      console.error(error);
    }

    return null;
  };

  const me = async () => {
    const path = "/api/v1/me";
    const url = `${BASE_URL}${path}`;

    console.info(`GET ${path}`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: HEADERS,
      });

      if (response.status === 200) {
        console.info("identity request successful successful");
      }

      const json_response = await response.json();
      console.info("response: ", json_response);

      return json_response;
    } catch (error) {
      console.info(`Error requesting identity`);
      console.error(error);
    }

    return null;
  };

  return {
    subreddit,
    me,
    remove: (id: string) => new Promise((resolve) => resolve("")),
  };
};

const RedditApiClient = (credentials: Credentials) => {
  let client: Awaited<ReturnType<typeof redditApiClient>>;

  const createClient = async () => {
    if (!client) {
      console.info("Requesting new token and creating client...");
      client = await redditApiClient(credentials);
    } else {
      console.info("Returning cached client...");
    }
    return client;
  };

  return createClient();
};

export default RedditApiClient;
