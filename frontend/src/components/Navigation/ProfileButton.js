import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import { purchaseFromCart } from '../../store/shoppingCart'

import { Menu, MenuButton, MenuItem, Button, MenuList, Text } from '@chakra-ui/react'

function ProfileButton ({ user }) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  // IF true then the menu will open
  // IF false then the menu will close
  //* Bug is coming from the setShowMenu not being switched from false -> true
  useEffect(() => {
    if (!showMenu) return
    const closeMenu = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu)
    // return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  const logout = async (e) => {
    e.preventDefault()
    // Clears cart but need to figure out a way to clear cart for other users but leaves cart for logged out user
    dispatch(purchaseFromCart())
    dispatch(sessionActions.logout())
    navigate('/')
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button}>
          <i className='fas fa-user-circle' style={{ fontSize: '15px', marginTop: '4px' }} />
        </MenuButton>
        <MenuList>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <MenuItem><button className='logout-button' onClick={logout}>Log Out</button></MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default ProfileButton
