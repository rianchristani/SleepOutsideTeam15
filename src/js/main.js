import cartCounter from "./cartCounter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productListHTML = document.querySelector(".product-list");
const dataSource = new ProductData();
const productList = new ProductList("tents", dataSource, productListHTML);
cartCounter();
productList.init();
