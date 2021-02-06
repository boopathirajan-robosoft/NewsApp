import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoIcon, searchIcon } from "./../../assets/icons";
import styles from "./header.module.css";
import { debounce } from "./../../utils";

const Header = () => {
  const router = useRouter();
  const inputRef = React.useRef();
  const [searchValue, setSearchValue] = React.useState("");

  const onInputChange = (e) => {
    setSearchValue(inputRef.current.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") router.push(`/search?q=${searchValue}`);
  };

  return (
    <header className={styles["na-header-wrapper"]}>
      <div className={styles["na-header-block"]}>
        <div className={styles["na-logo-block"]}>
          <Link href="/">{logoIcon()}</Link>
        </div>
        <div className={styles["na-nav-block"]}>
          <div className={styles["na-nav-items"]}>
            <div
              className={styles["na-nav"]}
              active={router.pathname === "/" ? "true" : "false"}
            >
              <Link href="/">
                <span>
                  <a className={styles["na-nav-item"]}>Home</a>
                  <div className={styles["na-bar"]} />
                </span>
              </Link>
            </div>
            <div
              className={styles["na-nav"]}
              active={router.pathname === "/bookmarks" ? "true" : "false"}
            >
              <Link href="/bookmarks">
                <span>
                  <a className={styles["na-nav-item"]}>Bookmarks</a>
                  <div className={styles["na-bar"]} />
                </span>
              </Link>
            </div>
          </div>
          <div className={styles["na-nav-search-block"]}>
            <div>{searchIcon()}</div>
            <input
              ref={inputRef}
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              className={styles["na-search"]}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              value={searchValue}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
export default Header;
