import { renderListWithTemplate, sortBy, titleForCategory, categories, searchingInProducts } from "./utils.mjs";

function productCardTemplate(product) {
  let productPrice = `<p class="product-card__price">$${product.FinalPrice}</p>`;
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    productPrice = `
    <div class="discounted-product">
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product-card__suggested_price">$${product.SuggestedRetailPrice}</p>
    </div>
    `
  }
  return `
  <li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      ${productPrice}
    </a>
    <span class="more-Info">&#128712;</span>
      <div class="modal">
        <div class="modal-content">
        <span class="close">&times;</span>
        <h1 class="card__brand">${product.Brand.Name}</h1>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="">${product.DescriptionHtmlSimple}</p>
        <p>Total reviews: ${product.Reviews.ReviewCount} Avarage Rating: ${product.Reviews.AverageRating}</p>
        </div>
      </div>  
  </li>
  `;
}


export default class ProductList {
  constructor(category, dataSource, outputHTML) {
    this.category = category;
    this.dataSource = dataSource;
    this.outputHTML = outputHTML;
    this.productList = [];
  }

  async init(sort = "") {
    this.productList = await this.dataSource.getData(this.category);

    if (sort) {
      this.productList = sortBy(this.productList, sort);
    }

    this.renderList();
    const title = document.querySelector("#title");
    title.textContent = `Top Products: ${titleForCategory(this.category)}: ${this.productList.length} items found`;
  }

  addModalListeners(){
    const infoBtn = document.querySelectorAll(".more-Info");
    const closeBtn = document.querySelectorAll(".close");

    infoBtn.forEach(button => {
      button.addEventListener("click", (e) =>{
        e.preventDefault();

        const modal = e.target.closest("li").querySelector(".modal");
        modal.style.display = "block";
      })
    })

    closeBtn.forEach(button =>{
      button.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal");
        modal.style.display = "none";
      })
    })
  }

  async initsearch(sort = "") {
    this.productList = [];
    let cat = categories();
    for (let i = 0; i < cat.length; i++) {
      this.productList.push(await this.dataSource.getData(cat[i]));
    }
    this.productList = this.productList.flat();
    this.productList = searchingInProducts(this.productList, this.category);

    if (sort) {
      this.productList = sortBy(this.productList, sort);
    }


    this.renderList();
  }

  renderList() {
    renderListWithTemplate(
      productCardTemplate,
      this.outputHTML,
      this.productList,
    );
    this.addModalListeners();
  }
}
