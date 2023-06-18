import React from "react";
import Footer from "../Footer";
import Calculator from "../Calculator";
import RichText from "../RichText";
import Pomodoro from "../Pomodoro";
import TodoList from "../TodoList";
import Header from "../Header";

import "./style.scss";

export default function WidgetPage() {
  return (
    <>
      <div className="container-wrapper">
        <Header />

        <div className="build-container">
          <h1>Build</h1>
          <h2>01 DONJONS ET DRAGONS</h2>

          <div className="build-container__widgets">
            <RichText />
            <Calculator />
            <Pomodoro />
            <TodoList />
            <TodoList />
            <TodoList />
            <TodoList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
