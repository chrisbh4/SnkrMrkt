import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignupFormPage';
import SearchBar from '../SearchBar/SearchBar';
import { login } from '../../store/session';
import SlideOutCart from '../Cart/slideout-cart';
import { purchaseFromCart } from "../../store/shoppingCart";
import MyChakra from '../SignupFormPage/chakra';
import * as sessionActions from '../../store/session';

import './Navigation.css';
import { Box, Menu, MenuButton, MenuItem,Button, MenuList } from '@chakra-ui/react';

function Navigation({isLoaded}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const grabAllShoes = useSelector(state => state.shoes)

  // const [query, setQuery] = useState("");

  const demoLogin = () => {
    let credential = 'demo@user.io'
    let password = 'password'
    navigate('/home')
    return dispatch(login({ credential, password }))
  }

  const logout = async (e) => {
    e.preventDefault();
    //Clears cart but need to figure out a way to clear cart for other users but leaves cart for logged out user
    dispatch(purchaseFromCart());
    dispatch(sessionActions.logout());
    navigate('/')
  };

// Semver
// small = patch
// mid = minor change


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Box className="nav-logged-in">
        {/* need to change classname */}
        <Box className="web-title">
          <a href="/home" id="web-title-redirect">
            SNKR Market
          </a>

        </Box>


        <Box id="search-bar-container">
          <SearchBar shoes={grabAllShoes} />
        </Box>

        <Box className="nav-control-btns">
            <NavLink exact to="/home">
            <button className="nav-button">
              Home
            </button>
          </NavLink>

          <NavLink to="/shoes/new">
            <button className="nav-button">
              Sell a Snkr
            </button>
          </NavLink>
          <NavLink to="/profile">
            <button className="nav-button">
              Profile
            </button>
          </NavLink>

          <Box >
            <Button onClick={logout}>Log out</Button>
          </Box>


          <Box mr='30px'  >
          <SlideOutCart />
          </Box>

          {/* <Box >
            <ProfileButton user={sessionUser} />
          </Box> */}







        </Box>
      </Box>

    );
  } else {
    sessionLinks = (
      <Box className="nav-logged-out">
        <Box className="web-title-logged-out">
          <a href="/" id="web-title-redirect">
            The Plug
          </a>
        </Box>

        <button className="nav-button">
          <LoginFormModal />
        </button>

        <button className="nav-button">
          <SignUpModal />
        </button>

        <button>
          <MyChakra/>
          </button>

        <button className="nav-button" onClick={demoLogin} >
          Demo
        </button>

        <NavLink exact to="/home">
          <button className="nav-button">
            All Shoes
          </button>
        </NavLink>

        <NavLink exact to="/">
          <button className="nav-button">
            Home
          </button>
        </NavLink>
      </Box>
    );
  }

  return (
    <nav >
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
