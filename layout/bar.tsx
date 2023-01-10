import { useUser } from "@auth0/nextjs-auth0";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, useTheme } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WestIcon from '@mui/icons-material/West';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import LayoutSearch from "./search";
import router from "next/router";

type LayoutBarProps = {
    setDark: Dispatch<SetStateAction<any>>
}

const categories = ['时事', '思想', '杂谈', '历史', '论坛', '文艺'];

const LayoutBar = ({ setDark }: LayoutBarProps) => {
    const user = useUser().user;
    const theme = useTheme();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const redirect = (tag: string) => {
        router.push(`/tag/${tag}`)
    }
    const Menu = () => (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
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

    const toggle = () => {
        setIsMenuOpen(open => !open);
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: '100%',
                backdropFilter: 'blur(2px)'
            }}
            color='transparent'
        >
            <Toolbar>
                <IconButton sx={{ mr: 2 }} onClick={() => router.back()}>
                    <WestIcon htmlColor='pink'></WestIcon>
                </IconButton>
                <Link href='/'>
                    <img width={80} height={30} alt='《新红旗》缩小 Logo' style={{
                        minHeight: 30,
                        width: 'auto',
                    }} src='/imgs/smalllogo.webp'></img>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <LayoutSearch></LayoutSearch>
                <IconButton onClick={toggle}>
                    <MenuIcon htmlColor='pink' />
                </IconButton>
                <IconButton onClick={() => { setDark((value: any) => !Boolean(value)) }}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon htmlColor='pink' /> : <Brightness4Icon htmlColor='pink' />}
                </IconButton>
                <IconButton
                    size='large'
                    onClick={user ? () => router.push('/api/auth/logout') : () => router.push('/api/auth/login')}
                >
                    {
                        user
                            ?
                            <img src={user.picture as string} style={{
                                borderRadius: 50,
                                maxHeight: 48,
                                width: 'auto'
                            }}></img>
                            :
                            <AccountCircleIcon htmlColor='pink' />
                    }
                </IconButton>
            </Toolbar>

            <Drawer open={isMenuOpen} onClose={toggle} anchor='top'>
                <Menu />
            </Drawer>
        </AppBar>
    );
}

export default LayoutBar;
