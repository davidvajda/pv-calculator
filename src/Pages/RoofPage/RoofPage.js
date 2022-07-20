import React, { useContext, useEffect, useState } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
  OUTPUT_ACTIONS,
} from "../../ContextProvider/ContextProvider";
import RectangularRoof from "../../RoofComponents/RectangularRoof/RectangularRoof";
import TriangularRoof from "../../RoofComponents/TriangularRoof/TriangularRoof";
import TrapezoidRoof from "../../RoofComponents/TrapezoidRoof/TrapezoidRoof";

import TextBoard from "../../Components/TextBoard/TextBoard";

import {
  getPanelLayoutRectangle,
  getPanelLayoutTriangle,
  getPanelLayoutTrapezoid,
} from "../../Utilities/layoutFunctions";
import { countPanels } from "../../Utilities/countPanels"

export const EDGE_SAFE_DISTANCE = 600;
export const CANVAS_SIZE = 600;

const RoofPage = () => {
  const { materialState } = useContext(MaterialStateContext);
  const { outputState, outputDispatch } = useContext(OutputContext);
  const { appState } = useContext(AppStateContext);

  const [roofComponent, setRoofComponent] = useState(() => null);

  const styles = {
    roofComponent: {
      width: CANVAS_SIZE + 20,
      height: CANVAS_SIZE + 20,
    },
  };

  useEffect(() => {
    const roofShape = appState.roofShape;
    switch (roofShape) {
      case "rectangle":
        setRoofComponent(<RectangularRoof />);
        outputDispatch({
          type: OUTPUT_ACTIONS.PANEL_LAYOUT,
          payload: {
            value: getPanelLayoutRectangle(
              appState.roofHeight,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          },
        });
        break;

      case "triangle":
        setRoofComponent(<TriangularRoof />);
        outputDispatch({
          type: OUTPUT_ACTIONS.PANEL_LAYOUT,
          payload: {
            value: getPanelLayoutTriangle(
              appState.roofHeight,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          },
        });
        break;

      case "trapezoid":
        setRoofComponent(<TrapezoidRoof />);
        outputDispatch({
          type: OUTPUT_ACTIONS.PANEL_LAYOUT,
          payload: {
            value: getPanelLayoutTrapezoid(
              appState.roofHeight,
              appState.roofWidthTop,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          },
        });
        break;
      default:
        // shouldn't happen
        console.log("Unvalid roof type in RoofShape switch!");
    }
  }, [appState, materialState, outputDispatch]);

  return (
    <>
      <div className="page-wrapper" style={styles.roofComponent}>
        {countPanels(outputState.panelLayout.panels) > 0 ? (
          roofComponent
        ) : (
          <TextBoard
            text_array={[
              "Do Vami zadaného rozmeru strechy sa nezmestí žiadny panel!",
              "Prosím, zadajte iný rozmer strechy alebo iný rozmer použitého panelu.",
            ]}
            header={"Chyba!"}
          />
        )}
      </div>
      <div className="roof-info">
        Počet panelov: {countPanels(outputState.panelLayout.panels)} s celkovým výkonom{" "}
        {countPanels(outputState.panelLayout.panels) * materialState.panelPower}Wp
      </div>
    </>
  );
};

export default RoofPage;
