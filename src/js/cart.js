import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CartData from "./CartData.mjs";
import cartCounter from "./cartCounter.mjs";

loadHeaderFooter(cartCounter);
const cartItems = getLocalStorage("so-cart");
const productList = document.querySelector(".product-list");
const price = document.querySelector(".cart-footer");
const cartData = new CartData(cartItems, productList, price);

cartData.init();
cartData.updatePrice();
