import { getLocalStorage } from "./utils.mjs";
import  CartData  from "./CartData.mjs"


const cartItems = getLocalStorage("so-cart");
const productList = document.querySelector(".product-list");
const cartData = new CartData(cartItems,productList);

cartData.init();
