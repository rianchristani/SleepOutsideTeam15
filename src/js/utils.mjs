// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a url params
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(param);
  return paramValue;
}

//
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  //prevent errors if list is null or empty
  if (!list || !Array.isArray(list) || list.length === 0) {
    parentElement.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function sortBy(products, sortList) {
  const sortFunctions = {
    "Name Asc": (a, b) => a.Name.localeCompare(b.Name),
    "Name Desc": (a, b) => b.Name.localeCompare(a.Name),
    "Price Asc": (a, b) => a.LastPrice - b.LastPrice,
    "Price Desc": (a, b) => b.LastPrice - a.LastPrice,
  };

  const sortFunction = sortFunctions[sortList];

  return sortFunction ? products.sort(sortFunction) : products;
}

export function updateCartPrice(item) {
  const price = document.querySelector(".cart-footer");
  let totalAmount = 0;

  if (item != "") {
    price.style.display = "block";

    item.forEach((i) => {
      totalAmount += i.FinalPrice * i.quantity;
    });
  }
  if (price) {
    price.textContent = totalAmount;
  }
}
