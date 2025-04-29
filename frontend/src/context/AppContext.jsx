import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContextContext = createContext();

function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [cart, setCart] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");

  const [mostrarQRCode, setMostrarQRCode] = useState(false);

  const totalQuantity = cart.reduce((acc, product) => {
    return acc + product.quantidade_product * product.valor_product;
  }, 0);

  const showComponent = () => {
    setShowRegister(!showRegister);
  };

  const updateStock = async (id, quantidadeComprada) => {
    const productInStock = filter.find((product) => product.id_product === id);

    const response = await axios.put(`http://localhost:5172/${id}`, {
      name_product: productInStock.name_product,
      quantidade_product:
        productInStock.quantidade_product - quantidadeComprada,
      valor_product: productInStock.valor_product,
      tipo_product: productInStock.tipo_product,
    });

    if (
      productInStock &&
      productInStock.quantidade_product >= quantidadeComprada
    ) {
      productInStock.quantidade_product -= quantidadeComprada;
      setProducts((prevItens) => [...prevItens, response.data]);
    } else {
      alert("Quantidade Insuficiente");
    }
  };

  const orderComplete = () => {
    cart.forEach((item) => {
      const findItem = filter.find(
        (product) => product.id_product === item.id_product
      );
      if (findItem) {
        const update = updateStock(item.id_product, item.quantidade_product);
        return update;
      } else {
        alert("Não encontrado no estoque");
      }
    });
    setCart([]);
    setMostrarQRCode(true);
  };

  return (
    <AppContextContext.Provider
      value={{
        products,
        setProducts,
        filter,
        setFilter,
        cart,
        setCart,
        totalQuantity,
        showComponent,
        showRegister,
        setShowRegister,
        name,
        setName,
        value,
        setValue,
        quantity,
        setQuantity,
        type,
        setType,
        updateStock,
        orderComplete,
        mostrarQRCode,
        setMostrarQRCode,
      }}
    >
      {children}
    </AppContextContext.Provider>
  );
}

export default AppContextProvider;
