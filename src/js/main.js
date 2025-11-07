import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs";

const category = "tents";
const tents = new ProductData(category);

new ProductList(category, tents, document.querySelector(".product-list")).init();
