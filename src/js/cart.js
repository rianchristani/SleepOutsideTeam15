import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CartData from "./CartData.mjs";
import cartCounter from "./cartCounter.mjs";


// loadHeaderFooter(cartCounter);
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
updateCartPrice();
cartData.init();
