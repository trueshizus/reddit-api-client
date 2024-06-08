type Post = {
  id: number;
  title: string;
  content: string;
};

const Post = ({ title, content }: Post) => {
  return (
    <article className="post">
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
};

export default Post;
