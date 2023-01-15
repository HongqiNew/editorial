import { Box, IconButton, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import Image from 'next/image'
import Logo from './logo.png'

const LayoutFooter = () => {
    return (
        <footer>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: '10px 0px',
                minHeight: 76,
            }}>
                <Box sx={{ flexGrow: 0.3 }}></Box>
                <Box sx={{ width: 300 }}>
                    <Typography sx={{ textAlign: 'center' }}>CC BY-SA 4.0 | tech@newhongqi.org</Typography>
                </Box>
                <Box sx={{ flexGrow: 0.2 }}></Box>
                <Box>
                    <Image alt='logo' src={Logo} height={25} width={60}></Image>
                </Box>
                <Box sx={{ flexGrow: 0.2 }}></Box>
                <Box sx={{
                    width: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <IconButton target='_blank' rel='noreferrer' href='/art/24'>
                        <LocalAtmIcon></LocalAtmIcon>
                    </IconButton>
                    <IconButton target='_blank' rel='noreferrer' href='https://twitter.com/newhongqi'>
                        <TwitterIcon></TwitterIcon>
                    </IconButton>
                    <IconButton target='_blank' rel='noreferrer' href='https://t.me/NewHongqi' >
                        <TelegramIcon></TelegramIcon>
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 0.3 }}></Box>
            </Box>
        </footer>
    )
}

export default LayoutFooter
