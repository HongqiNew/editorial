import { Box, IconButton, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const LayoutFooter = () => {
    return (
        <footer>
            <Box sx={{
                width: '100%',
                bgcolor: 'rgba(255,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                p: '15px 0px',
                color: 'white',
                minHeight: 76,
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
                <br></br>
                <Typography>采用 CC BY-SA 4.0 发布<br></br>联系邮箱: tech@newhongqi.org</Typography>
            </Box>
        </footer>
    )
}

export default LayoutFooter;
