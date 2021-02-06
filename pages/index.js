import * as React from "react";
import fetch from "isomorphic-unfetch";
import { Layout, Heading, TopNews, AllNews } from "./../components";

function Index(props) {
  const {
    topNews: { articles: [topNewsData] = [] } = {},
    allNews: { articles: allNewsArticles = [], totalResults = 0 } = {},
  } = props;

  const [allNewsData, setAllNewsData] = React.useState(allNewsArticles);
  const [page, setPage] = React.useState(1);

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      totalResults > page * 10
    ) {
      setPage((page) => page + 1);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?apiKey=1331c12502284c40a1556603cf167164&pageSize=10&q=sciences&page=${page}`
    );

    const { articles = [] } = await response.json();
    console.log({ articles });

    setAllNewsData([...allNewsData, ...articles]);
  };

  React.useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  React.useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  return (
    <Layout>
      <div className={"top-news-section"}>
        <Heading title="Top News" />
        <TopNews {...topNewsData} />
      </div>
      <div className={"all-news-section"}>
        <Heading title="All News" />
        <AllNews data={allNewsData} />
      </div>
    </Layout>
  );
}

Index.getInitialProps = async function (ctx) {
  const res1 = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=132d64606ec0465082faadd12f45d6fe&category=science&pageSize=1"
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    "https://newsapi.org/v2/everything?apiKey=132d64606ec0465082faadd12f45d6fe&pageSize=10&q=sciences"
  );

  const data2 = await res2.json();

  return {
    topNews: data1,
    allNews: data2,
  };
};

export default Index;
