import React, { useContext } from "react";
import Table from "../src/components/Table/Table";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart";
import "./home-style.css";
import { AppContextContext } from "../src/context/AppContext";

const Home = () => {
  const { mostrarQRCode, setMostrarQRCode } = useContext(AppContextContext);
  return (
    <>
      <Table />
      <ShoppingCart />
    </>
  );
};

export default Home;
