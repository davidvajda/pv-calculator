import React, { useContext } from "react";

import {
  AppStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";
import { APP_ACTIONS } from "../../ContextProvider/ContextProvider";
import { SelectInput } from "../../Components/SelectInput/SelectInput";
import TextBoard from "../../Components/TextBoard/TextBoard"

const OutputPage = () => {
  const { appState, appDispatch } = useContext(AppStateContext);
  const { outputState } = useContext(OutputContext);

  const overcurrentDevice = {
    labels: ["Istič pre fotovoltiku", "Poistkový odpínač a poistky pre fotovoltiku"],
    values: ["mcb", "fuse"],
  };

  const overvoltageDevice = {
    labels: ["Predpripravená prepäťová skriňa", "Samostatný zvodič prepätia"],
    values: ["box", "spd"],
  };

  return (
    <div className="page-wrapper">
      {outputState.invertors.invertor ? (
        <>
          <SelectInput
            label={"Typ nadprúdovej ochrany"}
            itemLabels={overcurrentDevice.labels}
            values={overcurrentDevice.values}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.OVERCURRENT_DEVICE}
            defaultValue={appState.overcurrentDevice}
            description={
              "Pre istenie fotovoltických stringov sa používajú buď DC poistky alebo DC ističe."
            }
          />
          <SelectInput
            label={"Typ prepäťovej ochrany"}
            itemLabels={overvoltageDevice.labels}
            values={overvoltageDevice.values}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.OVERVOLTAGE_DEVICE}
            defaultValue={appState.overvoltageDevice}
            description={
              "Pre ochranu fotovoltických stringov pred prepätím sa používajú zvodiče prepätia."
            }
          />
        </>
      ) : (
        <TextBoard
          text_array={[
            "Typ ochrán je možné vybrať spolu so striedačom.",
          ]}
          header={"Pozor!"}
        />
      )}
    </div>
  );
};

export default OutputPage;
