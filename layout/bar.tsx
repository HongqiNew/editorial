import { useUser } from '@auth0/nextjs-auth0'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import WestIcon from '@mui/icons-material/West'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import LayoutSearch from './search'
import router from 'next/router'
import useMode from '../utils/theme'
import Image from 'next/image'
import Logo from './logo.png'

type LayoutBarProps = {
    toggle: () => void
}

const categories = ['时事', '思想', '杂谈', '历史', '论坛', '文艺']

const LayoutBar = ({ toggle }: LayoutBarProps) => {
    const user = useUser().user
    const mode = useMode()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const redirect = (tag: string) => {
        router.push(`/tag/${tag}`)
    }
    const Menu = () => (
        <Box
            sx={{ width: 'auto' }}
            role='presentation'
            onClick={toggle}
        >
            <List>
                {categories.map(text => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => redirect(text)}>
                            <ListItemText primary={text} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const handleMenu = () => {
        setIsMenuOpen(open => !open)
    }

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
                <IconButton sx={{ mr: 2 }} onClick={() => router.back()}>
                    <WestIcon></WestIcon>
                </IconButton>
                <Link href='/'>
                    <Image width={75} height={28} alt='《新红旗》缩小 Logo' src={Logo}></Image>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <LayoutSearch></LayoutSearch>
                <IconButton onClick={toggle}>
                    <MenuIcon />
                </IconButton>
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
            </Toolbar>

            <Drawer open={isMenuOpen} onClose={handleMenu} anchor='top'>
                <Menu />
            </Drawer>
        </AppBar>
    )
}

export default LayoutBar
