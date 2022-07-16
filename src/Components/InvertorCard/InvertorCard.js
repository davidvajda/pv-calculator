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

const InvertorCard = ({ data, selected, onClick }) => {
  return (
    <div onClick={onClick} className={selected ? "invertor-card invertor-card-selected" : "invertor-card"}>
        {selected ? <div className="selected-mark">&#10004;</div>: null}
      <div className="card-image-wrapper">
        <img src={data.imageUrl} alt={data.description} className="card-image" />
      </div>
      <div className="card-text-wrapper">
        <div>{data.description}</div>
        <div>{data.phase}-fázový {translateSystem(data.system)} striedač</div>
        <div><a href={data.eshopUrl}>{data.orderNumber}</a></div>
        <div>Max. výkon AC: {data.nominalPower}W</div>
        <div>Max. prívod DC: {data.maxPower}W</div>
      </div>
    </div>
  );
};

export default InvertorCard;
