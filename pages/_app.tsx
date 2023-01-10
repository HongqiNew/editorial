import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app'
import React, { useEffect, useMemo, useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import LayoutLoading from '../layout/loading';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery, createTheme } from '@mui/material';
import LayoutBar from '../layout/bar';

function App({ Component, pageProps }: AppProps) {
  const [isDarkModeButtonEnabled, setIsDarkModeButtonEnabled] = useState(undefined);
  // 是否开启按钮
  const isSystemDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
  // 是否开启系统
  const [shouldBeDarkMode, setShouldBeDarkMode] = useState(isSystemDarkModeEnabled);
  // 是否应该开启夜间模式
  useEffect(() => {
    setShouldBeDarkMode(isDarkModeButtonEnabled ?? isSystemDarkModeEnabled);
    // 如果用户没有设置，则使用系统设置。
  }, [isDarkModeButtonEnabled, isSystemDarkModeEnabled]);
  const theme = useMemo(() => (
    createTheme({
      typography: {
        fontFamily: 'tongyong',
      },
      palette: {
        mode: shouldBeDarkMode ? 'dark' : 'light',
      },
    })
  ),
    [shouldBeDarkMode],
  );

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GoogleAnalytics />
        <LayoutLoading></LayoutLoading>
        <LayoutBar setDark={setIsDarkModeButtonEnabled}></LayoutBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App;
