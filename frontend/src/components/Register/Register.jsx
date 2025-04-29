import React, { useState, useEffect, useContext } from "react";
import "./register.css";
import { AppContextContext } from "../../context/AppContext";
import axios from "axios";

const Register = () => {
  const {
    products,
    setProducts,
    filter,
    setFilter,
    showRegister,
    setShowRegister,
    showComponent,
    name,
    setName,
    value,
    setValue,
    quantity,
    setQuantity,
    type,
    setType,
    setError,
  } = useContext(AppContextContext);

  const [itemAddToEstoque, setItemAddToEstoque] = useState(false);

  const addProducts = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        name_product: name,
        quantidade_product: quantity,
        valor_product: value,
        tipo_product: type,
      };

      if (newProduct) {
        const response = await axios.post("http://localhost:5172", newProduct);
        const createdProduct = response.data;
        setFilter((prevProducts) => [...prevProducts, createdProduct]);
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setQuantity("");
      setValue("");
      setType("");
    }
    setTimeout(() => {
      setItemAddToEstoque(true);  
      setTimeout(() => {
        setItemAddToEstoque(false);
      },4000);
    },0);
  };

  const clearProducts = () => {
    setName("");
    setQuantity(0);
    setValue(0);
    setType("");
  };

  return (
    <>
      <section className="allSectionContent">
        <div>
          <button
            className="closeRegister"
            onClick={() => setShowRegister(!showRegister)}
          >
            X
          </button>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            placeholder="Nome do Produto"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="nome"
          />
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            placeholder="Quantidade de Itens"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            name="quantidade"
          />
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            placeholder="Valor do Produto"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name="valor"
          />
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            placeholder="Tipo do Produto"
            onChange={(e) => setType(e.target.value)}
            value={type}
            name="tipo"
          />
          <button className="registerProduct" onClick={addProducts}>
            Cadastrar
          </button>
          <button className="clearProduct" onClick={() => clearProducts()}>
            Limpar
          </button>
          {itemAddToEstoque === true ? (
            <h1 className="divItemAdd">Item Adicionado</h1>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Register;
