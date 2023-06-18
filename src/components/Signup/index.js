import React from "react";
import Header from "../Header";
import "./style.scss";
import formStore from "../../stores/formStore";
import Footer from "../Footer";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const store = formStore();
  const navigate = useNavigate();
  const storage = window.localStorage;

  if (store.isLoading) return <Loader />;

  return (
    <>
      <div className="container-wrapper">
        <Header />
        <div className="signin-container">
          <h1 className="account-title">INSCRIPTION</h1>

          <div className="form-container">
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                await store.subscribeFromApi();
                await store.connectUserFromApi();
                if (storage.session) {
                  navigate("/");
                }
              }}
            >
              <input
                className="singnin-input input"
                type="email"
                placeholder="Email"
                onChange={store.setLoginValue}
                value={store.loginValue}
              />
              <input
                className="singnin-input input"
                type="password"
                placeholder="Password"
                onChange={store.setPasswordValue}
                value={store.passwordValue}
              />
              <input
                className="singnin-input input"
                type="password"
                placeholder="Confirm password"
                onChange={store.setConfirmPasswordValue}
                value={store.confirmPasswordValue}
              />
              <input
                className="singnin-input input"
                type="text"
                placeholder="Pseudo"
                onChange={store.setPseudoValue}
                value={store.pseudoValue}
              />
              <button className="btn signin-btn" type="submit">
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
