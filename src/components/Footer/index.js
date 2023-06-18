import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import formStore from "../../stores/formStore";

export default function Footer() {
  const store = formStore();

  return (
    <footer className="footer">
      <div className="footer__links">
        <NavLink to="/">Accueil</NavLink>
        {!store.isLogged && <NavLink to="/signup">Inscription</NavLink>}
        {store.isLogged && <NavLink to="/account">Mon compte</NavLink>}
        <NavLink to="/signin">Connexion</NavLink>
        <NavLink to="/widgetpage">Build</NavLink>
        <NavLink to="/">À propos</NavLink>
      </div>
      <div className="footer__rights">
        <p>&#169; Gamer Helper. All rights reserved.</p>
      </div>
    </footer>
  );
}
