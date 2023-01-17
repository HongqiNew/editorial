import { useUser } from '@auth0/nextjs-auth0'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import WestIcon from '@mui/icons-material/West'
import Link from 'next/link'
import LayoutSearch from './search'
import router from 'next/router'
import useMode from '../utils/theme'
import Image from 'next/image'
import Logo from './logo.png'
import Categories from '../components/categories'

type LayoutBarProps = {
    toggle: () => void
}

const categories = ['时事', '思想', '杂谈', '历史', '论坛', '文艺']
const categoriesMd = categories.map(category => ({ text: category, href: `/tag/${category}` }))

const LayoutBar = ({ toggle }: LayoutBarProps) => {
    const user = useUser().user
    const mode = useMode()

    return (
        <AppBar
            position='fixed'
            sx={{
                width: '100%',
                boxShadow: 'none',
                height: 64,
                backdropFilter: 'blur(50px)',
                backgroundColor: mode === 'dark' ? 'rgba(28,28,28,0.9)' : 'rgba(255,255,255,0.9)'
            }}
            color='transparent'
        >
            <Toolbar>
                <Box sx={{ flexGrow: 0.15 }} />
                <IconButton sx={{ mr: 2 }} onClick={() => router.back()}>
                    <WestIcon></WestIcon>
                </IconButton>
                <Link href='/' style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Image width={73} height={28} quality={100} alt='logo' src={Logo}></Image>
                </Link>
                <Box sx={{ flexGrow: 0.25 }}></Box>

                <Box sx={{ flexGrow: 0.4, display: { xs: 'none', md: 'flex' } }}>
                    {categories.map((category) => (
                        <Button
                            size='large'
                            key={category}
                            onClick={() => { router.push(`/tag/${category}`) }}
                            sx={{ display: 'block', fontWeight: 'bold' }}
                            color='secondary'
                        >
                            {category}
                        </Button>
                    ))}
                </Box>

                <LayoutSearch></LayoutSearch>
                <Categories sx={{ display: { md: 'none' }, }} items={categoriesMd}></Categories>
                <IconButton onClick={toggle}>
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                    onClick={user ? () => router.push('/api/auth/logout') : () => router.push('/api/auth/login')}
                >
                    {
                        user
                            ?
                            <Image width={24} height={24} src={user.picture as string} alt='avatar' style={{
                                borderRadius: 50,
                                maxHeight: 24,
                                width: 'auto'
                            }}></Image>
                            :
                            <AccountCircleIcon />
                    }
                </IconButton>
                <Box sx={{ flexGrow: 0.2 }} />
            </Toolbar>
        </AppBar>
    )
}

export default LayoutBar
