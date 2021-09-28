import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom"
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);



  }, [showMenu]);

  const logout = async(e) => {
    e.preventDefault();
    //* Cart clears localStorage but state never updates
    //need to remove storage
    localStorage.clear()
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <p>username: <span id="user-info"> {user.username} </span> </p>
          <p>Email: <span id="user-info">{user.email} </span></p>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
