import cartCounter from "./cartCounter.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.selectedColor = null;
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
      this.product.selectedColor = this.selectedColor || "Default Color"; // set selected color
      productsInCart.push(this.product);
    }

    setLocalStorage("so-cart", productsInCart);
    alertMessage("Product added");
    this.addCartAnimation();
    cartCounter();
  }

  addCartAnimation() {
    const cart = document.querySelector("#cart");
    cart.classList.add("cart-animation");
    setTimeout(() => cart.classList.remove("cart-animation"), 1500);
  }

  renderProductDetails() {
    const productCategory = document.querySelector("#product-category");
    const category = this.product["Category"].toUpperCase();
    productCategory.textContent = `Product Category: ${category}`;
    const template = document.getElementById("product-detail");
    const renderedHTML = document.getElementById("rendered-product-detail");
    const clone = template.content.cloneNode(true);
    const [brand, name, img, finalPrice, suggestedPrice, color, description, button] =
      clone.querySelectorAll("h3, h2, img, p, p, p, p, button");


    brand.textContent = this.product["Brand"]["Name"];
    name.textContent = this.product["NameWithoutBrand"];
    console.table(this.product["Images"]);
    img.setAttribute("src", this.product["Images"]["PrimaryLarge"]);
    img.setAttribute("srcset", `${this.product.Images.PrimaryMedium} 160w,${this.product.Images.PrimaryLarge} 320w, ${this.product.Images.PrimaryExtraLarge} 600w`);
    img.setAttribute("sizes", `(min-width: 1000px) 600px,(min-width: 600px) 320px,160px`);
    finalPrice.textContent = `$ ${this.product["FinalPrice"]}`;
    suggestedPrice.textContent = `$ ${this.product["SuggestedRetailPrice"]}`;
    //color.textContent = this.product["Colors"]["ColorName"];
    //colors.innerHTML = "";

    // itarate through colors and create an element for each color option
    this.product.Colors.forEach((col) => {
      const option = document.createElement("p");
      const colorName = col.ColorName;

      const optionImg = document.createElement("img");
      optionImg.setAttribute("src", col.ColorChipImageSrc);
      optionImg.setAttribute("alt", colorName);

      option.style.fontSize = "10px";

      optionImg.classList.add("color-circle"); // CSS class for styling
      optionImg.style.width = "22px";
      optionImg.style.height = "22px";
      optionImg.style.borderRadius = "50%";
      optionImg.style.objectFit = "cover";
      optionImg.style.cursor = "pointer";
      optionImg.style.transition = "border 0.2s ease";

      option.textContent = colorName;

      optionImg.addEventListener("click", () => {
        document.querySelectorAll(".color-circle").forEach(img => {
          img.style.border = "none";
        });

        // add border to the selected color
        this.setNewColor(colorName);
        optionImg.style.border = "3px solid #0004ffff";

      });

      color.appendChild(optionImg);
      color.appendChild(option);
    });

    description.innerHTML = this.product["DescriptionHtmlSimple"];
    button.setAttribute("data-id", this.productId);
    button.setAttribute("id", "addToCart");
    button.addEventListener("click", this.addProductToCart.bind(this));
    renderedHTML.appendChild(clone);
  }

  // method to set the selected color
  setNewColor = (colorName) => {
    this.selectedColor = colorName;
  }


}

