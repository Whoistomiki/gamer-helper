import React from "react";
import Header from "../Header";
import "./style.scss";
import formStore from "../../stores/formStore";
import Footer from "../Footer";
import Loader from "../Loader";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useEffect } from "react";

export default function Account() {
  const store = formStore();
  const navigate = useNavigate();

  const storage = window.localStorage;

  const disconnectUser = () => {
    storage.removeItem("session");
  };

  if (store.isLoading) return <Loader />;

  return (
    <>
      <div className="container-wrapper">
        <Header />

        <div className="account-container">
          <h1 className="account-title"> MON COMPTE</h1>

          {/* Nav inside account page - Setings element & profil element  */}
          <div className="account-nav">
            <NavLink
              to={"/account"}
              onClick={store.setProfilPage}
              className={store.profilPage ? "account-nav--select" : ""}
            >
              Detail du profil
            </NavLink>
            <p>|</p>
            <NavLink
              to={"/account"}
              onClick={store.setSettingsPage}
              className={store.settingsPage ? "account-nav--select" : ""}
            >
              Réglages du compte
            </NavLink>
          </div>

          {/* Settings page  */}
          {store.settingsPage && (
            <div className="settings-container">
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  store.modifyAccountFromApi(store.currentUser.user.id);
                }}
              >
                <input
                  className="account-input input"
                  type="text"
                  placeholder={store.currentUser.user.email || "Email"}
                  onChange={store.setLoginValue}
                  value={store.loginValue}
                />

                <input
                  className="account-input input"
                  type="text"
                  placeholder={store.currentUser.user.pseudo || "Pseudo"}
                  onChange={store.setPseudoValue}
                  value={store.pseudoValue}
                />

                <input
                  className="account-input input"
                  type="password"
                  placeholder={"Nouveau mot de passe"}
                  onChange={store.setPasswordValue}
                  value={store.passwordValue}
                />

                <div className="account-btn">
                  <button className=" btn account-btn__update" type="submit">
                    Mettre à jour
                  </button>

                  <button
                    className="account-btn__delete"
                    type="button"
                    onClick={() => {
                      store.setDeletePage();
                      store.sendConfirmDelete(store.currentUser.user.id);
                    }}
                  >
                    Supprimer votre compte
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Delete account Page */}
          {store.deletePage && (
            <div className="settings-container delete-page">
              <h2 className="delete-page__title">
                Êtes-vous sûr de vouloir supprimer votre compte ?
              </h2>
              <h3 className="delete-page__sub-title">
                Veuillez entrer le code reçu par mail
              </h3>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  if (store.currentUser.token === parseInt(store.confirmCode)) {
                    store.deleteAccountFromApi(store.currentUser.user.id);
                    navigate("/");
                    disconnectUser();
                  }
                }}
              >
                <input
                  className="account-input input"
                  type="text"
                  placeholder={"Code reçu par mail"}
                  onChange={store.setConfirmCode}
                  value={store.confirmCode}
                />

                <button className="account-btn__delete btn" type="submit">
                  Supprimer votre compte
                </button>
              </form>
            </div>
          )}

          {/* Profil page  */}
          {store.profilPage && (
            <div className="profil-container">
              <div className="profil-container__avatar">
                <Avatar name={store.currentUser.user.pseudo} />
              </div>

              <form
                className="profil-container__biography"
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  store.submitBio(store.currentUser.user.id);
                }}
              >
                <textarea
                  className="profil-container__biography__input input"
                  type="text"
                  maxLength="250"
                  rows="6"
                  placeholder={store.currentUser.user.biography || "..."}
                  onChange={store.setBiographyValue}
                  value={store.biographyValue}
                />

                <button className="btn" type="submit">
                  Mettre à jour
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
