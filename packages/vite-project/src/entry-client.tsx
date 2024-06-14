import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const queuesIds = ["queue-remove", "queue-pending", "queue-approved"];
let activeQueue = 1; // Mutable to change with arrow press

const queryActivePost = (queueId: string) => {
  const activeQueue = document.getElementById(queueId);
  if (!activeQueue) {
    console.error(`Queue with ID ${queueId} not found.`);
    return null;
  }
  return (activeQueue.querySelector("input:checked") ||
    activeQueue.querySelector(
      "input[type='radio']:first-child"
    )) as HTMLInputElement;
};

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.code === "ArrowRight") {
    event.preventDefault();
    activeQueue = (activeQueue + 1) % queuesIds.length;
  } else if (event.code === "ArrowLeft") {
    event.preventDefault();
    activeQueue = (activeQueue - 1 + queuesIds.length) % queuesIds.length;
  }

  const nextPost = queryActivePost(queuesIds[activeQueue]);
  if (nextPost) {
    nextPost.focus();
    nextPost.checked = true;
  }
};

window.addEventListener("load", () => {
  window.addEventListener("keydown", handleKeyDown);
});

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
