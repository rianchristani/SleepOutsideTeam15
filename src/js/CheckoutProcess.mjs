import { getLocalStorage } from "./utils.mjs";

function checkoutTemplate(itemTotal,shipping,tax,orderTotal){

  return `
        <h2>Order Summary</h2>
        <ul>
            <li>Subtotal: $ ${itemTotal.toFixed(2)}</li>
            <li>Tax $ ${tax.toFixed(2)}</li>
            <li>Shipping Estimate $ ${shipping.toFixed(2)}</li>
            <li>Order Total: $ ${orderTotal.toFixed(2)}</li>
        </ul>
  `

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
    this.calculateItemSubTotal();
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const reducedTotal = this.list.reduce((acc,item) => item.FinalPrice * item.quantity + acc, 0);
    this.itemTotal = reducedTotal;
  }

  calculateItemSummary() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10 + 2 * (this.list.length - 1);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(this.outputSelector).innerHTML = checkoutTemplate(
      this.itemTotal, this.shipping, this.tax, this.orderTotal
    );
  }
}
