import { sortedProducts } from "./product.js";
const mainContentNode = document.querySelector('.main-content');
const brandItemNode = document.querySelector('.brand-item');
const brandListNode = document.querySelector('.brand-list');
const categoryListNode = document.querySelector('.category-list');
const categoryItemNode = document.querySelector('.category-item');
let categoryItems = sortedProducts.map(item => item.category);
let aCategory = [...new Set(categoryItems)];


/**
 * The function creates a list of brand names as links to their respective brand pages.
 */
function brand(){
    sortedProducts.forEach((item)=>{
        const brandNode = document.createElement('li');
        brandItemNode.appendChild(brandNode);
        brandNode.innerHTML=`<a id="brand_a" class="header-item-item" href="brand.html?brand=${item.brand}"><p>${item.brand}</p></a>`;
    })
    sortedProducts.forEach((item)=>{
      const brandNode = document.createElement('li');
      brandListNode.appendChild(brandNode);
      brandNode.innerHTML =`<a href="brand.html?brand=${item.brand}" style="width: 1000px;">${item.brand}</a>`;
  })
}
brand();

/**
 * This function creates a list of categories with links to a brand page.
 */
function category(){
    aCategory.forEach((item)=>{
        const categoryNode = document.createElement('li');
        categoryItemNode.appendChild(categoryNode);
        categoryNode.innerHTML=`<a id="category_a" class="header-item-item" href="brand.html?category=${item}"><p>${item}</p></a>`;
    })
    aCategory.forEach((item)=>{
      const categoryNode = document.createElement('li');
      categoryListNode.appendChild(categoryNode);
      categoryNode.innerHTML=`<a href="brand.html?category=${item}">${item}</a>`;
  })
}
category();

/**
 * The function renders all products by creating a card element for each product and appending it to
 * the main content node, with details such as product image, name, price, and retail price.
 */
function renderAllProducts(){
  sortedProducts.forEach((product)=>{
        const productNode = document.createElement('a');
        productNode.classList.add('card');
        productNode.href = `detail.html?id=${product.id}`;
        mainContentNode.appendChild(productNode);
        productNode.innerHTML=`
            <div class="card-img">
                <div><img class="visible-img" src="${product.imgProduct}"></div>
                <div><img class="hidden-img" src="${product.hiddenImgProduct}"></div>
            </div>
            <div class="card-name">${product.name}</div>
            <div class="price-card"><p>$${product.price}</p><p class="retail-price">Retail price: ${product.retailPrice}</p></div>
        `;
    })
}

/**
 * The function renders products by category on a webpage using data from an array of products.
 * @returns The function does not have a return statement, so it returns undefined.
 */
function renderProductsByCategory() {
    const params = new URLSearchParams(window.location.search);
    let category = params.get("category");

    if (category === "All") {
      renderAllProducts();
      return;
    } 

    const productCategory = sortedProducts.filter((item) => item.category === category);
  
    productCategory.forEach((product) => {
        console.log(product);
      const productNode = document.createElement("a");
      productNode.classList.add("card");
      productNode.href = `detail.html?id=${product.id}`;
      mainContentNode.appendChild(productNode);
      productNode.innerHTML = `
        <div class="card-img">
          <div><img class="visible-img" src="${product.imgProduct}"></div>
          <div><img class="hidden-img" src="${product.hiddenImgProduct}"></div>
        </div>
        <div class="card-name">${product.name}</div>
        <div class="price-card">
          <p>$${product.price}</p>
          <p class="retail-price">Retail price: ${product.retailPrice}</p>
        </div>
      `;
    });
  }

  renderProductsByCategory();

/**
 * The function renders products by brand based on the brand parameter in the URL, and if the brand is
 * "All", it renders all products.
 * @returns The function is not returning anything explicitly, but it is rendering a list of products
 * filtered by brand on the webpage.
 */
function renderProductsByBrand() {
    const params = new URLSearchParams(window.location.search);
    let brand = params.get("brand");

    if (brand === "All") {
      renderAllProducts();
      return;
    } 

    const productBrand = sortedProducts.filter((item) => item.brand === brand);
  
    productBrand.forEach((product) => {
      const productNode = document.createElement("a");
      productNode.classList.add("card");
      productNode.href = `detail.html?id=${product.id}`;
      mainContentNode.appendChild(productNode);
      productNode.innerHTML = `
        <div class="card-img">
          <div><img class="visible-img" src="${product.imgProduct}"></div>
          <div><img class="hidden-img" src="${product.hiddenImgProduct}"></div>
        </div>
        <div class="card-name">${product.name}</div>
        <div class="price-card">
          <p>$${product.price}</p>
          <p class="retail-price">Retail price: ${product.retailPrice}</p>
        </div>
      `;
    });
  }
  
renderProductsByBrand()

const productCountNode = document.querySelector('.cart-button div');
let countProduct = 0;
const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
localStorageCart.forEach(item => {
  countProduct += item.quantity;
  productCountNode.innerText = countProduct;
});
if(productCountNode.innerText===''){
  productCountNode.classList.remove('quantity-product')
}
console.log(productCountNode.innerText);


/* This code is creating click event listeners for three different buttons: `boxMenuButton`,
`boxCategoryListNode`, and `boxBrandListNode`. */

const menuBoxNode = document.querySelector('.menu-box');
const boxMenuButton = document.querySelector('.three-bars');
const boxCategoryListNode = menuBoxNode.querySelector('.menu-box-category-list');
const boxBrandListNode = menuBoxNode.querySelector('.menu-box-brand-list');

let clickCounter=0;

boxMenuButton.onclick=function() {
  clickCounter++;
  if (clickCounter==1){
    menuBoxNode.classList.add('menu-box--open')
  }
  if (clickCounter==2) {
    menuBoxNode.classList.remove('menu-box--open')
    clickCounter=0;
  }
};

let clickListCounterCategory = 0;
let clickListCounterBrand = 0;

boxCategoryListNode.onclick=function() {
    clickListCounterCategory++;
    if(clickListCounterCategory==1){
        categoryListNode.classList.add('category-list_on');
    }
    if (clickListCounterCategory==2) {
        categoryListNode.classList.remove('category-list_on');
        clickListCounterCategory=0;
    }
  };

  boxBrandListNode.onclick=function() {
    clickListCounterBrand++;
    if(clickListCounterBrand==1){
        brandListNode.classList.add('brand-list_on');
    }
    if (clickListCounterBrand==2) {
        brandListNode.classList.remove('brand-list_on');
      clickListCounterBrand=0;
    }
};