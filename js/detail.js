import { sortedProducts } from "./product.js";

const params = new URLSearchParams(window.location.search);
let localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
const id = Number(params.get('id'));
const product = sortedProducts.find((item) => item.id === id);
const detailDivNode = document.querySelector('.product-detail');
const buyNowButton = document.querySelector('.buy-now-button');


function productsDetail(item){
    const pNameNode = detailDivNode.querySelector('.product-detail_name > p');
    pNameNode.innerHTML = item.name;
    const pPriceNode = detailDivNode.querySelector('.price');
    const pRetailPriceNode = detailDivNode.querySelector('.retail-price');
    pPriceNode.innerHTML = `$${item.price}`;
    pRetailPriceNode.innerHTML = item.retailPrice;
    const productDetailFeaturesNode = document.querySelector('.product-detail_features');
    const slideItemNode = document.querySelector('.img-slider');
    const imgSlideNode1 = slideItemNode.querySelector('.img-item:nth-child(1) .slick img');
    const imgSlideNode2 = slideItemNode.querySelector('.img-item:nth-child(2) .slick img');
    const imgSlideNode3 = slideItemNode.querySelector('.img-item:nth-child(3) .slick img');
    const imgSlideNode4 = slideItemNode.querySelector('.img-item:nth-child(4) .slick img');
    imgSlideNode1.src=item.imgProduct
    imgSlideNode2.src=item.hiddenImgProduct
    imgSlideNode3.src=item.img3
    imgSlideNode4.src=item.img4 
    const actionSlider = productDetailFeaturesNode.querySelector('.action-slider');
    const actionSliderItemNode1 = actionSlider.querySelector('.action_img-item:nth-child(1) img');
    const actionSliderItemNode2 = actionSlider.querySelector('.action_img-item:nth-child(2) img');
    const actionSliderItemNode3 = actionSlider.querySelector('.action_img-item:nth-child(3) img');
    const actionSliderItemNode4 = actionSlider.querySelector('.action_img-item:nth-child(4) img');
    actionSliderItemNode1.src=item.imgProduct;
    actionSliderItemNode2.src=item.hiddenImgProduct;
    actionSliderItemNode3.src=item.img3;
    actionSliderItemNode4.src=item.img4;
    const condititionNode = document.querySelector('#conditition');
    condititionNode.innerHTML=item.conditition;
    const accessoriesNode = document.querySelector('#accessories');
    accessoriesNode.innerHTML=item.accessories
    const sizeNode = document.querySelector('#size');
    sizeNode.innerHTML=item.size;
    const brandNode = document.querySelector('#brand');
    brandNode.innerHTML=item.brand;
    const movementNode = document.querySelector('#movement');
    movementNode.innerHTML=item.movement;
    const refNode = document.querySelector('#ref');
    refNode.innerHTML=item.ref;
    const functionNode = document.querySelector('#function');
    functionNode.innerHTML=item.function;
    const powerReserveNode = document.querySelector('#powerReserve');
    powerReserveNode.innerHTML=item.powerReserve;
    const materialNode = document.querySelector('#material');
    materialNode.innerHTML=item.material;
    const waterResistantNode = document.querySelector('#waterResistant');
    waterResistantNode.innerHTML=item.waterResistant;
    const addToCartButton = document.querySelector('.add-to-card-button');  
    addToCartButton.addEventListener('click',()=>{
      let i = true
      product.quantity = 1;
      localStorageCart.forEach(item=>{
        console.log(product,item);
        if (item.id === product.id){
          item.quantity += 1;
          i = false
        }
      })
      if (i === true){
        localStorageCart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(localStorageCart));
       addToCartButton.href = `cart.html`;
    })
}

productsDetail(product)

buyNowButton.addEventListener('click', () => {
  localStorageCart.splice(0, localStorageCart.length); 
  localStorageCart.push(product);
  product.quantity = 1
  localStorage.setItem('cart', JSON.stringify(localStorageCart)); 
});

const mainNode = document.querySelector('main');
mainNode.style.paddingTop='10rem';

