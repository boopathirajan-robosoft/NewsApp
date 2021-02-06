import * as React from "react";
import { useRouter } from "next/router";
import { bookMarkIcon } from "./../../assets/icons";
import styles from "./allnews.module.css";
import { mainContext } from "./../../pages/_app";

const NewsItems = ({ data }) => {
  const raw = data;
  const {
    title = "",
    url = "",
    urlToImage: image = "",
    content = "",
    source: { name: newsName = "" } = {},
    isBook = false,
  } = data;
  const router = useRouter();

  const { contextData, setContextData } = React.useContext(mainContext);
  const isbook1 = contextData.bookMarkData.some((item) => item.title === title);
  const booked = isBook || isbook1;
  const [isBooked, setBookMark] = React.useState(booked);
  const [mount, setMount] = React.useState(false);

  const onContentClick = (e) => {
    setContextData({ ...contextData, newsUrl: url });
    e.preventDefault();
    router.push("/details");
  };

  const onBookMarkClick = React.useCallback(() => {
    setBookMark(!isBooked);
  }, [isBooked]);

  React.useEffect(() => {
    setMount(true);
  }, []);

  React.useEffect(() => {
    if (mount) {
      const { bookMarkData } = contextData;
      if (!isBooked) {
        const removedData = bookMarkData.filter((item) => {
          return item.title !== title;
        });
        setContextData({ ...contextData, bookMarkData: removedData });
      } else {
        const data = { ...raw, isBook: true };

        setContextData({
          ...contextData,
          bookMarkData: [...bookMarkData, data],
        });
      }
    }
  }, [isBooked]);

  return (
    <div className={styles["na-news-item"]}>
      <div className={styles.imageBlock}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{title}</h3>
          <div
            onClick={onBookMarkClick}
            className={styles.bookMarkLogo}
            active={isBooked.toString()}
          >
            {bookMarkIcon()}
          </div>
        </div>
        <div className={styles.content}>{content}</div>
        <div onClick={onContentClick} className={styles.newsName}>
          {newsName}
        </div>
      </div>
    </div>
  );
};

const AllNews = (props) => {
  const { data } = props;

  return (
    <div className={styles.allNewsWrapper}>
      {data.map((item, index) => (
        <NewsItems key={`item-${index}`} data={item} index={index} />
      ))}
    </div>
  );
};

export { AllNews };
export default AllNews;
