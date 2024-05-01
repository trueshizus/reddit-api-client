export type Listing = {
  kind: string;
  data: {
    name: string;
    thumbnail: string;
  };
};

export type Modqueue = {
  listings: () => Listing[];
  next: () => any;
};
