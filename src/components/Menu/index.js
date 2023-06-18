import React from "react";
import "./style.scss";
import { RxCross1 } from "react-icons/rx";
import logo from "../../assets/img/GH_Logo.svg";
import { Link, NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import menuStore from "../../stores/menuStore";
import formStore from "../../stores/formStore";

export default function Menu() {
  const store = menuStore();
  const storeForm = formStore();
  const storage = window.localStorage;

  const disconnectUser = () => {
    storage.removeItem("session");
  };

  return (
    <div
      className={
        store.menuToggle ? "menu-container toggeled" : "menu-container"
      }
    >
      <header>
        <div className="header-container menu-header-container">
          <div className="header-container__logo">
            <Link to="/" onClick={store.setMenuToggle}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div
            className="header-container__burger"
            onClick={store.setMenuToggle}
          >
            <RxCross1 />
          </div>
        </div>
      </header>

      <div className="main-container">
        <div className="link-container__top">
          {!storeForm.isLogged && (
            <Link
              className="btn link-container__top"
              to="/signup"
              onClick={store.setMenuToggle}
            >
              Inscription
            </Link>
          )}
          {!storeForm.isLogged && (
            <Link className="btn" to="/signin" onClick={store.setMenuToggle}>
              Connexion
            </Link>
          )}
          {storeForm.isLogged && (
            <Link
              className="btn"
              to="/"
              onClick={() => {
                store.setMenuToggle();
                storeForm.disconnectUser();
                disconnectUser();
              }}
            >
              Déconnexion
            </Link>
          )}
        </div>

        <div className="list-container">
          <NavLink
            className="list-container__link"
            to="/"
            onClick={store.setMenuToggle}
          >
            Accueil
          </NavLink>
          {storeForm.isLogged && (
            <NavLink
              className="list-container__link"
              to="/account"
              onClick={() => {
                store.setMenuToggle();
                storeForm.setProfilPage();
              }}
            >
              Mon compte
            </NavLink>
          )}
          <NavHashLink
            className="list-container__link"
            to="/#1"
            onClick={store.setMenuToggle}
          >
            Fonctionnalités
          </NavHashLink>
        </div>

        <div className="link-container__bottom">
          {/*//TODO : Ajuster le lien */}
          <Link className="btn" to="/widgetpage" onClick={store.setMenuToggle}>
            Mon build
          </Link>
        </div>
      </div>
    </div>
  );
}
