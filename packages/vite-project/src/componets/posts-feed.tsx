import Post from "./post";

type Props = {
  posts: Post[];
};

export default function PostFeed({ posts }: Props) {
  return (
    <div className="feed">
      <fieldset id="looperGroup">
        {posts.map((post) => (
          <div key={post.id}>
            <input
              type="radio"
              id={`radioApple-${post.id}`}
              name="radioFruit"
              value="apple"
            />
            <label htmlFor={`radioApple-${post.id}`}>
              <Post {...post} />
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
