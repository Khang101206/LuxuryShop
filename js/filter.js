import { sortedProducts } from "./product.js";
const applyFilterButton = document.querySelector('.apply-button_filter')
const filterNode = document.querySelector('.filter-button');
const boxFilter = document.querySelector('.filter-box')
const cancelFilterButton = document.querySelector('.cancel-button_filter');
const selectCategoryButton = document.querySelectorAll('.select_filter .category .btn');
const selectBrandButton = document.querySelectorAll('.select_filter .brand-item_filter .btn');
const selectMaterialButton = document.querySelectorAll('.select_filter .material-item_filter .btn');


applyFilterButton.addEventListener('click', () => {
  const userSelectedCategory = document.querySelector('.category_filter .category .active p').textContent;
  const userPriceRange = Number(document.querySelector('.range-slider_price input').value);
  const userSizeRange = Number(document.querySelector('.range-slider_size input').value);
  const userSelectedBrand = document.querySelector('.brand-item_filter .active p').textContent;
  const userSelectedMaterial = document.querySelector('.material-item_filter .active p').textContent;

  const filteredProducts = sortedProducts.filter((product) => {
    let price = Number(product.price);
    let size = Number(product.size.replace('mm',''));
    const conditions = [
      price <= userPriceRange,
      size <= userSizeRange,
    ]; // [true, false, true]
    if (userSelectedBrand !== 'All') {
      conditions.push(product.brand === userSelectedBrand);
    }
    if (userSelectedMaterial !== 'All') {
      conditions.push(product.material === userSelectedMaterial);
    }
    if (userSelectedCategory !== 'All') {
      conditions.push(product.category === userSelectedCategory);
    }
    return conditions.includes(false) ? false : true;
  });

  const mainContentNode = document.querySelector('.main-content');
  mainContentNode.innerHTML = '';

  if (filteredProducts.length===0){
    mainContentNode.style.display ='block';
    mainContentNode.style.fontSize ='24px';
    mainContentNode.style.fontWeight ='bold';
    mainContentNode.style.textAlign ='center';
    mainContentNode.innerHTML = `No products found`;

  } else {
    mainContentNode.removeAttribute("style");
  }

  filteredProducts.forEach((product) => {
    const productNode = document.createElement('a');
    productNode.classList.add('card');
    productNode.href = `detail.html?id=${product.id}`;
    mainContentNode.appendChild(productNode);
    productNode.innerHTML = `
      <div class="card-img">
          <div><img class="visible-img" src="${product.imgProduct}"></div>
          <div><img class="hidden-img" src="${product.hiddenImgProduct}"></div>
      </div>
      <div class="card-name">${product.name}</div>
      <div class="price-card"><p>$${product.price}</p><p class="retail-price">Retail price: ${product.retailPrice}</p></div>
    `;
  });
  boxFilter.classList.remove('filter-box--open');
});

function openFilter(){
  filterNode.addEventListener('click', function(){
      boxFilter.classList.add('filter-box--open');
  })
}

openFilter();

/**
* The function adds an event listener to a cancel button that removes a CSS class from a filter box
* element to close it.
*/
function closeFilter(){
  cancelFilterButton.addEventListener('click', function(){
      boxFilter.classList.remove('filter-box--open');
  })
}

closeFilter();

/**
* The function adds event listeners to select buttons and toggles their active class.
*/
function selectFilter(){
  Array.from(selectCategoryButton).forEach((item)=>{
      item.addEventListener('click', ()=>{
          for(const filterItem of selectCategoryButton){
              filterItem.classList.remove('active');
          }
          item.classList.add('active')
      })
  });
  Array.from(selectMaterialButton).forEach((item)=>{
      item.addEventListener('click', ()=>{
          for(const filterItem of selectMaterialButton){
              filterItem.classList.remove('active');
          }
          item.classList.add('active')
      })
  });
  Array.from(selectBrandButton).forEach((item)=>{
      item.addEventListener('click', ()=>{
          for(const filterItem of selectBrandButton){
              filterItem.classList.remove('active');
          }
          item.classList.add('active')
      })
  });
}

selectFilter();

