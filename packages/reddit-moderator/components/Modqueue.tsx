import { type Modqueue } from "api-client/types";

type Props = {
  modqueue: Modqueue;
};

export default function Modque({ modqueue }: Props) {
  const listings = modqueue.listings();

  return (
    <main>
      <ul>
        {listings.map(({ data }) => {
          const { subreddit_id } = data;
          return <li>{subreddit_id}</li>;
        })}
      </ul>
    </main>
  );
}
