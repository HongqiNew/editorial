import { Alert, Snackbar, Typography, TextField, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import SendIcon from '@mui/icons-material/Send';
import post from "../utils/api"

type CommentInputProps = {
    errorChecker?: (value: string) => boolean
    url: string
    value: string
    setValue: React.Dispatch<any>
    body?: Object
    [key: string]: any
}

const CommentInput = (props: CommentInputProps) => {
    const [isDisabled, setIsDisabled] = React.useState(false);
    useEffect(() => {
        setIsDisabled(props.errorChecker ? props.errorChecker(props.value) : false);
    }, []);

    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        props.setValue(value);
        setIsDisabled(props.errorChecker ? props.errorChecker(value) : false);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const send = async () => {
        setIsDisabled(true);
        const success = await post(`${props.url}`, Object.assign({ value: props.value }, props.body));
        setSuccess(success);
        setOpen(true);
        if (success) {
            props.setValue('');
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);
        }
    }

    return (
        <>
            <Typography color='#7d7d7d'>
                {props.description}
            </Typography>
            <TextField
                {...props}
                variant='filled'
                fullWidth
                multiline
                value={props.value}
                onChange={handleChange}
            />
            <IconButton sx={{ float: 'right' }} onClick={send} disabled={isDisabled ? true : false}><SendIcon></SendIcon></IconButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={
                    success ? 'success' : 'error'
                } sx={{ width: '100%' }}>
                    {success ? '已经送出。' : '失败了。'}
                </Alert>
            </Snackbar>
            <br></br><br></br>
        </>
    )
}

export default CommentInput;