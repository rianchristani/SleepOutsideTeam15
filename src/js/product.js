import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import cartCounter from "./cartCounter.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(cartCounter);
const productId = getParam("product");
const dataSource = new ExternalServices("tents");

const product = new ProductDetails(productId, dataSource);
// cartCounter();
product.init();
