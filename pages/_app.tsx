import { ThemeProvider } from "styled-components";
import Context from "lib/store/context";
import { reducer } from "lib/store/reducer";
import { useEffect, useState, useReducer } from "react";
import { AppProps } from "next/app";
import BaseLayout from "components/layouts/Base";
import VanillaLayout from "components/layouts/Vanilla";
import Meta from "components/Meta";

import { lightTheme, darkTheme, GlobalStyle } from "lib/styled/themes";

export default function App({ Component, pageProps }: AppProps) {
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

  let WrapLayout;

  switch (pageProps.layout) {
    case "Base":
      WrapLayout = BaseLayout;
      break;
    case "Vanilla":
      WrapLayout = VanillaLayout;
      break;
    default:
      WrapLayout = BaseLayout;
  }

  const body = (
    <>
      <Meta title={pageProps.title} description={pageProps.description} />
      <Context.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <WrapLayout>
            <Component {...pageProps} />
          </WrapLayout>
        </ThemeProvider>
      </Context.Provider>
    </>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
}
