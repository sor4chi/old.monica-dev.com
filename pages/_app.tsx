import { ThemeProvider } from "styled-components";
import Context from "lib/store/context";
import { reducer } from "lib/store/reducer";
import { useEffect, useState, useReducer } from "react";

import { lightTheme, darkTheme, GlobalStyle } from "lib/styled/themes";

export default function App({ Component, pageProps }: any) {
  const initialState = {
    isDarkMode: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localStorageIsDarkMode =
      localStorage.getItem("isDarkMode") === "true";
    console.log("localStorageIsDarkMode", localStorageIsDarkMode);
    dispatch({ type: "SET_DARK_MODE", isDarkMode: localStorageIsDarkMode });
  }, []);

  const body = (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Context.Provider>
    </>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
}
