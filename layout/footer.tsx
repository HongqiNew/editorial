import { IconButton, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import PublicIcon from '@mui/icons-material/Public'
import GitHubIcon from '@mui/icons-material/GitHub'
import MastodonIcon from 'mdi-material-ui/Mastodon'
import Image from 'next/image'
import Logo from './logo.png'
import CCIcon from 'mdi-material-ui/ClosedCaption'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import { age, isAnniversary } from '../utils/anniversary'

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
                width: '100vw',
                p: '10px 0px',
                minHeight: 76,
            }}>
                <Grid {...gridItemProps} color='primary'>
                    <Typography color='primary' sx={{
                        fontFamily: '"comic sans ms", "Garamond", monospace',
                        whiteSpace: 'nowrap',
                    }}>
                        CC BY-SA 4.0
                    </Typography>
                    <IconButton color='primary' target='_blank' rel='noreferrer' href='https://creativecommons.org/licenses/by-sa/4.0/' >
                        <CCIcon></CCIcon>
                    </IconButton>
                </Grid>

                <Grid {...gridItemProps}>
                    <Typography fontStyle='italic' color='primary' sx={{
                        display: { xs: 'none', sm: 'inline' },
                        fontFamily: '"comic sans ms", "Garamond", monospace',
                        mr: 1,
                    }}>{isAnniversary ? `${age}-year-old` : ''}</Typography>
                    <Image alt='logo' src={Logo} height={25} width={60}></Image>
                </Grid>

                <Grid {...gridItemProps}>
                    <IconButton color='primary' title='新红旗—球事论坛' target='_blank' href='https://internationalcommunism.com/list/?author=%E6%96%B0%E7%BA%A2%E6%97%97'>
                        <PublicIcon></PublicIcon>
                    </IconButton>
                    <IconButton color='primary' target='_blank' rel='noreferrer' href='https://github.com/HongqiNew/'>
                        <GitHubIcon></GitHubIcon>
                    </IconButton>
                    <IconButton color='primary' target='_blank' rel='noreferrer' href='https://twitter.com/newhongqi'>
                        <TwitterIcon></TwitterIcon>
                    </IconButton>
                    <IconButton color='primary' target='_blank' rel='me' href='https://newsie.social/@newhongqi' >
                        <MastodonIcon></MastodonIcon>
                    </IconButton>
                    <IconButton color='primary' target='_blank' rel='noreferrer' href='https://t.me/NewHongqi' >
                        <TelegramIcon></TelegramIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </footer>
    )
}

export default LayoutFooter
