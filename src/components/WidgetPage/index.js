import {React, useState, useEffect} from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import formStore from "../../stores/formStore";

import {RxDragHandleHorizontal} from "react-icons/rx";

// Component
import Footer from "../Footer";
import Calculator from "../Calculator";
import RichText from "../RichText";
import Pomodoro from "../Pomodoro";
import TodoList from "../TodoList/TodoList";
import Header from "../Header";
import Loader from "../Loader";

import "./style.scss";

export default function WidgetPage() {
  
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const store = formStore();

  // Layout initial
  const initialLayout = [
    { i: "1", x: 0, y: 0, w: 2, h: 1 },
    { i: "2", x: 0, y: 2, w: 1, h: 2 },
    { i: "3", x: 1, y: 2, w: 1, h: 2 },
    { i: "4", x: 3, y: 3, w: 1, h: 2 },
  ];
  
  // State layout
  const [layout, setLayout] = useState([]);
  
  useEffect(()=> {
    setLayout(initialLayout)
  }, [])

      // Block draggble On/off
      // const screenWidth = window.innerWidth;
      // const screenDraggable = screenWidth > 960 ? true : false;
      
      // Loader Api
      if (store.isLoading) return <Loader />;

      
  return (
    <>
      <div className="container-wrapper">
        <Header />

        <div className="build-container">

        <div className="build-container__header">
        <input
          className="build-container__header__title" 
          type="text"
          value="Build"
          onChange={()=>{}}
          placeholder="My title . . ."
        />
        <input
          className="build-container__header__game" 
          type="text"
          value="01 DONJONS ET DRAGONS"
          onChange={()=>{"game Changement"}}
          placeholder="My title . . ."
        />
        <button className="build-container__header__btn-reset" onClick={()=> {
          setLayout(initialLayout)
          }}> Reset build</button>

        
   
        </div>

        <ResponsiveGridLayout
            // isDraggable={screenDraggable}
            className="build-components"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 760, md: 750}}
            cols={{ lg: 2, md: 1}}
            rowHeight={290}
            draggableHandle={'.idragit'}
            // margin={[0,50]}
          > 
              
            <div className="build-components__component" key={"1"} >

                <div className="idragit">
                <RxDragHandleHorizontal size={35} color="#201c40"  />
                </div>

                <Pomodoro />
            </div>

            <div className="build-components__component" key={"2"} 
              >
              <div className="idragit">
              <RxDragHandleHorizontal size={35} color="#201c40"  />
              </div>
              <RichText 
              />
            </div>

            <div className="build-components__component" key={"3"}  >
              <div className="idragit">
              <RxDragHandleHorizontal size={35} color="#201c40"  />
              </div>
              <TodoList />
            </div>

            <div  className="build-components__component" key={"4"} >
            <div className="idragit">
            <RxDragHandleHorizontal size={35} color="#201c40"  />
            </div>
              <Calculator />
            </div>
          </ResponsiveGridLayout>
        </div>
      </div>
      <Footer />
    </>
  );
}
