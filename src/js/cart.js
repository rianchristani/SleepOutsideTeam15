import { getLocalStorage } from "./utils.mjs";
import CartData from "./CartData.mjs";
import cartCounter from "./cartCounter.mjs";

const cartItems = getLocalStorage("so-cart");
const productList = document.querySelector(".product-list");
const cartData = new CartData(cartItems, productList);
cartCounter();
cartData.init();
