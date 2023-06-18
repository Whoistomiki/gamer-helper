import React from 'react';
import menuStore from '../../stores/menuStore';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/GH_Logo.svg';
import './style.scss'
import Menu from '../Menu';

export default function Header() {
      const store = menuStore();

  return (
    <>
    {/* <div className="desktop-container"> */}
      <Menu />
        <header>
            <div className="header-container container">
                <div className="header-container__logo">
                  <NavLink to='/'>
                      <img src={logo} alt="logo" />
                  </NavLink>
                </div>
                <div className="header-container__burger" onClick={store.setMenuToggle}><FiMenu /></div>
            </div>
        </header>
      {/* </div> */}
    </>
  )
}
