import Post from "./post";

type Props = {
  posts: Post[];
  name: string;
};

export default function Queue({ posts, name }: Props) {
  return (
    <section id={`queue-${name}`} className="queue">
      <h2>{name}</h2>
      <fieldset id={`items-queue-${name}`}>
        {posts.map((post) => (
          <div key={post.id} className="queue-item">
            <input
              type="radio"
              id={`post-${post.id}-radio`}
              name={`item-queue-${name}`}
              value={post.id}
            />
            <label htmlFor={`post-${post.id}-radio`}>
              <Post key={post.id} {...post} />
            </label>
          </div>
        ))}
      </fieldset>
    </section>
  );
}
