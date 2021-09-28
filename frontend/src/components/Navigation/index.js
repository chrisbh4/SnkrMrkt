import React from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignupFormPage';
import { login } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const demoLogin = ()=>{
    let credential = 'demo@user.io'
    let password = 'password'
    history.push('/home')
    return dispatch(login({credential, password}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      // Logged in Nav-Bar
      <div className="nav-logged-in">
        {/* need to change classname */}
              <NavLink to="/cart">
         <button className="nav-profile-button">
              <i className="fas fa-shopping-cart"></i>
        </button>
              </NavLink>

        <div className="nav-profile-button">
          <ProfileButton user={sessionUser} />
        </div>

        {/* <button className="nav-button" >
          <NavLink to="/about">About</NavLink>
          </button> */}

          <NavLink to="/shoes/new">
        <button className="nav-button">
        New Shoe
        </button>
          </NavLink>

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


      </div>

    );
  } else {
    // Logged out Nav-Bar
    sessionLinks = (
      <div className="nav-logged-in">

        <button className="nav-button" onClick={demoLogin} >Demo</button>

        <button className="nav-button">
          <LoginFormModal />
        </button>

        <button className="nav-button">
          <SignUpModal />
        </button>

        {/* <button className="nav-button">
          <NavLink to="/">About</NavLink>
          </button> */}

        {/* <button className="nav-button">
          <NavLink exact to="/home">Home</NavLink>
        </button> */}
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
