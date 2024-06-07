import { useState } from "react";

function Card() {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button onClick={() => setUpvotes((upvotes) => upvotes + 1)}>
        upvotes is {upvotes}
      </button>
      <button onClick={() => setDownvotes((downvotes) => downvotes + 1)}>
        downvotes is {downvotes}
      </button>
    </div>
  );
}

export default Card;
