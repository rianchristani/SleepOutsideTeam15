import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from './Alert.js';

const alertSystem = new Alert('../json/alerts.json');
alertSystem.init();


const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();