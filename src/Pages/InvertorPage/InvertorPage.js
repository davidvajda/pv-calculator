import React, { useState, useContext, useEffect } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
  OUTPUT_ACTIONS,
} from "../../ContextProvider/ContextProvider";

import { getSuitableInvertorAndStrings } from "../../Utilities/invertorFunctions";

import InvertorCard from "../../Components/InvertorCard/InvertorCard";
import TextBoard from "../../Components/TextBoard/TextBoard";

import { getResource } from "../../Utilities/getResource";

const InvertorPage = () => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState, outputDispatch } = useContext(OutputContext);

  const [selectedInvertor, setSelectedInvertor] = useState();
  const [invertors, setInvertors] = useState();
  const [suitableInvertors, setSuitableInvertors] = useState();

  useEffect(() => {
    getResource(setInvertors, "invertors.json");
  }, []);

  useEffect(() => {
    if (invertors)
      setSuitableInvertors(
        getSuitableInvertorAndStrings(
          appState.powerReserve,
          materialState.panelPower,
          materialState.panelVoltage,
          materialState.panelCurrent,
          outputState.panelLayout,
          invertors
        )
      );
  }, [invertors]);

  useEffect(() => {
    if (selectedInvertor) {
      outputDispatch({
        type: OUTPUT_ACTIONS.INVERTOR_MATERIAL,
        payload: {
          invertor: suitableInvertors.invertors[selectedInvertor],
          stringDivisions: suitableInvertors.stringDivisions[selectedInvertor],
        },
      });
    }
  }, [selectedInvertor]);

  const renderInvertors = (invertors) => {
    if (invertors.invertors.length === 0) {
      return (
        <TextBoard
          text_array={[
            "Nebol nájdený vhodný striedač pre daný počet panelov.",
            "Výsledný materiál nebude obsahovať striedač a ochranné zariadenia.",
          ]}
          header={"Pozor!"}
        />
      );
    }

    return invertors.invertors.map((invertor, idx) => {
      return (
        <InvertorCard
          key={idx}
          data={invertor}
          selected={idx === selectedInvertor ? true : false}
          onClick={() => setSelectedInvertor(idx)}
          size={"big"}
        />
      );
    });
  };

  return (
    <div className="page-wrapper">
      {suitableInvertors ? (
        <>{renderInvertors(suitableInvertors)}</>
      ) : (
        <>loading</>
      )}
      {}
    </div>
  );
};

export default InvertorPage;
