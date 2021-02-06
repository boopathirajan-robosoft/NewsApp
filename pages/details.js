import * as React from "react";
import Iframe from "react-iframe";
import fetch from "isomorphic-unfetch";
import { mainContext } from "./_app";

import { Layout, Heading, AllNews } from "./../components";

function Details(props) {
  const {
    allNews: { articles: allNewsArticles = [], totalResults = 0 } = {},
  } = props;
  const { contextData, setContextData } = React.useContext(mainContext);

  //   React.useEffect(() => {
  //     console.log({ contextData });
  //     setContextData({ ...contextData, newsUrl: "" });
  //   }, []);

  return (
    <Layout>
      <Iframe
        url={
          contextData.newsUrl ||
          "http://techcrunch.com/2021/01/06/senti-bio-raises-105-million-for-its-new-programmable-biology-platform-and-cancer-therapies/"
        }
        width="1300px"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        frameBorder="0"
      />
      <div className={"read-content"}>
        <Heading title="Don't miss to read" />
        <AllNews data={allNewsArticles} />
      </div>
    </Layout>
  );
}

Details.getInitialProps = async function (ctx) {
  const res = await fetch(
    "https://newsapi.org/v2/everything?apiKey=132d64606ec0465082faadd12f45d6fe&pageSize=3&q=bitcoin"
  );

  const data = await res.json();

  return {
    allNews: data,
  };
};

export default Details;
