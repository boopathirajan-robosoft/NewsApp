import * as React from "react";
import { mainContext } from "./_app";

import { Layout, Heading, AllNews } from "./../components";

function Bookmarks(props) {
  const { contextData, setContextData } = React.useContext(mainContext);
  console.log({ contextData });

  return (
    <Layout>
      <div className={"read-content"}>
        <Heading title="BookMarks" />
        <AllNews data={contextData.bookMarkData} />
      </div>
    </Layout>
  );
}

export default Bookmarks;
