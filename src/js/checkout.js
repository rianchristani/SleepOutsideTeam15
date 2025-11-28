import { loadHeaderFooter } from "./utils.mjs";
import cartCounter from "./cartCounter.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(cartCounter);
const checkout = new CheckoutProcess("so-cart", "article");
checkout.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.getElementsByName("checkout")[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    checkout.checkout();
  }
});
