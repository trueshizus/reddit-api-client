export function Layout(props: Html.PropsWithChildren<{}>) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}