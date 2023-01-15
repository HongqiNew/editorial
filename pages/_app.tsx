import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useMemo, useState } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import LayoutLoading from '../layout/loading'
import { ThemeProvider } from '@emotion/react'
import { useMediaQuery, createTheme } from '@mui/material'
import LayoutBar from '../layout/bar'

export const ColorModeContext = React.createContext('light')

function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  )
  const theme = useMemo(() => (
    createTheme({
      typography: {
        fontFamily: 'tongyong',
      },
      palette: {
        mode,
        primary: {
          main: 'rgb(176,26,1)',
          contrastText: '#000',
        },
        divider: 'grey',
        background: {
          default: mode === 'dark' ? 'rgb(20,20,20)' : 'rgb(245,245,245)',
          paper: mode === 'dark' ? 'black' : 'white'
        },
      },
    })
  ),
    [mode],
  )

  return (
    <UserProvider>
      <ColorModeContext.Provider value={mode}>
        <ThemeProvider theme={theme}>
          <GoogleAnalytics />
          <LayoutLoading></LayoutLoading>
          <LayoutBar toggle={colorMode.toggleColorMode}></LayoutBar>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserProvider>
  )
}

export default App
