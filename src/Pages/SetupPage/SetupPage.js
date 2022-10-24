import React, { useEffect, useState } from "react";
import axios from "axios";

const getResource = (password, setState, resourceName) => {
  axios
    .post("http://127.0.0.1:8080/get_resource", {
      adminPassword: password,
      resourceName: resourceName,
    })
    .then((res) => {
      setState(res.data);
      return res.data;
    })
    .catch((err) => {
      return {};
    });
};

const setResource = (password, state, resourceName) => {
  axios
    .post("http://127.0.0.1:8080/set_resource", {
      adminPassword: password,
      resourceName: resourceName,
      resourceContent: state
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });}

const renderResource = (resource, setState, resourceName) => {
  if (resource === undefined) {
    return <></>;
  }

  const resourceRows = [];

  for (const [key, values] of Object.entries(resource)) {
    const valueElements = values.map((item, idx) => <input key={idx} maxLength={10} value={item ? item : ""} onChange={(e) => {
      setState(prev => {
        const newResource = {...prev}
        newResource[key][idx] = e.target.value;
        return newResource;
      })
    }} />);
    resourceRows.push(
      <div key={key} className="resourceRow">
        <div className="resource-key">{key}</div>
        <div className="resource-inputs">{valueElements}</div>
      </div>
    );
  }
  return <form>{resourceRows}<button onClick={(e) => {
    e.preventDefault()
    setResource("test", resource, resourceName)
  }} >Uložiť</button></form>;
};

const SetupPage = () => {
  const servicePassword = "test"; // prompt("Servisné heslo:")

  const [hooks, setHooks] = useState();
  const [rails, setRails] = useState();
  const [others, setOthers] = useState();
  const [invertors, setInvertors] = useState();

  useEffect(() => {
    getResource(servicePassword, setHooks, "hooks.json");
    getResource(servicePassword, setRails, "rails.json");
    getResource(servicePassword, setOthers, "others.json");
    getResource(servicePassword, setInvertors, "invertors.json");
  }, []);

  //checkAdminPassword("test");

  const setupPage = <div>setup page</div>;
  return <>
    {renderResource(hooks, setHooks, "hooks.json")}
    {renderResource(rails, setRails, "rails.json")}
    {renderResource(others, setOthers, "others.json")}
  </>;
};

export default SetupPage;
