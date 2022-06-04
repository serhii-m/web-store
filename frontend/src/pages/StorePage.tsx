import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import ProductsList from '../components/ProductsList';
import StoreHeader from '../components/StoreHeader';
import Pages from '../components/StoreHeader';
import ItemsNav from '../components/ItemsNav';


const StorePage: React.FC = ({children}) => {
  return (
    <>
      <StoreHeader children={children}/>
      <Outlet />
    </>
  );
};

export default StorePage;