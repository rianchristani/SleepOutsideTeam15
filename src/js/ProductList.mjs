import { renderListWithTemplate, sortBy } from "./utils.mjs";

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
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
  }

  renderList() {
    renderListWithTemplate(
      productCardTemplate,
      this.outputHTML,
      this.productList,
    );
  }
}
