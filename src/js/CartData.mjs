import { renderListWithTemplate, setLocalStorage } from "./utils.mjs";

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
  <span class="addOne-item" data-id="${item.Id}"> <img src="../images/icons/plus-circle-icon.svg" alt="Add One Icon" width="20" loading="lazy"> Add Item</span>
  <span class="removeOne-item" data-id="${item.Id}"> <img src="../images/icons/minus-circle-icon.svg" alt="Remove One Icon" width="20" loading="lazy"> Remove Item</span>
</li>`;

  return newItem;
}

export default class CartData {
  constructor(cartItems, outputHTML, priceElement) {
    this.cartItems = cartItems;
    this.outputHTML = outputHTML;
    this.price = priceElement;
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

    document.querySelectorAll(".addOne-item").forEach((addOneIcon) => {
      addOneIcon.addEventListener("click", () => {
        this.addOneItem(addOneIcon.dataset.id);
      });
    });

    document.querySelectorAll(".removeOne-item").forEach((removeOneIcon) => {
      removeOneIcon.addEventListener("click", () => {
        this.removeOneItem(removeOneIcon.dataset.id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.Id !== id);
    setLocalStorage("so-cart", this.cartItems);
    this.renderCartContents();
    this.updatePrice();
  }

  addOneItem(id) {
    const itemToUpdate = this.cartItems.find((cartItem) => cartItem.Id === id);

    if(itemToUpdate) {
      itemToUpdate.quantity += 1;
    }

    setLocalStorage("so-cart", this.cartItems);
    this.renderCartContents();
    this.updatePrice();
  }

  removeOneItem(id) {
    const itemToUpdate = this.cartItems.find((cartItem) => cartItem.Id === id);

    if(itemToUpdate){
      itemToUpdate.quantity -= 1;
    }

    if(itemToUpdate.quantity <= 0){
      this.removeItem(id)
    }

    setLocalStorage("so-cart", this.cartItems);
    this.renderCartContents();
    this.updatePrice();
  }

    updatePrice() {
    let totalAmount = 0;
    const items = this.cartItems;

    if (items != 0) {
      this.price.style.display = "block";

    items.forEach((i) => {
        totalAmount += parseFloat(i.FinalPrice) * parseFloat(i.quantity);
      });
    } else {
      this.price.style.display = "none";
    }

    this.price.textContent = `Total: $${totalAmount.toFixed(2)}`;
  }

}