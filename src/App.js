import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Account from "./components/Account";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import WidgetPage from "./components/WidgetPage";
import Calculator from "./components/Calculator";
import Pomodoro from "./components/Pomodoro";
import RichText from "./components/RichText";
import NotFoundPage from "./components/NotFoundPage";
import TodoList from "./components/TodoList/TodoList";
import "./styles/index.scss";
import formStore from "./stores/formStore";
import { useEffect } from "react";

function App() {
  const store = formStore();
  const storage = window.localStorage;

  const fillLocalStorage = () => {
    const userString = JSON.stringify({
      token: store.currentUser.token,
      refreshToken: store.currentUser.refreshToken,
      user: store.currentUser.user,
    });
    storage.setItem("session", userString);
  };

  useEffect(() => {
    store.toggleIsLoading();
    // const user = storage.getItem("user");
    if (store.currentUser.user) {
      fillLocalStorage();
    } else if (storage.session) {
      const userString = storage.getItem("session");
      const session = JSON.parse(userString);
      store.compareTokensFromApi({
        token: session.token,
        refreshToken: session.refreshToken,
        user: session.user,
      });
      store.fillCurrentUser(session);
    }
    store.toggleIsLoading();
  }, [store.currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signin" element={<Signin />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/menu" element={<Menu />} />

      {store.isLogged && <Route path="/account" element={<Account />} />}

      <Route path="/calculator" element={<Calculator />} />

      <Route path="/todolist" element={<TodoList />} />

      <Route path="/richtext" element={<RichText />} />

      <Route path="/pomodoro" element={<Pomodoro />} />

      <Route path="/widgetpage" element={<WidgetPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
