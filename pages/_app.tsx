import { ThemeProvider } from "styled-components";
import Context from "lib/store/context";
import { reducer } from "lib/store/reducer";
import { useReducer } from "react";

import { lightTheme, darkTheme, GlobalStyle } from "lib/styled/themes";

export default function App({ Component, pageProps }: any) {
  const initialState = {
    isDarkMode: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Context.Provider>
    </>
  );
}
