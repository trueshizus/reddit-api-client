// This component is the layout for the entire application. It includes the header, footer, and the main content area.

import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props): React.ReactElement {
  return (
    <div>
      <header>
        <h1>Reddit Moderator</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2021 Reddit Moderator</p>
      </footer>
    </div>
  );
}
