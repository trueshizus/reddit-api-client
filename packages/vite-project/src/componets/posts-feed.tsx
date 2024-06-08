import Post from "./post";

type Props = {
  posts: Post[];
  name: string;
};

export default function PostFeed({ posts, name }: Props) {
  return (
    <fieldset id={`fieldset-${name}`} className="feed">
      {posts.map((post) => (
        <div key={post.id}>
          <input
            type="radio"
            id={`radioApple-${post.id}`}
            name={`radiogroup-${name}`}
            value="apple"
          />
          <label htmlFor={`radioApple-${post.id}`}>
            <Post {...post} />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
