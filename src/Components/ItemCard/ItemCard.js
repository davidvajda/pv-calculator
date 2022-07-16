import React from "react";

const getSchrackImageUrl = (orderNumber) => {
    return (
      "https://image.schrackcdn.com/340x380/f_" +
      orderNumber.toLowerCase() +
      ".jpg"
    );
  };
  
  const getScrachEshopUrl = (orderNumber) => {
    return "http://www.schrack.sk/eshop/sd/sd?a=" + orderNumber.toUpperCase();
  };

const ItemCard = ({ orderNumber, description, amount }) => {
  return (
    <div className={"invertor-card"}>
      <div className="card-image-wrapper">
        <img src={getSchrackImageUrl(orderNumber)} alt={data.description} className="card-image" />
      </div>
      <div className="card-text-wrapper">
        <div>{description}</div>
        <div><a href={getScrachEshopUrl(orderNumber)}>{orderNumber}</a></div>
        <div>{amount}x</div>
      </div>
    </div>
  );
};

export default ItemCard;
