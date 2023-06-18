import React, { useState, useEffect, useRef } from "react";
import pomoStore from "../../stores/pomoStore";
import "./style.scss";

import soundPomo from "../../assets/son/pomo.mp3"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(35);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [inputValue, setInputValue] = useState(35);



// use Audio constructor to create HTMLAudioElement
// const audioTune = new Audio('../../assets/son/pomo.mp3');
const audioRef = useRef(null);

useEffect(() => {
  // au 1er rendu, je crée mon élément Audio
  // dans une Référence qui sera dispo partout
  audioRef.current = new Audio(soundPomo);
}, []);

  useEffect(() => {
    if (isStart) {
      let interval = setInterval(() => {
        clearInterval(interval);

        if (minutes === 0 && seconds === 0) {

      audioRef.current.currentTime = 0;
      audioRef.current.play();
        }

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } 

        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStart, seconds, minutes]);

  const toggleIsStart = () => {
    setIsStart(!isStart);
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const store = pomoStore();

  return (
    <div className="pomodoro">

      <div className="pomodoro-container">
        <div className="nav-container">
          <p
            onClick={() => {
              setIsStart(false);
              store.setPomoValue();
              setSeconds(0);
              if (minutes < 35) {
                setMinutes(35);
              }
            }}
            className={store.pomoValue ? "nav-select" : ""}
          >
            POMODORO
          </p>

          <p
            onClick={() => {
              setIsStart(false);
              store.setShortBreakValue();
              setSeconds(0);
              setMinutes(5);
            }}
            className={store.shortBreakValue ? "nav-select" : ""}
          >
            SHORT BREAK
          </p>

          <p
            onClick={() => {
              setIsStart(false);
              store.setLongBreakValue();
              setSeconds(0);
              setMinutes(15);
            }}
            className={store.longBreakValue ? "nav-select" : ""}
          >
            LONG BREAK
          </p>
        </div>

        {store.pomoValue && (
          <div className="number-time-container">
            <div className="time">
              {isNaN(timerMinutes) ? 0 : timerMinutes}:{timerSeconds}
            </div>

            <input
              type="number"
              className="input"
              min="0"
              onClick={(e) => setMinutes(parseInt(e.target.value))}
              onChange={(e) => {
                setMinutes(parseInt(e.target.value));
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
          </div>
        )}

        {store.shortBreakValue && (
          <div className="number-time-container">
            <div className="time">
              {isNaN(timerMinutes) ? 0 : timerMinutes}:{timerSeconds}
            </div>
          </div>
        )}

        {store.longBreakValue && (
          <div className="number-time-container">
            <div className="time">
              {isNaN(timerMinutes) ? 0 : timerMinutes}:{timerSeconds}
            </div>
          </div>
        )}

        <button
          className="pomo-start"
          onClick={() => {
            toggleIsStart();
          }}
        >
          {isStart ? "PAUSE" : "START"}
        </button>
      </div>
    </div>
  );
}
