export type Listing = {
  kind: string;
  data: {
    id: string;
    subreddit_id: string;
  };
};

export type Modqueue = {
  listings: () => Listing[];
  next: () => any;
};
