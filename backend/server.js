import express from "express";
import cors from "cors";

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./database.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.send(product);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name_product, quantidade_product, valor_product, tipo_product } =
    req.body;
  const product = await updateProduct(
    name_product,
    quantidade_product,
    valor_product,
    tipo_product,
    id
  );

  res.send(product);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await deleteProduct(id);

  res.send(product);
});

app.post("/", async (req, res) => {
  const { name_product, quantidade_product, valor_product, tipo_product } =
    req.body;

  const [product] = await createProduct(
    name_product,
    quantidade_product,
    valor_product,
    tipo_product
  );

  res.status(201).send(product);
});

app.listen(5172, () => {
  console.log("Servidor rodando na porta 5172...");
});
