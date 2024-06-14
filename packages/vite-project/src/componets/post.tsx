type Post = {
  id: number;
  title: string;
  content: string;
};

const Post = ({ id, title, content }: Post) => {
  return (
    <article id={`post-${id}`} className="post">
      <h3>{title}</h3>
      <p>{content}</p>
    </article>
  );
};

export default Post;
