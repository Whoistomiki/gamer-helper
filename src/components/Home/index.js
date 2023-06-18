import { useEffect, React } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import formStore from "../../stores/formStore";

// Import component
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";

// team img
import KEVIN from "../../assets/img/kevin.png";
import THOMASC from "../../assets/img/thomasC.png";
import MAXIME from "../../assets/img/maxime.png";
import THOMASY from "../../assets/img/thomasy.png";
import HOUMAIR from "../../assets/img/houmair.png";

// Import img
import HOME_PIC from "../../assets/img/fonctionnalite_photo_1.webp";
import HOME_PIC_2 from "../../assets/img/fonctionnalite_photo_2.webp";

import Lottie from "react-lottie";
// Lottie Animation importation
import animCalculator from "../../assets/lotties/calculator";
import animNotePad from "../../assets/lotties/richtext";
import animTodo from "../../assets/lotties/todolist";
import animPomo from "../../assets/lotties/pomodoro";

export default function Home() {
  const store = formStore();

  const team = [
    {
      img : KEVIN,
      role : "Product owner",
      name: "Kevin"
    },
    {
      img : MAXIME,
      role : "Lead dev front",
      name: "Maxime"
    },
    {
      img : THOMASC,
      role : "Lead dev back",
      name: "Thomas C."
    },
    {
      img : HOUMAIR,
      role : "Scrum master",
      name: "Houmaïr"
    },
    {
      img : THOMASY,
      role : "Git master",
      name: "Thomas Y."
    }
  ]

// Lottie Option
  const genericAnim = (anim) => {
    return {
      loop: true,
      autoplay: true,
      animationData: anim,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  // Lottie Player
  const calculator = genericAnim(animCalculator);
  const NotePad = genericAnim(animNotePad);
  const Todo = genericAnim(animTodo);
  const Pomo = genericAnim(animPomo);

  if (store.isLoading) return <Loader />;

  return (
    <>
      <div className="container-wrapper">
        <Header />
        <main className="home-content">
          <div className="home-content__header">
            {store.isLogged && (
              <h2>Bienvenue {store.currentUser.user.pseudo}</h2>
            )}
            <h1>LE MEILLEUR AMI DU JOUEUR</h1>
            <p>
              Cette annonce s'adresse à tous les joueurs de jeux de gestion ou
              de plateau. En général, un bon ami pour un gamer serait quelqu'un
              qui partage la passion pour les jeux vidéos et qui peut le
              soutenir dans sa passion. Gamer Helper est presque un ami parfait
              pour un amateur de jeux, car il peut aider les joueurs, et avoir
              plusieurs widgets à disposition.
            </p>
            <NavLink to={store.isLogged ? "/widgetpage" : "/signup"}>
              <button className="btn">Essayez nous &rarr;</button>
            </NavLink>
          </div>
          <div className="home-content__features">
            <div className="home-content__single-feature">
              <img src={HOME_PIC} alt="Présentation du site" />
              <div className="feat-text">
                <p className="feat-title">
                  Gamer Helper, pour passer au niveau supérieur de votre jeu.
                </p>
                <p>
                  L'intérêt de Gamer Helper est d'optimiser et organiser votre
                  façon de jouer. L'idée était de créer une interface qui met
                  tous les widgets sur une seule page permettant de faciliter la
                  vie du joueur.
                </p>
              </div>
            </div>
            <div className="home-content__single-feature home-content__single-feature--right">
              <div className="feat-text">
                <p className="feat-title">
                  Ton Build, tout de suite à portée de main.
                </p>
                <p>
                  Profite dès maintenant d'un usage gratuit sans t'inscrire et
                  sans limite de temps. Si tu veux profiter de toutes les
                  fonctionnalités, inscris-toi et ça fait toujours plaisir de
                  voir notre travail reconnu.
                </p>
              </div>
              <img src={HOME_PIC_2} alt="Présentation du site" />
            </div>
          </div>

          <div className="widget-features">
            <h2 id={1}>LES WIDGETS</h2>
            <div className="home-content__widget-feature">
              <div className="home-content__widget-feature__img">
                <Lottie options={NotePad} height={135} width={135} />
              </div>
              <div className="feat-text">
                <p className="feat-title">LE BLOC-NOTE</p>
                <p>
                  Le bloc-notes, aussi appelé "calepin", tu ne le savais pas ça,
                  pas vrai ? Un bloc-notes en ligne est un excellent moyen de
                  garder une trace de vos pensées, idées, tâches à effectuer.
                </p>
              </div>
            </div>
            <div className="home-content__widget-feature home-content__widget-feature--right">
              <div className="feat-text">
                <p className="feat-title">LA CALCULETTE</p>
                <p>
                  Une calculatrice en ligne est un outil pratique pour effectuer
                  des calculs simples. T'es peut-être pas un pro du calcul
                  mental, mais c'est important de savoir calculer mentalement
                  des opérations et l'utilité d'une calculette est parfois
                  négligée.
                </p>
              </div>

              <div className=" home-content__widget-feature__img">
                <Lottie options={calculator} height={135} width={135} />
              </div>
            </div>
            <div className="home-content__widget-feature">
              <div className=" home-content__widget-feature__img">
                <Lottie options={Todo} height={145} width={145} />
              </div>
              <div className="feat-text">
                <p className="feat-title">LA TO-DI LIST</p>
                <p>
                  Une To-do List est un outil de gestion de tâches qui permet de
                  lister les tâches à effectuer. C'est un outil très utile pour
                  organiser son temps et ses priorités surtout entre 2-3 quêtes,
                  n'est-ce pas ?
                </p>
              </div>
            </div>
            <div className="home-content__widget-feature home-content__widget-feature--right">
              <div className="feat-text">
                <p className="feat-title">LE POMODORO</p>
                <p>
                  Le pomodoro, l'objectif est de rester concentré à 100% sur une
                  seule et unique tâche. On en dispose de 3 actuellement, ça
                  devrait suffire, non ? Une de 5 minutes pour les courtes
                  sessions Une autre de 15 minutes pour les moyennes sessions Et
                  une dernière à ton choix de minutes ! Stay focus !
                </p>
              </div>
              <div className="home-content__widget-feature__img">
                <Lottie options={Pomo} height={145} width={145} />
              </div>
            </div>
            <button className="btn">
              <Link to="/signup">Inscrivez-vous Gratuitement</Link>
            </button>
          </div>

          <div className="team-container" id="team-presentation">
            <h2>LA TEAM</h2>
            <div className="team-presentation">
              {team.map((elem) => {
                return (
              <div key={elem.name} className="team-presentation-single">
                <img src={elem.img} alt={elem.role} />
                <p className="team-presentation-single--title">{elem.name}</p>
                <p className="team-presentation-single--role">{elem.role}</p>
              </div>
                )
              })}


            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
