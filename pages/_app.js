import * as React from "react";
import "../styles.css";

export const mainContext = React.createContext({});
export default function MyApp({ Component, pageProps }) {
  const [contextData, setContextData] = React.useState({
    newsUrl: "",
    bookMarkData: [],
  });
  const contextProps = { contextData, setContextData };

  return (
    <mainContext.Provider value={contextProps}>
      <Component {...pageProps} />
    </mainContext.Provider>
  );
}
