import React, { useContext, useState } from "react";
import "./shopping-cart.css";
import { AppContextContext } from "../../context/AppContext";
import { AiOutlineClose } from "react-icons/ai";

const ShoppingCart = () => {
  const {
    cart,
    setCart,
    totalQuantity,
    filter,
    orderComplete,
    mostrarQRCode,
    setMostrarQRCode,
  } = useContext(AppContextContext);

  const handleRemoveCart = (id) => {
    setCart((prevItens) =>
      prevItens.filter((product) => product.id_product !== id)
    );
  };

  const handleAdd = (id) => {
    const productAdd = filter.find((product) => product.id_product === id);

    setCart((prevProduct) => {
      const existingProduct = prevProduct.findIndex(
        (item) => item.id_product === productAdd.id_product
      );
      if (existingProduct >= 0) {
        const updateCart = prevProduct.map((item, index) =>
          index === existingProduct
            ? {
                ...item,
                quantidade_product:
                  item.quantidade_product < productAdd.quantidade_product
                    ? item.quantidade_product + 1
                    : item.quantidade_product,
              }
            : item
        );
        return updateCart;
      }
    });
  };

  const handleSub = (id) => {
    const productAdd = filter.find((product) => product.id_product === id);

    setCart((prevProduct) => {
      const existingProduct = prevProduct.findIndex(
        (item) => item.id_product === productAdd.id_product
      );
      if (existingProduct >= 0) {
        const updateCart = prevProduct.map((item, index) =>
          index === existingProduct && item.quantidade_product > 1
            ? { ...item, quantidade_product: item.quantidade_product - 1 }
            : item
        );
        return updateCart;
      } else {
        alert("Error");
      }
    });
  };

  return (
    <>
      <aside>
        <h1>Estoque Pioneiro</h1>
        <div className="carProducts">
          {cart.map((product, i) => (
            <ul key={i} className="carProductsList">
              <li>{product.name_product}</li>
              <li>{product.quantidade_product}x</li>
              <div className="qtdContent">
                <button onClick={() => handleSub(product.id_product)}>-</button>
                <button onClick={() => handleAdd(product.id_product)}>+</button>
              </div>
              <li style={{ marginRight: 15 }}>
                R$ {Number(product.valor_product).toFixed(2).replace(".", ",")}
              </li>
              <button
                onClick={() => handleRemoveCart(product.id_product)}
                className="removeBtnCart"
              >
                <AiOutlineClose />
              </button>
            </ul>
          ))}
        </div>
        <div>
          {mostrarQRCode &&(
            <div className="all-content-qr-code">
              <p>Escaneie o QR Code para pagar:</p>
              <img
                src="\QrCodePix.png"
                alt="QR Code para pagamento"
                className="qr-code"
              />
              <button onClick={() => setMostrarQRCode(false)}>Fechar</button>
            </div>
          )}
        </div>

        <div className="finishBuyContent">
          <p>Total</p>
          <span> R${totalQuantity.toFixed(2).replace(".", ",")}</span>
          <button
            className="orderComplete"
            onClick={() => orderComplete(totalQuantity)}
          >
            Finalizar Compra
          </button>
        </div>
      </aside>
    </>
  );
};

export default ShoppingCart;
