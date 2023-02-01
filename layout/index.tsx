import { Box, CssBaseline, Toolbar } from '@mui/material'
import { use100vh } from 'react-div-100vh'
import LayoutFooter from './footer'
import LayoutHead from './head'

type LayoutProps = {
    children: React.ReactNode
    title: string
    description?: string
    cover?: string
    noPadding?: boolean
}

const Layout = ({ children, title, description, cover, noPadding }: LayoutProps) => {
    const height = use100vh()
    const minHeight = height ? height - 78 : 'calc(100vh - 78px)'
    return (
        <>
            <LayoutHead title={title} description={description} cover={cover}></LayoutHead>
            <Box sx={{
                display: 'flex',
                overflowX: 'hidden',
            }}>
                <CssBaseline />
                <Box
                    component='main'
                    sx={{
                        width: '100%',
                        minHeight,
                        pl: noPadding ? {} : { xs: '12%', sm: '18%', md: '20%' },
                        pr: noPadding ? {} : { xs: '12%', sm: '18%', md: '20%' }
                    }}
                >
                    <Box sx={{
                        minHeight
                    }}>
                        <Toolbar></Toolbar>
                        <br></br>
                        {children}
                    </Box>
                    <LayoutFooter></LayoutFooter>
                </Box>
            </Box>
        </>
    )
}

export default Layout
