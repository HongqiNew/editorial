import { Box, LinearProgress } from '@mui/material'
import router from 'next/router'
import { useEffect, useState } from 'react'

const LayoutLoading = () => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsLoading(true))
        router.events.on('routeChangeComplete', () => setIsLoading(false))
        router.events.on('routeChangeError', () => setIsLoading(false))
    }, [])
    return (
        <Box sx={{ position: 'fixed', top: 0, zIndex: 10000, width: '100%' }}>
            <LinearProgress sx={{ display: isLoading ? undefined : 'none' }} color='primary' />
            <br></br>
        </Box>
    )
}

export default LayoutLoading
