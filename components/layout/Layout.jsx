import * as React from "react";
import { Header } from "./../header";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="na-content-area">{props.children}</div>
    </>
  );
};

export { Layout };
export default Layout;
