import { ThemeProvider } from "styled-components";
import Context from "lib/store/context";
import { reducer } from "lib/store/reducer";
import { useEffect, useState, useReducer, ReactNode } from "react";
import Head from "next/head";

import { lightTheme, darkTheme, GlobalStyle } from "lib/styled/themes";

const Providers = ({ children }: { children: ReactNode }) => {
  const initialState = {
    isDarkMode: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localStorageIsDarkMode =
      localStorage.getItem("isDarkMode") === "true";
    dispatch({ type: "SET_DARK_MODE", isDarkMode: localStorageIsDarkMode });
  }, []);

  const body = (
    <>
      <Head>
        <meta
          name="theme-color"
          content={
            state.isDarkMode
              ? darkTheme.colors.background
              : lightTheme.colors.background
          }
        />
      </Head>
      <Context.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </Context.Provider>
    </>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default Providers;
