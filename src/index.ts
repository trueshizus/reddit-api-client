import logger from "winston";
logger.add(new logger.transports.File({ filename: "development.log" }));

export type Credentials = {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
};

type ApiClient = {
  remove: (id: string) => Promise<string | null>;
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

export const getOauthCredentials = async (
  credentials: Credentials
): Promise<OauthCredentials> => {
  const authorizationHeader = `Basic ${Buffer.from(
    `${credentials.client_id}:${credentials.client_secret}`
  ).toString("base64")}`;

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
  });

  if (!response.ok) {
    throw new Error("Failed to get access token from Reddit API");
  }

  logger.info("Access token received");
  const data: OauthCredentials = await response.json();
  return data;
};

const RedditApiClient = async (
  credentials: Credentials
): Promise<ApiClient> => {
  const BASE_URL = "https://oauth.reddit.com";
  const oauthCredentials = await getOauthCredentials(credentials);
  const HEADERS = setHeaders(oauthCredentials);

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
  return {
    remove: (id: string) => new Promise((resolve) => resolve("")),
  };
};

const CreateRedditApiClient = (credentials: Credentials) => {
  let cachedClient: ApiClient | null = null;
  validateCredentials(credentials);

  return (async () => {
    if (!cachedClient) {
      logger.info("Requesting new token and creating client...");
      cachedClient = await RedditApiClient(credentials);
    } else {
      logger.info("Returning cached client...");
    }
    return cachedClient;
  })();
};

export default CreateRedditApiClient;
