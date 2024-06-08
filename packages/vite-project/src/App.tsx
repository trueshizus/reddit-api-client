import { Suspense, lazy } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Post from "./componets/post";
import PostFeed from "./componets/posts-feed";

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
];

function App({}) {
  return (
    <>
      <h1>RedditUI</h1>
      <PostFeed posts={posts}></PostFeed>

      {/* <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense> */}
    </>
  );
}

export default App;
