import { renderToReadableStream } from "react-dom/server";

const Component = ({ message }: { message: string }) => <div>{message}</div>;

const stream = await renderToReadableStream(
  <Component message="Hello from server!" />
);

const App = () => {
  const message = "Hello from server!";
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css"></link>
        <title>My app</title>
      </head>
      <body>
        <span>Hello </span>
      </body>
    </html>
  );
};

Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<App />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
