import * as React from "react";
import styles from "./heading.module.css";

const Heading = (props) => {
  return (
    <div className={styles.headingWrapper}>
      <h2 className={styles.heading}>{props.title}</h2>
      <div className={styles["tile-line"]} />
    </div>
  );
};

export { Heading };
export default Heading;
