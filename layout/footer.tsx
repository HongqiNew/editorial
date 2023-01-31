import { IconButton } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import GitHubIcon from '@mui/icons-material/GitHub'
import MastodonIcon from 'mdi-material-ui/Mastodon'
import Image from 'next/image'
import Logo from './logo.png'
import CC from './cc.png'
import Link from 'next/link'
import Grid from '@mui/material/Grid'

const LayoutFooter = () => {
    const gridItemProps = {
        item: true,
        sx: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        xs: 4
    }
    return (
        <footer>
            <Grid container sx={{
                width: '100%',
                p: '10px 0px',
                minHeight: 76,
            }}>
                <Grid {...gridItemProps} >
                    <Link href='/art/47' style={{ textDecorationLine: 'underline', marginRight: 3 }}>About</Link>|&nbsp;
                    <Link target='_blank' rel='noreferrer' href='https://creativecommons.org/licenses/by-sa/4.0/'><Image alt='CC' src={CC} style={{ marginTop: 8 }}></Image></Link>
                </Grid>

                <Grid {...gridItemProps}>
                    <Image alt='logo' src={Logo} height={25} width={60}></Image>
                </Grid>

                <Grid {...gridItemProps}>
                    <IconButton target='_blank' rel='noreferrer' href='https://github.com/HongqiNew/'>
                        <GitHubIcon></GitHubIcon>
                    </IconButton>
                    <IconButton target='_blank' rel='noreferrer' href='https://twitter.com/newhongqi'>
                        <TwitterIcon></TwitterIcon>
                    </IconButton>
                    <IconButton target='_blank' rel='me' href='https://newsie.social/@newhongqi' >
                        <MastodonIcon></MastodonIcon>
                    </IconButton>
                    <IconButton target='_blank' rel='noreferrer' href='https://t.me/NewHongqi' >
                        <TelegramIcon></TelegramIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </footer>
    )
}

export default LayoutFooter
