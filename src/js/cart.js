import { getLocalStorage } from "./utils.mjs";
import  CartData  from "./CartData.mjs"


const cartItems = getLocalStorage("so-cart");
const productList = document.querySelector(".product-list");
const cartData = new CartData(cartItems,productList);
const price = document.querySelector(".cart-footer");

cartData.init();

export function updadeCartPrice(){
    let totalAmount = 0
    const items = cartData.cartItems

    if (items != 0) {
        price.style.display = "block";

        items.forEach(i => {
            totalAmount += parseFloat(i.FinalPrice) * parseFloat(i.quantity);
        });
    } else {
        price.style.display = "none";
    }

        price.textContent = `Total: $${totalAmount}`;
}

updadeCartPrice();