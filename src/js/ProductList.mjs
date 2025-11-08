import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="cart-card divider">
            <a href="product_pages/?product=${product.Id}" class="cart-card__image">
              <img
                src="${product.Image}"
                alt="Image of ${product.NameWithoutBrand}"
              />
            </a>
            <a href="product_pages/?product=${product.Id}">
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
            </a>
            <p class="cart-card__color">${product.Colors.ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${product.FinalPrice}</p>
          </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElementId) {
        this.dataSource = dataSource;
        this.category = category;
        this.listElementId = listElementId;
    }
    async init() {
        // use the datasource to get the list of products for the current category. 
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(productList) {
        const listElement = document.getElementById(this.listElementId);
        renderListWithTemplate(productCardTemplate, listElement, productList);
    }

}
