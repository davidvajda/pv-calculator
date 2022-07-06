import React, { useState, useRef, useContext } from "react";

import "./PanelDimension.css";

import { MaterialStateContext } from "../ContextProvider/ContextProvider";

const PANEL_CLASS = {
  IDLE: "dimension-panel dimension-panel-animation",
  HOVER: "dimension-panel dimension-panel-animation-hover",
};

export const PanelDimensions = () => {
  const [className, setClassName] = useState(() => PANEL_CLASS.IDLE);
  const [animationFinished, setAnimationFinished] = useState(() => true);
  const [isHovered, setIsHovered] = useState(() => false);
  const { materialState } = useContext(MaterialStateContext);

  const panelRef = useRef();

  const protectAnimation = () => {
    setAnimationFinished(false);
    setTimeout(() => {
      setAnimationFinished(true);
      if (!isHovered) {
        setClassName(PANEL_CLASS.IDLE);
      }
    }, 1000);
  };

  let w = materialState.panelWidth;
  let h = materialState.panelHeight;

  let panelWidth = materialState.panelWidth / 8;
  let panelHeight = materialState.panelHeight / 8;

  const styles = {
    panel: {
      minWidth: panelWidth,
      minHeight: panelHeight,
    },

    widthDimension: {
      width: panelWidth,
      top: panelHeight + 20,
    },
    heightDimension: {
      width: panelHeight,
      left: panelWidth - panelHeight / 2 + 20,
      top: panelHeight / 2,
      transform: "rotate(-90deg)",
    },
  };

  return (
    <div
      ref={panelRef}
      style={styles.panel}
      className={className}
      onMouseOver={() => {
        setIsHovered(true);
        if (animationFinished) {
          setClassName(PANEL_CLASS.HOVER);
          protectAnimation();
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (animationFinished) {
          setClassName(PANEL_CLASS.IDLE);
          protectAnimation();
        }
      }}
    >
      <div style={styles.widthDimension} className="dimension-panel-dimmension">
        {w} mm
      </div>
      <div
        style={styles.heightDimension}
        className="dimension-panel-dimmension"
      >
        {h} mm
      </div>
    </div>
  );
};
