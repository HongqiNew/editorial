import { Menu as MaterialMenu, MenuItem, ListItemIcon, ListItemText, SvgIconTypeMap, IconButton, SxProps, Theme } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import router from 'next/router'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

type MenuProps = {
    items: { text: string, icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>, href?: string, onClick?: Function }[]
    sx?: SxProps<Theme>
}

const Categories = ({ items, sx }: MenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <IconButton onClick={handleClick} sx={sx}>
                <MenuIcon></MenuIcon>
            </IconButton>
            <MaterialMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    items.map(item => (
                        <MenuItem
                            key={item.text}
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick()
                                }
                                else if (item.href) {
                                    router.push(item.href)
                                }
                            }}>
                            {
                                item.icon
                                    ?
                                    <ListItemIcon><item.icon></item.icon></ListItemIcon>
                                    :
                                    <></>
                            }
                            <ListItemText>
                                {item.text}
                            </ListItemText>
                        </MenuItem>
                    ))
                }
            </MaterialMenu>
        </>
    )
}

export default Categories
