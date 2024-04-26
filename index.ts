const logger = require("pino")();

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

const validateCredentials = (credentials: Credentials) => {
  if (!credentials?.client_id) {
    throw new Error("client_id is required");
  }
  if (!credentials?.client_secret) {
    throw new Error("client_secret is required");
  }
  if (!credentials?.username) {
    throw new Error("username is required");
  }
  if (!credentials?.password) {
    throw new Error("password is required");
  }
};

const setHeaders = (credentials: OauthCredentials) => {
  logger.info("Updating request header...");
  return new Headers({
    Authorization: `Bearer ${credentials.access_token}`,
    // "Content-Type": "application/json",
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

    logger.info("Access token received");

    logger.info("respose: ", data);
    return data;
  } catch (error) {
    logger.error("Failed to get access token from Reddit API: ", error);
  }
};

const subredditClient = async (
  BASE_URL: string,
  HEADERS: Headers,
  name: string
) => {
  const subreddit = name;

  const modqueue = async (after?: string) => {
    const path = `/r/${subreddit}/about/modqueue`;
    const url = new URL(path, BASE_URL);
    url.searchParams.append("limit", "100");
    url.searchParams.append("raw_json", "1");

    if (after) {
      url.searchParams.append("after", after);
    }

    const response = await fetch(url.toString(), {
      headers: HEADERS,
    });

    if (!response.ok) {
      logger.error("Failed to fetch Mod Queue", response);
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

    const listing = () => resul.data.children;

    return {
      next,
      listing,
    };
  };

  return {
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

    logger.info("Removing listing: ", id);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: HEADERS,
        body: body,
      });

      if (response.status === 200) {
        logger.info("Remove request successful");
        return id;
      }
      const json_response = await response.json();
      logger.info(json_response);
      logger.info("Remove request failed");
    } catch (error) {
      logger.info(`Error removing listing ${id}`);
      logger.error(error);
    }

    return null;
  };

  const me = async () => {
    const path = "/api/v1/me";
    const url = `${BASE_URL}${path}`;

    logger.info(`GET ${path}`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: HEADERS,
      });

      if (response.status === 200) {
        logger.info("identity request successful successful");
      }

      const json_response = await response.json();
      logger.info("response: ", json_response);

      return json_response;
    } catch (error) {
      logger.info(`Error requesting identity`);
      logger.error(error);
    }

    return null;
  };
  return {
    subreddit,
    me,
    remove: (id: string) => new Promise((resolve) => resolve("")),
  };
};

const createRedditApiClient = (credentials: Credentials) => {
  let client: Awaited<ReturnType<typeof redditApiClient>>;

  const createClient = async () => {
    if (!client) {
      logger.info("Requesting new token and creating client...");
      client = await redditApiClient(credentials);
    } else {
      logger.info("Returning cached client...");
    }
    return client;
  };

  return createClient();
};

export default createRedditApiClient;
