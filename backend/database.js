import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getProducts() {
  const [products] = await pool.query(
    "SELECT * FROM pioneiro_estoque_db.product;"
  );
  return products;
}

export async function getProduct(id) {
  const [product] = await pool.query(
    `SELECT * 
    FROM pioneiro_estoque_db.product
    WHERE id_product = ?;`,
    [id]
  );
  return product;
}

export async function deleteProduct(id) {
  const [product] = await pool.query(
    `DELETE FROM product 
    WHERE id_product = ? ;`,
    [id]
  );

  return product;
}

export async function createProduct(
  name_product,
  quantidade_product,
  valor_product,
  tipo_product
) {
  const [product] = await pool.query(
    `
    INSERT INTO pioneiro_estoque_db.product(name_product,quantidade_product,valor_product,tipo_product)
    VALUES(?,?,?,?);`,
    [name_product, quantidade_product, valor_product, tipo_product]
  );

  const id = product.insertId;

  return getProduct(id);
}

export async function updateProduct(
  name_product,
  quantidade_product,
  valor_product,
  tipo_product,
  id_product
) {
  const [product] = await pool.query(
    `
    UPDATE product
    SET name_product = ? ,quantidade_product = ? ,valor_product = ? ,tipo_product = ? 
    WHERE id_product = ?;
    `,
    [name_product, quantidade_product, valor_product, tipo_product, id_product]
  );
  return product;
}
