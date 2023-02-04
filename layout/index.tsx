import { Box, CssBaseline } from '@mui/material'
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
    const vh = use100vh()
    const minHeight = vh ? vh - 140 : 'calc(100vh - 140px)'
    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <LayoutHead title={title} description={description} cover={cover}></LayoutHead>
            <CssBaseline />
            <Box component='main' sx={{
                width: '100%',
                minHeight,
                pl: noPadding ? {} : { xs: '12%', sm: '18%', md: '20%' },
                pr: noPadding ? {} : { xs: '12%', sm: '18%', md: '20%' }
            }}>
                <br></br>
                {children}
            </Box>
            <LayoutFooter></LayoutFooter>
        </Box>
    )
}

export default Layout
