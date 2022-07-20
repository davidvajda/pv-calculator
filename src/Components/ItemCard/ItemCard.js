import React from "react";

const getSchrackImageUrl = (orderNumber) => {
  if (!orderNumber) {
    return;
  }

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
  const on = orderNumber ? orderNumber : "Pre danú záťaž nebola nájdená/ý.";
  const imageUrl = orderNumber ? getSchrackImageUrl(orderNumber) : "#";
  const eshopUrl = orderNumber ? getScrachEshopUrl(orderNumber) : "#";

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={description} className="card-image" />
      </div>
      <div className="card-text-wrapper">
        <div>{description}</div>
        <div>
          <a href={eshopUrl}>{on}</a>
        </div>
        <div>{amount}x</div>
      </div>
    </div>
  );
};

export default ItemCard;
