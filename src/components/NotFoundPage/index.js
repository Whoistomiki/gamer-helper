import React from "react";
import Header from "../Header";
import "./style.scss";
import Footer from "../Footer";
import PAGE_NOT_FOUND from'../../assets/img/Page_not_found.webp';

export default function NotFoundPage() {
  return (
    <>
      <div className="container-wrapper">
       <Header />
       <div className="container-404">
        <h1> Tu vas où frérot ?</h1>
          <img src={PAGE_NOT_FOUND}  alt=" error 404 not found"/> 
        </div>
      </div>
      <Footer />
    </>
  );
}