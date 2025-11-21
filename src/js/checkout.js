import { loadHeaderFooter } from "./utils.mjs";
import cartCounter from "./cartCounter.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(cartCounter);
const checkout = new CheckoutProcess("so-cart","article");
checkout.init();
