import React from "react";
import ItemsNav from "../components/ItemsNav";
import ProductsList from "../components/ProductsList";

const StoreContent: React.FC = () => {
  return (
    <div className="store-container">
      <ItemsNav />
      <ProductsList />
    </div>
  );
};

export default StoreContent;