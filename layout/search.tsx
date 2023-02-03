import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import { IconButton } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: 100,
    backgroundColor: 'rgba(241,204,215,0.7)',
    '&:hover': {
        backgroundColor: 'rgba(241,204,215,0.8)',
    },
    marginRight: theme.spacing(2),
    maxWidth: '50%',
    marginLeft: theme.spacing(2),
    width: 'auto',
    justifyContent: 'flex-end'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        color: 'darkred'
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
            <StyledInputBase
                value={value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton color='primary' sx={{
                m: '0 0.5px 0 1px'
            }} rel='noreferrer' target='_blank' href={`https://www.google.com/search?q=site:newhongqi.org ${value}`}>
                <SearchIcon />
            </IconButton>
        </Search>
    )
}

export default LayoutSearch
