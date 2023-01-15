import { Box, CssBaseline, Toolbar } from '@mui/material'
import LayoutFooter from './footer'
import LayoutHead from './head'

type LayoutProps = {
    children: React.ReactNode
    title: string
    description?: string
    cover?: string
}

const Layout = ({ children, title, description, cover }: LayoutProps) => {
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
                        minHeight: 'calc(100vh - 78px)',
                    }}
                >
                    <Box sx={{
                        minHeight: 'calc(100vh - 78px)'
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
