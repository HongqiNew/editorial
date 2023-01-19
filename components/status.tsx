import { Box, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import Layout from '../layout'

type StatusProps = {
    status: string
    text: string
}

const Status = ({ status, text }: StatusProps) => (
    <Layout title={status} noPadding>
        <Box sx={{
            width: '100%',
            height: 'calc(100vh - 176px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Paper sx={{
                position: 'relative',
                p: 2,
                width: '80%',
                height: '60%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image src='/favicon-32x32.png' width={40} height={40} alt='红旗' style={{
                    position: 'absolute',
                    left: 10,
                    top: -32
                }}></Image>
                <Box>
                    <Typography textAlign='center' variant='h2' sx={{
                        fontFamily: 'comic sans ms',
                    }}>
                        {status}
                    </Typography>
                    <Typography textAlign='center' sx={{
                        fontFamily: 'comic sans ms',
                        fontWeight: 'bolder'
                    }}>
                        {text}
                    </Typography>
                </Box>
                <Typography variant='h2' sx={{
                    fontFamily: 'comic sans ms',
                }}>｜</Typography>
                <Typography variant='body2' sx={{
                    fontWeight: 'bold'
                }}>
                    点击左上角的箭头返回<br></br>或点击“新红旗”回到首页。
                </Typography>
            </Paper>
        </Box>
    </Layout>
)

export default Status
