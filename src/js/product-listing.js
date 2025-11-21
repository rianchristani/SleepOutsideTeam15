import cartCounter from "./cartCounter.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(cartCounter);

const category = getParam("category");
const productListHTML = document.querySelector(".product-list");
const dataSource = new ExternalServices();
const productList = new ProductList(category, dataSource, productListHTML);
productList.init();
