import * as React from "react";
import { useRouter } from "next/router";
import { mainContext } from "./../../pages/_app";
import { bookMarkIcon } from "./../../assets/icons";
import styles from "./topnews.module.css";

const TopNews = (props) => {
  const raw = props;
  const {
    title = "",
    url = "",
    urlToImage: image = "",
    content = "",
    source: { name: newsName = "" } = {},
    isBook = false,
  } = props;
  const { contextData, setContextData } = React.useContext(mainContext);
  const isbook1 = contextData.bookMarkData.some((item) => item.title === title);
  const booked = isBook || isbook1;
  const [isBooked, setBookMark] = React.useState(booked);
  const [mount, setMount] = React.useState(false);

  const router = useRouter();
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
    <div className={styles["na-tn-block"]}>
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

export { TopNews };
export default TopNews;
