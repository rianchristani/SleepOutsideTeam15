import cartCounter from "./cartCounter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

let category = getParam("searching");
if (category == null) {
  category = "";
}

loadHeaderFooter(cartCounter);
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
productListing.initsearch();
selector.addEventListener("change", (e) => {
  productListing.initsearch(e.target.value);
});
