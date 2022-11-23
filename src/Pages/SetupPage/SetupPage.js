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
      resourceContent: state,
    })
    .catch((err) => {
      alert(err);
    });
};

const setDefaultResources = (password) => {
  axios
    .post("http://127.0.0.1:8080/reset_resources", {
      adminPassword: password,
    })
    .then(() => {
      alert("Resources set to default!");
    })
    .catch((err) => {
      alert(err);
    });
};

const renderResource = (resource, setState, resourceName) => {
  if (resource === undefined) {
    return <></>;
  }

  const resourceRows = [];
  for (const [key, values] of Object.entries(resource)) {
    const valueElements = values.map((item, idx) => (
      <td>
        <input
          key={idx}
          maxLength={10}
          value={item ? item : ""}
          onChange={(e) => {
            setState((prev) => {
              const newResource = { ...prev };
              newResource[key][idx] = e.target.value;
              return newResource;
            });
          }}
        />
      </td>
    ));

    resourceRows.push(
      <tr key={key}>
        <td className="resource-row-name">
          <b>{key}</b>
        </td>
        {valueElements}
      </tr>
    );
  }
  return (
    <div>
      <table>
        <tbody>
          <th colSpan={6}>
            <b>{resourceName}:</b>
          </th>
          <tr>
            <td>
              <b>Load index:</b>
            </td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          {resourceRows}
        </tbody>
      </table>
    </div>
  );
};

const renderInvertors = (invertorsJson, setInvertorsState) => {
  if (invertorsJson === undefined) {
    return <></>;
  }

  const intKeyNamesToParse = [
    "phase",
    "nominalPower",
    "maxPower",
    "ratedVoltage",
    "minVoltage",
    "maxCurrent",
    "mppt",
  ];
  const intArrayNamesToParse = ["dcInputs"];

  return invertorsJson.map((invertorObject, invertorIdx) => {
    const invertorElement = [];

    for (const [key, value] of Object.entries(invertorObject)) {
      if (key === "modified") {
        continue;
      }

      invertorElement.push(
        <tr key={key}>
          <td className="resource-row-name">
            <b>{key}:</b>
          </td>
          <td>
            {invertorObject["modified"] ? (
              <input
                className="invertor-param-value"
                type={intKeyNamesToParse.includes(key) ? "number" : "text"}
                value={value}
                onChange={(e) => {
                  setInvertorsState((prev) => {
                    return prev.map((obj, idx) => {
                      if (invertorIdx === idx) {
                        if (intKeyNamesToParse.includes(key)) {
                          obj[key] = parseInt(e.target.value) | 0;
                        } else if (intArrayNamesToParse.includes(key)) {
                          const dcInputs = [];
                          const dcInputsUnparsed = e.target.value.split(",");
                          dcInputsUnparsed.forEach((num) => {
                            dcInputs.push(
                              num === "" ? null : parseInt(num) | 0
                            );
                          });
                          obj[key] = dcInputs;
                        } else {
                          obj[key] = e.target.value;
                        }
                      }
                      return obj;
                    });
                  });
                }}
              />
            ) : (
              <>{value}</>
            )}
          </td>
        </tr>
      );
    }

    return (
      <table className="invertor" key={invertorIdx}>
        <thead>
          <tr>
            <td colSpan={2}>
              <button
                onClick={() =>
                  setInvertorsState((prev) => {
                    return prev.filter((obj, idx) => {
                      if (idx !== invertorIdx) {
                        return obj;
                      }
                    });
                  })
                }
              >
                delete
              </button>

              <button
                onClick={() =>
                  setInvertorsState((prev) => {
                    return prev.map((obj, idx) => {
                      const newObj = { ...obj };
                      if (idx === invertorIdx || newObj.modified) {
                        newObj.modified = true;
                      } else {
                        newObj.modified = false;
                      }
                      return newObj;
                    });
                  })
                }
              >
                modify
              </button>
            </td>
          </tr>
        </thead>
        <tbody>{invertorElement}</tbody>
      </table>
    );
  });
};

const clearInvertors = (invertors) => {
  return invertors.map((invertorObj) => {
    delete invertorObj["modified"];
    return invertorObj;
  });
};

const MaterialPage = () => {
  const [hooks, setHooks] = useState();
  const [rails, setRails] = useState();
  const [others, setOthers] = useState();

  useEffect(() => {
    getResource("test", setHooks, "hooks.json");
    getResource("test", setRails, "rails.json");
    getResource("test", setOthers, "others.json");
  }, []);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setResource("test", hooks, "hooks.json");
          setResource("test", rails, "rails.json");
          setResource("test", others, "others.json");
        }}
      >
        Save modified material
      </button>
      <button
        onClick={() => {
          const confirmation = prompt(
            "Are you sure you want to reset material to default values? Type YES for confirmation."
          );
          if (confirmation === "YES") {
            setDefaultResources("test");
          }
        }}
      >
        Reset material to default values
      </button>
      <div className="resource-table-wrapper">
        {renderResource(hooks, setHooks, "hooks.json")}
        {renderResource(rails, setRails, "rails.json")}
        {renderResource(others, setOthers, "others.json")}
      </div>
    </>
  );
};

const InvertorPage = () => {
  const [invertors, setInvertors] = useState();
  const [invertorStructure, setInvertorStructure] = useState();

  useEffect(() => {
    getResource("test", setInvertors, "invertors.json");
    getResource("test", setInvertorStructure, "invertorStructure.json");
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setResource("test", clearInvertors(invertors), "invertors.json");
        }}
      >
        Save modified invertors
      </button>
      <button
        onClick={() =>
          setInvertors((prev) => {
            const newInvertor = { ...invertorStructure, modified: true };
            return [newInvertor, ...prev];
          })
        }
      >
        Add new invertor
      </button>
      <div className="invertors">
        {renderInvertors(invertors, setInvertors)}
      </div>
    </>
  );
};

const SetupPage = () => {
  const servicePassword = "test"; // prompt("Servisné heslo:")
  // TODO get service password from input

  const [page, setPage] = useState("material");

  return (
    <>
      {page === "material" ? (
        <>
          <button onClick={() => setPage("invertor")}>Modify invertors</button>
          <MaterialPage />
        </>
      ) : (
        <>
          <button onClick={() => setPage("material")}>Modify material</button>
          <InvertorPage />
        </>
      )}
    </>
  );
};

export default SetupPage;
