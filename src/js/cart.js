import { getLocalStorage } from "./utils.mjs";
import CartData from "./CartData.mjs";
import cartCounter from "./cartCounter.mjs";

const cartItems = getLocalStorage("so-cart");
const productList = document.querySelector(".product-list");
const cartData = new CartData(cartItems, productList);
const price = document.querySelector(".cart-footer");

export function updateCartPrice() {
  let totalAmount = 0;
  const items = cartData.cartItems;

  if (items != 0) {
    price.style.display = "block";

    items.forEach((i) => {
      totalAmount += parseFloat(i.FinalPrice) * parseFloat(i.quantity);
    });
  } else {
    price.style.display = "none";
  }

  price.textContent = `Total: $${totalAmount}`;
}

cartCounter();
updateCartPrice();
cartData.init();
