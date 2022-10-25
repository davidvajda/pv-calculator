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
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

const renderResource = (resource, setState, resourceName) => {
  if (resource === undefined) {
    return <></>;
  }

  const resourceRows = [];

  for (const [key, values] of Object.entries(resource)) {
    const valueElements = values.map((item, idx) => (
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
    ));
    resourceRows.push(
      // TODO: make it a table
      <div key={key} className="resourceRow">
        <div className="resource-inputs">
          <span className="resource-key">{key}</span>
          <div>{valueElements}</div>
        </div>
      </div>
    );
  }
  return (
    <form>
      <h1>{resourceName}</h1>
      <div>{resourceRows}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setResource("test", resource, resourceName);
        }}
      >
        Save
      </button>
    </form>
  );
};

const renderInvertors = (
  invertorsJson,
  setInvertorsState,
  modifiedInvertors,
  setModifiedInvertors
) => {
  return invertorsJson.map((invertorObject, invertorIdx) => {
    const invertorElement = [];

    for (const [key, value] of Object.entries(invertorObject)) {
      invertorElement.push(
        <tr key={key}>
          <td>
            <b>{key}:</b>
          </td>
          <td>
            {modifiedInvertors.includes(invertorIdx) ? (
              <input
                className="invertor-param-value"
                value={value}
                onChange={(e) => {
                  setInvertorsState((prev) => {
                    return prev.map((obj, idx) => {
                      if (invertorIdx === idx) {
                        const newObj = { ...obj };
                        newObj[key] = e.target.value;
                        return newObj;
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
                onClick={() => {
                  setInvertorsState((prev) =>
                    prev.filter((obj, idx) => {
                      if (idx !== invertorIdx) {
                        return obj;
                      } else if (modifiedInvertors.includes(idx)) {
                        setModifiedInvertors((prev) => {
                          return prev.filter((modifiedInvertorIdx) => {
                            if (modifiedInvertorIdx !== invertorIdx) {
                              return modifiedInvertorIdx;
                            }
                          });
                        });
                      }
                    })
                  );
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  setModifiedInvertors((prev) => {
                    if (!modifiedInvertors.includes(invertorIdx)) {
                      return [...prev, invertorIdx];
                    }
                    return prev;
                  });
                }}
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

const SetupPage = () => {
  const servicePassword = "test"; // prompt("Servisné heslo:")

  const [page, setPage] = useState("material");
  const [modifiedInvertors, setModifiedInvertors] = useState([]);

  const [hooks, setHooks] = useState();
  const [rails, setRails] = useState();
  const [others, setOthers] = useState();
  const [invertors, setInvertors] = useState();
  const [invertorStructure, setInvertorStructure] = useState();

  useEffect(() => {
    getResource(servicePassword, setHooks, "hooks.json");
    getResource(servicePassword, setRails, "rails.json");
    getResource(servicePassword, setOthers, "others.json");
    getResource(servicePassword, setInvertors, "invertors.json");
    getResource(
      servicePassword,
      setInvertorStructure,
      "invertorStructure.json"
    );
  }, []);

  const MaterialPage = () => {
    return (
      <div className="material-page">
        <button onClick={() => setPage("invertors")}>Manage invertors</button>
        {renderResource(hooks, setHooks, "hooks.json")}
        {renderResource(rails, setRails, "rails.json")}
        {renderResource(others, setOthers, "others.json")}
      </div>
    );
  };

  const InvertorPage = () => {
    return (
      <div className="invertor-page">
        <button onClick={() => setPage("material")}>Manage material</button>
        <button onClick={() => setInvertors(prev => {
          return [invertorStructure, ...prev]
        })}>
          Add new invertor
        </button>
        <div className="invertors">
          {renderInvertors(
            invertors,
            setInvertors,
            modifiedInvertors,
            setModifiedInvertors
          )}
        </div>
      </div>
    );
  };

  return <>{page === "material" ? <MaterialPage /> : <InvertorPage />}</>;
};

export default SetupPage;
