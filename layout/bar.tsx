import { useUser } from '@auth0/nextjs-auth0'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Button, IconButton, Switch, Toolbar } from '@mui/material'
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
import Menu from '../components/menu'
import Fireworks from '@fireworks-js/react'
import { isAnniversary } from '../utils/anniversary'

type LayoutBarProps = {
    toggle: () => void
}

const BAR_HEIGHT = 64
const CATEGORIES = ['时事', '思想', '杂谈', '历史', '论坛', '文艺']
const CATEGORIES_MENU = CATEGORIES.map(category => ({ text: category, href: `/tag/${category}` }))

const LayoutBar = ({ toggle }: LayoutBarProps) => {
    const user = useUser().user
    const mode = useMode()

    const [fireworksOn, setFireworksOn] = React.useState(true)

    const bgstyle = isAnniversary ? {
        background: mode === 'dark' ? 'rgba(0, 0, 0, 0) linear-gradient(to left, rgba(236, 72, 153, 0.9), rgba(59, 130, 246, 0.9)) repeat scroll 0% 0% / auto padding-box border-box' : 'rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgba(252, 165, 165, 0.9), rgba(253, 186, 116, 0.9)) repeat scroll 0% 0% / auto padding-box border-box'
    } : {
        bgcolor: mode === 'dark' ? 'rgba(28,28,28,0.9)' : 'rgba(255,255,255,0.9)'
    }
    return (
        <AppBar
            position='sticky'
            sx={{
                width: '100%',
                boxShadow: 'none',
                height: BAR_HEIGHT,
                backdropFilter: 'blur(50px)',
                ...bgstyle
            }}
            color='transparent'
        >
            <Toolbar>
                <Box sx={{ flexGrow: 0.15 }} />
                <IconButton color='primary' sx={{ mr: 2 }} onClick={() => router.back()}>
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
                    {CATEGORIES.map((category) => (
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
                {
                    isAnniversary
                        ?
                        <Switch
                            checked={fireworksOn}
                            onChange={event => {
                                setFireworksOn(event.target.checked)
                            }}
                        ></Switch>
                        :
                        <></>
                }
                <Menu sx={{ display: { md: 'none' }, }} items={CATEGORIES_MENU}></Menu>
                <IconButton color='primary' onClick={toggle}>
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                    color='primary'
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

            {
                isAnniversary && fireworksOn
                    ?
                    <Fireworks
                        style={{
                            width: '100%',
                            height: BAR_HEIGHT,
                            top: 0,
                            position: 'fixed',
                            pointerEvents: 'none'
                        }}
                    />
                    :
                    <></>
            }
        </AppBar>
    )
}

export default LayoutBar
