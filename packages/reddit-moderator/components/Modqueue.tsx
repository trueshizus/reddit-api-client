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
          console.log(data);
          return <li>{data.name}</li>;
        })}
      </ul>
    </main>
  );
}
