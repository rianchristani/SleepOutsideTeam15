import cartCounter from "./cartCounter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");

const selector = document.querySelector(".order-selector");

const types = ["Name", "Price"];
const directions = ["Asc", "Desc"];

for (let i = 0; i < types.length; i++) {
  for (let j = 0; j < directions.length; j++) {
    const element = document.createElement("option");
    const value = `${types[i]} ${directions[j]}`;
    element.value = value;
    element.textContent = value;

    selector.appendChild(element);
  }
}

const dataSource = new ProductData();
const productListHTML = document.querySelector(".product-list");
const productsTitle = document.querySelector(".products h2");
productsTitle.textContent += `: ${category}`;
const productListing = new ProductList(category, dataSource, productListHTML);
cartCounter();

productListing.init();

selector.addEventListener("change", (e) => {
  productListing.init(e.target.value);
});
