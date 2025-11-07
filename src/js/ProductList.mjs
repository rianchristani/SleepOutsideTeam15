import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        this.list = await this.dataSource.getData();
        this.renderList();
    }

    renderList() {
        renderListWithTemplate(productCardTemplate, this.listElement, this.list);
    }
}


// ProductList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
          <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}"
              alt="${product.Name} tent" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
          </a>
        </li>`
}