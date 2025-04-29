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
      {mostrarQRCode && (
        <div className="all-content-qr-code">
          <p>Escaneie o QR Code para pagar:</p>
          <img
            src="\QrCodePix.png"
            alt="QR Code para pagamento"
            className="qr-code"
          />
          <button onClick={()=>setMostrarQRCode(false)}>Fechar</button>
        </div>
      )}
    </>
  );
};

export default Home;
