import React from "react";

import "./TextInput.css";

import TextField from "@mui/material/TextField";

export const TextInput = ({ label, value, setValue, type }) => {
  return (
    <div className="text-input">
      <TextField
        fullWidth={true}
        label={label}
        value={value}
        onChange={(e) =>
          setValue(() => {
            if (type === "number") {
              if (e.target.value === "" || parseInt(e.target.value) < 0) {
                return 0;
              }
              return parseInt(e.target.value);
            }
            return e.target.value;
          })
        }
        variant="standard"
        type={type}
      />
    </div>
  );
};
