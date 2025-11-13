import { renderListWithTemplate, setLocalStorage } from "./utils.mjs";
import { updateCartPrice } from "./cart.js";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">  
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">
    <img src="../images/icons/circle-icon.svg" alt="Remove Icon" width="28" loading="lazy">
  </span>
</li>`;

  return newItem;
}

export default class CartData {
  constructor(cartItems, outputHTML) {
    this.cartItems = cartItems;
    this.outputHTML = outputHTML;
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    renderListWithTemplate(
      cartItemTemplate,
      this.outputHTML,
      this.cartItems,
      "afterbegin",
      true,
    );
    document.querySelectorAll(".remove-item").forEach((removeIcon) => {
      removeIcon.addEventListener("click", () => {
        this.removeItem(removeIcon.dataset.id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.Id !== id);
    setLocalStorage("so-cart", this.cartItems);
    this.renderCartContents();
    updateCartPrice();
  }
}
