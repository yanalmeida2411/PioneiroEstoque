import React, { useState, useEffect, useContext } from "react";
import "./table.css";
import axios from "axios";
import { AppContextContext } from "../../context/AppContext";
import Register from "../Register/Register";

const Table = () => {
  const {
    products,
    setProducts,
    filter,
    setFilter,
    cart,
    setCart,
    showRegister,
    showComponent,
  } = useContext(AppContextContext);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5172/")
      .then((response) => {
        setProducts(response.data);
        setFilter(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5172/${id}`);
      setFilter((prevItens) =>
        prevItens.filter((product) => product.id_product !== id)
      );
      setProducts((prevItens) =>
        prevItens.filter((product) => product.id_product !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = (type) => {
    if (
      type === "fardamentos" ||
      type === "roupas" ||
      type === "acessorios" ||
      type === "outros"
    ) {
      setFilter(products.filter((product) => product.tipo_product === type));
    } else {
      setFilter(
        products.filter((product) => product.tipo_product !== undefined)
      );
    }
  };

  const handleSearch = (name) => {
    const filterProductName = products.filter(
      (product) => product.name_product.toLowerCase() === name.toLowerCase()
    );
    setFilter(filterProductName);
    setSearch("")
  };

  const handleSell = (id) => {
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
      } else if (productAdd.quantidade_product === 0) {
        alert("Quantidade Insuficiente no Estoque");
        return [...prevProduct];
      } else {
        return [...prevProduct, { ...productAdd, quantidade_product: 1 }];
      }
    });
  };

  return (
    <>
      <div className="allContent">
        <section className="allContentTable">
          <nav>
            <div className="filterButtons">
              <button onClick={() => handleFilter("x")}>Todos</button>
              <button onClick={() => handleFilter("fardamentos")}>
                Fardamentos
              </button>
              <button onClick={() => handleFilter("roupas")}>Roupas</button>
              <button onClick={() => handleFilter("acessorios")}>
                Acessórios
              </button>
              <button onClick={() => handleFilter("outros")}>Outros</button>
            </div>
            <button className="registerButton" onClick={showComponent}>
              Cadastrar
            </button>
            {showRegister === true ? <Register /> : undefined}
          </nav>
          <input
            type="text"
            placeholder="PROCURE UM PRODUTO"
            className="searchContent"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="searchButton" onClick={() => handleSearch(search)}>
            Procurar
          </button>
          <div className="productProfile">
            <h2>NOME</h2>
            <h2>QTD</h2>
            <h2>VALOR</h2>
            <h2>TIPO</h2>
            <h2>+</h2>
          </div>
          <div className="allMapContent ">
            {filter.map((product, i) => {
              const productInStock = filter.find(
                (products) => products.id_product === product.id_product
              );

              const qtdZerada = productInStock.quantidade_product === 0;
              const alertQtd = productInStock.quantidade_product < 10;

              return (
                <ul
                  key={i}
                  className={
                    alertQtd ? "productMapContentRed" : "productMapContentWhite"
                  }
                >
                  <li>{product.name_product}</li>
                  <li>
                    {product.quantidade_product <= qtdZerada
                      ? (product.quantidade_product = 0)
                      : product.quantidade_product}
                  </li>
                  <li>
                    R${" "}
                    {Number(product.valor_product).toFixed(2).replace(".", ",")}
                  </li>
                  <li>{product.tipo_product}</li>
                  <li>
                    <div className="configContent">
                      <button
                        onClick={() => handleRemove(product.id_product)}
                        className="removeProduct"
                      >
                        X
                      </button>
                      <button
                        onClick={() => handleSell(product.id_product)}
                        className="sellProduct"
                      >
                        Vender
                      </button>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Table;
