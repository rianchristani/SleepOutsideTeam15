import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productListHTML = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("tents",dataSource,productListHTML);
productList.init();
