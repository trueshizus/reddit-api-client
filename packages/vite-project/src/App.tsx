import { useState } from "react";

import "./App.css";
import Queue from "./componets/queue";

const pendingPostsSample = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    content:
      "A comprehensive guide to closures in JavaScript and their practical applications.",
  },
  {
    id: 2,
    title: "Introduction to Docker",
    content: "Learn the basics of Docker and containerization technology.",
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    content:
      "Master the powerful CSS Grid layout system with practical examples.",
  },
  {
    id: 4,
    title: "Building REST APIs with Node.js",
    content:
      "Step-by-step tutorial on creating RESTful APIs using Node.js and Express.",
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    content:
      "An introduction to the fundamentals of machine learning and its algorithms.",
  },
];

const approvedPostsSample = [
  {
    id: 6,
    title: "Advanced TypeScript Techniques",
    content:
      "Explore advanced features and patterns in TypeScript for robust type-safe code.",
  },
  {
    id: 7,
    title: "State Management with Redux",
    content:
      "A deep dive into state management in React applications using Redux.",
  },
  {
    id: 8,
    title: "GraphQL vs REST",
    content:
      "Comparison between GraphQL and REST API design patterns, pros and cons.",
  },
  {
    id: 9,
    title: "Introduction to Kubernetes",
    content:
      "A beginner's guide to Kubernetes and its role in container orchestration.",
  },
  {
    id: 10,
    title: "Unit Testing in JavaScript",
    content:
      "Learn how to write and run unit tests for JavaScript applications using Jest.",
  },
];

const removedPostsSample = [
  {
    id: 11,
    title: "Understanding CSS Specificity",
    content:
      "In-depth explanation of CSS specificity and how to manage it effectively.",
  },
  {
    id: 12,
    title: "Building a Blog with Gatsby",
    content:
      "A tutorial on setting up a static blog site using Gatsby and React.",
  },
  {
    id: 13,
    title: "Introduction to WebAssembly",
    content:
      "Learn about WebAssembly and how to run high-performance code in the browser.",
  },
  {
    id: 14,
    title: "Deep Dive into React Hooks",
    content:
      "A comprehensive look at React hooks and how to use them in functional components.",
  },
  {
    id: 15,
    title: "Serverless Architecture",
    content:
      "Understanding the benefits and challenges of serverless computing architectures.",
  },
];

function App() {
  const [removedPosts, setRemovedPosts] = useState(removedPostsSample);
  const [pendingPosts, setPendingPosts] = useState(pendingPostsSample);
  const [approvedPosts, setApprovedPosts] = useState(approvedPostsSample);

  const removePost = (id: number) => {
    const post = pendingPosts.find((post) => post.id === id);
    if (!post) return;
    setPendingPosts(pendingPosts.filter((post) => post.id !== id));
    setRemovedPosts([post, ...removedPosts]);
  };

  const approvePost = (id: number) => {
    const post = pendingPosts.find((post) => post.id === id);
    if (!post) return;
    setPendingPosts(pendingPosts.filter((post) => post.id !== id));
    setApprovedPosts([post, ...approvedPosts]);
  };

  const moveToPending = (id: number) => {
    const post = approvedPosts.find((post) => post.id === id);
    if (!post) return;
    setApprovedPosts(approvedPosts.filter((post) => post.id !== id));
    setPendingPosts([post, ...pendingPosts]);
  };

  return (
    <>
      <h1>RedditUI </h1>
      <main className="queues">
        <Queue posts={removedPosts} name={"remove"}></Queue>
        <Queue posts={pendingPosts} name={"pending"}></Queue>
        <Queue posts={approvedPosts} name={"approved"}></Queue>
      </main>
    </>
  );
}

export default App;
