import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from '../SearchBar/index.js'
import { login } from '../../store/session'
import SlideOutCart from '../Cart/slideout-cart'
import { purchaseFromCart } from '../../store/shoppingCart'
import LoginForm from '../LoginFormPage/LoginForm'
import * as sessionActions from '../../store/session'

import './Navigation.css'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import NewShoeModalForm from '../Shoes/NewShoesForm/modalForm'
import NavBtnSignUpForm from '../SignupFormPage/NavButton'

function Navigation ({ isLoaded }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const grabAllShoes = useSelector(state => state?.shoes)

  const demoLogin = () => {
    const credential = 'demo@user.io'
    const password = 'password'
    navigate('/home')
    return dispatch(login({ credential, password }))
  }

  const logout = async (e) => {
    e.preventDefault()
    dispatch(sessionActions.logout())
    navigate('/')
  }

  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <Box bg='#24292e' height='100px' display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <a href='/home' id='web-title-redirect'>
            <Image src='https://imgur.com/KOgkPYD.png' boxSize='100px' />
          </a>
        </Box>
        <Box w='25%'>
          <SearchBar shoes={grabAllShoes} />
        </Box>

        <Flex justify='center' pr='20px'>
          <NavLink exact to='/home'>
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
              _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            >
              Home
            </Button>
          </NavLink>

          <Box>

            <NewShoeModalForm />
          </Box>

          <NavLink to='/profile'>
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
              _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            >
              Profile
            </Button>
          </NavLink>

          <Box>
            <Button
              onClick={logout}
              color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
              _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            >Log out
            </Button>
          </Box>

          <Box ml='10px' mr='30px'>
            <SlideOutCart />
          </Box>

          {/* <Box >
            <ProfileButton user={sessionUser} />
          </Box> */}
        </Flex>
      </Box>

    )
  } else {
    sessionLinks = (
      <Box bg='#24292e' height='100px' display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <a href='/'>
            <Image src='https://imgur.com/KOgkPYD.png' boxSize='100px' />
          </a>
        </Box>

        <Box marginRight='21%'>
          <LoginForm />
          <NavBtnSignUpForm />
          <Button
            color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
            _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            onClick={demoLogin}
          >
            Demo
          </Button>
          <NavLink exact to='/'>
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
              _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            >
              Home
            </Button>
          </NavLink>
          <NavLink exact to='/home'>
            <Button
              color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
              _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
            >
              All Shoes
            </Button>
          </NavLink>
        </Box>
      </Box>
    )
  }

  return (
    <nav>
      {isLoaded && sessionLinks}
    </nav>
  )
}

export default Navigation
