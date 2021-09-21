import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignupFormPage';
import { login } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const demoLogin = ()=>{
    let credential = 'demo@user.io'
    let password = 'password'
    return dispatch(login({credential, password}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-logged-in">
        {/* need to change classname */}
         <button className="nav-profile-button">
              <NavLink to="/cart">
              <i className="fas fa-shopping-cart"></i>
              </NavLink>
        </button>

        <div className="nav-profile-button">
          <ProfileButton user={sessionUser} />
        </div>

        <button className="nav-button" >
          <NavLink to="/about">About</NavLink>
          </button>

        <button className="nav-button">
          <NavLink to="/shoes/new">New Shoe</NavLink>
        </button>

        <button className="nav-button">
          <NavLink exact to="/">Home</NavLink>
        </button>


      </div>

    );
  } else {
    sessionLinks = (
      <div className="nav-logged-in">

        <button className="nav-button" onClick={demoLogin} >Demo</button>

        <button className="nav-button">
          <LoginFormModal />
        </button>

        <button className="nav-button">
          <SignUpModal />
        </button>

        <button className="nav-button">
          <NavLink to="/about">About Page</NavLink>
          </button>

        <button className="nav-button">
          <NavLink exact to="/">Home</NavLink>
        </button>

      </div>
    );
  }

  return (
    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //     <NavLink to="/shoes/new">New Shoe</NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
      <nav >
        {isLoaded && sessionLinks}
      </nav>
    //   {/* <button className="nav-button">
    //   <NavLink to="/shoes/new">New Shoe</NavLink>
    // </button>
    // <button className="nav-button">
    //   <NavLink exact to="/">Home</NavLink>
    // </button> */}




  );
}

export default Navigation;
