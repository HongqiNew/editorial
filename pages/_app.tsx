import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useMemo } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import LayoutLoading from '../layout/loading'
import { ThemeProvider } from '@emotion/react'
import { useMediaQuery, createTheme } from '@mui/material'
import LayoutBar from '../layout/bar'
import { grey } from '@mui/material/colors'

export const ColorModeContext = React.createContext('light')

function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const [mode, setMode] = React.useState<'light' | 'dark'>()
  useEffect(() => {
    setMode(prefersDarkMode)
  }, [prefersDarkMode])
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
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
          main: 'rgb(200,50,25)',
          contrastText: '#000',
        },
        secondary: { main: mode === 'dark' ? grey[100] : grey[900], contrastText: mode === 'dark' ? grey[900] : grey[100] },
        divider: mode === 'dark' ? '#3d3d40' : 'grey',
        background: {
          default: mode === 'dark' ? 'black' : 'rgb(245,245,245)',
          paper: mode === 'dark' ? 'rgb(28,28,28)' : 'white'
        },
      },
    })
  ),
    [mode],
  )

  return (
    <UserProvider>
      <ColorModeContext.Provider value={mode ?? prefersDarkMode}>
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
