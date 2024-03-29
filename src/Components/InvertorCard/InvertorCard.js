import React from "react";

const translateSystem = (gridType) => {
    switch(gridType) {
        case "grid":
            return "Sieťový"
        case "hybrid, grid":
            return "Hybridný"
        case "island":
            return "Ostrovný"
        default:
            return gridType
    }
}

const InvertorCard = ({ data, selected, onClick, size = "small" }) => {
  const bigCardClass = size === "big" ? "big-card" : "";
  return (
    <div onClick={onClick} className={selected ? "card " + bigCardClass + " card-selected" : "card " + bigCardClass}>
        {selected ? <div className="selected-mark">&#10004;</div>: null}
      <div className="card-image-wrapper">
        <img src={data.imageUrl} alt={data.description} className="card-image" />
      </div>
      <div className="card-text-wrapper">
        <div>{data.description}</div>
        <div>{data.phase}-fázový {translateSystem(data.system)} striedač</div>
        <div><a href={data.eshopUrl} target="_blanc">{data.orderNumber}</a></div>
        <div>Max. výkon AC: {data.nominalPower}W</div>
        <div>Max. prívod DC: {data.maxPower}W</div>
      </div>
    </div>
  );
};

export default InvertorCard;
