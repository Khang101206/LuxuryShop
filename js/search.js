import { sortedProducts } from "./product.js";

const inputNode = document.querySelector('.search-header');
const searchInputNode = document.querySelector('.search-input input');

searchInputNode.addEventListener('input', function (e) {
  const txtSearch = e.target.value.trim().toLowerCase();

  const filterProducts = sortedProducts.filter((item) => {
    return item.name.toLowerCase().includes(txtSearch.toLowerCase());
  });


  const productSearchNode = document.querySelector('.products-search');
  productSearchNode.classList.remove('hide');
  productSearchNode.innerHTML = '';

  filterProducts.forEach((item) => {
    const productNode = document.createElement('a');
    productNode.classList.add('search-item');
    productSearchNode.appendChild(productNode);
    productNode.href = `detail.html?id=${item.id}`;
    productNode.innerHTML = `
      <img src="${item.imgProduct}">
      <p>${item.name}</p>
    `;
  });
});

const listProductsNode = document.querySelectorAll('.search-item');

inputNode.addEventListener('blur',()=>{
    listProductsNode.forEach(item=>{
        setTimeout(() => {
            item.classList.add('hide'); 
        }, 100);
    })
})