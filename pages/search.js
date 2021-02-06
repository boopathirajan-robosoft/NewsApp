import * as React from "react";
import fetch from "isomorphic-unfetch";
import { Layout, Heading, AllNews } from "./../components";

function search(props) {
  const {
    allNews: { articles: allNewsArticles = [], totalResults = 0 } = {},
  } = props;

  return (
    <Layout>
      <div className={"read-content"}>
        <Heading title="Search Results" />
        <AllNews data={allNewsArticles} />
      </div>
    </Layout>
  );
}

search.getInitialProps = async function (ctx) {
  console.log({ ctx });
  const res = await fetch(
    `https://newsapi.org/v2/everything?apiKey=132d64606ec0465082faadd12f45d6fe&pageSize=10&q=${
      ctx.query.q || "car"
    }`
  );

  const data = await res.json();

  return {
    allNews: data,
  };
};

export default search;
