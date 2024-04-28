// Reddit API refers to its elements "Things". A thing can be a post, a comment, a message.
// I'm naming this ModerationThing as "thing"  has meaning within the context of the Reddit API.

// Don't use "thing" to name, well, things.
type Props = {
  modqueue: any;
};

export default async function ModerationThing(modqueue: Props) {
  console.log(modqueue);
  return <div>Thing</div>;
}
