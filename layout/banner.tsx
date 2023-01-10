import { Box, Toolbar } from "@mui/material"

type LayoutBannerProps = {
    cover?: string
}

const LayoutBanner = ({ cover }: LayoutBannerProps) => {
    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'darkred',
            textAlign: 'center',
        }}>
            {
                cover
                    ?
                    <Box sx={{
                        width: '100%',
                        maxHeight: 200,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img alt='Banner' src={cover} width='100%'></img>
                    </Box>
                    :
                    <>
                        <Toolbar></Toolbar>
                        <img alt='《新红旗》Banner' src='/imgs/logo.webp' style={{ maxWidth: '80%', height: 'auto', maxHeight: 108 }}></img>
                    </>
            }
        </Box>
    )
}

export default LayoutBanner
