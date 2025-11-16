import cartCounter from "./cartCounter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(cartCounter);

const category = getParam("category");
const productListHTML = document.querySelector(".product-list");
const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, productListHTML);
productList.init();
