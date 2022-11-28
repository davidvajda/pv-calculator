import React from "react";

import IconButton from "@mui/material/IconButton";
import { InfoOutlined } from "@mui/icons-material";

import Tooltip from "@mui/material/Tooltip";

const UrlWrapper = ({ children, url, withoutMargin }) => {
  return url === "#" ? (
    withoutMargin ? (
      <>{children}</>
    ) : (
      <div className="div-4040">{children}</div>
    )
  ) : (
    <a href={url} target="_blanc">
      <IconButton color="info">{children}</IconButton>
    </a>
  );
};

const TooltipWrapper = ({ children, description }) => {
  return description === undefined ? (
    <>{children}</>
  ) : (
    <Tooltip title={description}>{children}</Tooltip>
  );
};

const InfoTooltip = ({
  children,
  description,
  url = "#",
  withoutMargin = false,
}) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <UrlWrapper url={url} withoutMargin={withoutMargin}>
        <TooltipWrapper description={description}>
          {description === undefined ? (
            withoutMargin ? (
              <></>
            ) : (
              <div className="div-4040"></div>
            )
          ) : (
            <InfoOutlined />
          )}
        </TooltipWrapper>
      </UrlWrapper>
    </div>
  );
};

export default InfoTooltip;
