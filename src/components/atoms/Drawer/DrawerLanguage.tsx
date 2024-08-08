import React, { useState, ReactNode, MouseEvent } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import i18next from 'i18next'
import { EnIcon } from '../Icons/EnIcon'
import { VIIcon } from '../Icons/VIIcon'

interface CustomDrawerProps {
  menuItems: Array<{ text: string; onClick: () => void }>
  children?: ReactNode
}

const DrawerLanguage: React.FC<CustomDrawerProps> = ({ menuItems, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const currentLanguage = i18next.language

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getLanguageIcon = () => {
    switch (currentLanguage) {
      case 'en':
        return <EnIcon />
      case 'vi':
        return <VIIcon />
    }
  }

  return (
    <div>
      <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMenuOpen}>
        {getLanguageIcon()}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 50 * 4.5,
            width: '14ch',
            borderRadius: '1rem',
            marginTop: '0.5rem'
          }
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick()
              handleMenuClose()
            }}
          >
            {item.text}
          </MenuItem>
        ))}
        {children}
      </Menu>
    </div>
  )
}

export default DrawerLanguage
