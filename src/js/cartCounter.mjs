export default function cartCounter() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cart = document.querySelector(".cart");

  if (cartItems.length > 0) {
    const counter = document.createElement("div");
    counter.classList.add("cart-counter");
    cart.style.position = "relative";

    counter.style.background = "var(--primary-color)";
    counter.style.height = "20px";
    counter.style.width = "20px";
    counter.style.borderRadius = "50%";
    counter.style.position = "absolute";
    counter.style.top = 0;
    counter.style.right = 0;
    counter.style.color = "white";
    counter.style.fontSize = "12px";
    counter.style.display = "flex";
    counter.style.justifyContent = "center";
    counter.style.alignItems = "center";
    counter.textContent = cartItems.length;

    cart.appendChild(counter);
  }
}
