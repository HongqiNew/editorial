import { Box, IconButton, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import Image from 'next/image'
import Logo from './logo.png'
import Link from 'next/link'

const LayoutFooter = () => {
    return (
        <footer>
            <Box sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                p: '10px 0px',
                minHeight: 76,
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant='body2'>
                        CC BY-SA 4.0<Link href='/art/47' style={{ fontStyle: 'italic', marginRight: 10 }}>关于</Link>
                        <br></br>
                        tech@newhongqi.org
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image alt='logo' src={Logo} height={25} width={60}></Image>
                </Box>

                <Box sx={{
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

            </Box>
        </footer>
    )
}

export default LayoutFooter
