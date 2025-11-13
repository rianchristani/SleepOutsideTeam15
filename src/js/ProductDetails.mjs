import cartCounter from "./cartCounter.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product.
    // findProductById will return a promise! use await or .then() to process it
    // the product details are needed before rendering the HTML
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing.
    // Review the readings from this week on "this" to understand why.
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    // console.log(document.getElementById("addToCart"));
    // .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let productsInCart = getLocalStorage("so-cart");
    if (!productsInCart) {
      productsInCart = [];
    }
    const previous = productsInCart.filter(
      (item) => item.Id == this.product.Id,
    );
    if (previous.length > 0) {
      previous[0].quantity += 1;
    } else {
      this.product.quantity = 1;
      productsInCart.push(this.product);
    }

    setLocalStorage("so-cart", productsInCart);
    cartCounter();
  }

  renderProductDetails() {
    const template = document.getElementById("product-detail");
    const renderedHTML = document.getElementById("rendered-product-detail");
    const clone = template.content.cloneNode(true);
    const [brand, name, img, price, color, description, button] =
      clone.querySelectorAll("h3, h2, img, p, p, p, button");

    brand.textContent = this.product["Brand"]["Name"];
    name.textContent = this.product["NameWithoutBrand"];
    img.setAttribute("src", this.product["Images"]["PrimaryLarge"]);
    price.textContent = `$ ${this.product["ListPrice"]}`;
    color.textContent = this.product["Colors"]["ColorName"];
    description.innerHTML = this.product["DescriptionHtmlSimple"];
    button.setAttribute("data-id", this.productId);
    button.setAttribute("id", "addToCart");
    button.addEventListener("click", this.addProductToCart.bind(this));
    renderedHTML.appendChild(clone);
  }
}
