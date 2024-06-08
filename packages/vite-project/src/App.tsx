import { Suspense, lazy } from "react";
import reactLogo from "./assets/react.svg";

import Post from "./componets/post";
import PostFeed from "./componets/posts-feed";
import "./App.css";

// Works also with SSR as expected
const Card = lazy(() => import("./Card"));

const posts = [
  {
    id: 1,
    title: "React",
    content: "A JavaScript library for building user interfaces",
  },
  {
    id: 2,
    title: "Vue",
    content: "The Progressive JavaScript Framework",
  },
  {
    id: 3,
    title: "Angular",
    content: "One framework. Mobile & desktop.",
  },
  {
    id: 4,
    title: "Svelte",
    content: "Cybernetically enhanced web apps",
  },
  {
    id: 5,
    title: "Ember",
    content: "A framework for ambitious web developers",
  },
];

function App({}) {
  return (
    <>
      <h1>RedditUI</h1>
      <div className="queues">
        <div className="queue removed">
          <h2>Remove</h2>
        </div>
        <div className="queue pending">
          <h2>Pending</h2>
          <PostFeed posts={posts}></PostFeed>
        </div>
        <div className="queue approved">
          <h2>Approve</h2>
        </div>
      </div>
      {/* <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense> */}
    </>
  );
}

export default App;
