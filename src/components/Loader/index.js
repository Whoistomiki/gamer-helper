import React from "react";
import "./style.scss";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    </div>
  );
}
