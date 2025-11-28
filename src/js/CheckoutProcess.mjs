import { alertMessage, getLocalStorage,removeLocalStorage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function checkoutTemplate(itemTotal, shipping, tax, orderTotal) {

  return `
        <h3>Details</h3>
        <ul>
            <li>Tax $ ${tax.toFixed(2)}</li>
            <li>Shipping Estimate $ ${shipping.toFixed(2)}</li>
            <li>Order Total: $ ${orderTotal.toFixed(2)}</li>
        </ul>
  `

}

function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
  return simplifiedItems;
}

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}


export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = `$${this.itemTotal}`;;
  }


  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10 + 2 * (this.list.length - 1);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #summary-details`).innerHTML = checkoutTemplate(
      this.itemTotal, this.shipping, this.tax, this.orderTotal
    );
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);
    
    try {
      // Redirect to sucess html
      const response = await services.checkout(order);      
      window.location.href = "/checkout/sucess.html";
      removeLocalStorage(this.key);
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  }
}
