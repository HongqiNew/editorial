import { Alert, Snackbar, Typography, IconButton, Box, Link } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send'
import post from '../utils/api'
import useMode from '../utils/theme'

type CommentInputProps = {
    errorChecker?: (value: string) => boolean
    url: string
    value: string
    setValue: React.Dispatch<any>
    body?: Object
    [key: string]: any
}

const CommentInput = (props: CommentInputProps) => {
    const [isDisabled, setIsDisabled] = React.useState(false)
    useEffect(() => {
        setIsDisabled(props.errorChecker ? props.errorChecker(props.value) : false)
    }, [props])

    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        props.setValue(value)
        setIsDisabled(props.errorChecker ? props.errorChecker(value) : false)
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const send = async () => {
        setIsDisabled(true)
        const success = await post(`${props.url}`, Object.assign({ value: props.value }, props.body))
        setSuccess(success)
        setOpen(true)
        if (success) {
            props.setValue('')
            setIsDisabled(true)
        }
        else {
            setIsDisabled(false)
        }
    }

    const mode = useMode()

    return (
        <>
            <Typography color='#7d7d7d'>
                {props.description}
            </Typography>
            <Box
                sx={{
                    backgroundColor: mode === 'dark' ? 'rgb(28,28,28)' : 'white',
                    width: '100%',
                    borderRadius: 6,
                    p: '5px 5px 5px 5px'
                }}
            >
                <textarea
                    {...props}
                    style={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: 100,
                        resize: 'none',
                        fontSize: 15,
                        border: 'none',
                        outline: 'none',
                    }}
                    value={props.value}
                    onChange={handleChange}
                >
                </textarea>
            </Box>
            <Box sx={{
                display: 'flex',
            }}>
                <Typography sx={{ opacity: 0.3 }}>
                    对本文评论请使用 <Link href='/art/2' target='_blank' rel='noreferrer'>Markdown</Link> 语法。如果你不知道什么是 Markdown，请直接键入你的评论即可。<Link href='https://pandao.github.io/editor.md/' target='_blank' rel='noreferrer'>这里</Link>有一个在线 Markdown 编辑器，它的界面有中文翻译且完全<Link href='https://github.com/pandao/editor.md' target='_blank' rel='noreferrer'>开源</Link>。
                </Typography>
                <Box sx={{ width: '50%' }}></Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <IconButton sx={{ float: 'right' }} onClick={send} disabled={isDisabled ? true : false}><SendIcon color='primary'></SendIcon></IconButton>
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={
                    success ? 'success' : 'error'
                } sx={{ width: '100%' }}>
                    {success ? '已发布。' : '失败了。'}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CommentInput