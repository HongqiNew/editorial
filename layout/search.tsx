import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import { IconButton } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255,192,203,0.6)',
    '&:hover': {
        backgroundColor: 'rgba(255,192,203,0.7)',
    },
    marginRight: theme.spacing(2),
    maxWidth: '50%',
    marginLeft: theme.spacing(2.5),
    width: 'auto',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'pink',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}))

const LayoutSearch = () => {
    const [value, setValue] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            window.open(`https://www.google.com/search?q=site:newhongqi.org ${value}`, '_blank')
        }
    }
    return (
        <Search>
            <IconButton sx={{
                m: '0 0.5px 0 1px'
            }} rel='noreferrer' target='_blank' href={`https://www.google.com/search?q=site:newhongqi.org ${value}`}>
                <SearchIcon htmlColor='pink' />
            </IconButton>
            <StyledInputBase
                value={value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default LayoutSearch
