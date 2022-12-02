import React from "react";

const getSchrackImageUrl = (orderNumber) => {
  if (!orderNumber) {
    return "https://www.schrack.sk/eshop/media/catalog/product/placeholder/default/Schrack_S_CMYK80x80.jpg";
  }
  return (
    "https://image.schrackcdn.com/340x380/f_" +
    orderNumber.toLowerCase() +
    ".jpg"
  );
};

const getScrachEshopUrl = (orderNumber) => {
  if (!orderNumber) {
    return "http://www.schrack.sk/";
  }
  return "http://www.schrack.sk/eshop/sd/sd?a=" + orderNumber.toUpperCase();
};

const ItemCard = ({ orderNumber, description, amount }) => {
  return (
    <div className={"card"}>
      <div className="card-image-wrapper">
        <img
          src={getSchrackImageUrl(orderNumber)}
          alt={description}
          className="card-image"
        />
      </div>
      <div className="card-text-wrapper">
        <div>{description}</div>
        <div>
          <a href={getScrachEshopUrl(orderNumber)} target="_blanc">{orderNumber}</a>
        </div>
        <div>{amount}x</div>
      </div>
    </div>
  );
};

export default ItemCard;
