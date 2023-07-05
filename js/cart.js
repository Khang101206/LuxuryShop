const cart = document.querySelector('tbody');
const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
const checkOutButton = document.querySelector('.check-out_button');
let totalPrice = 0 
const totalCartNode = document.querySelector('.total-cart p');

function renderProducts() {
  localStorageCart.forEach((item) => {
    const prdCart = document.createElement('tr');
    prdCart.classList.add('product-cart_detail');
    cart.appendChild(prdCart);
    prdCart.innerHTML = `
      <td class="product-name_cart">
          <div class="info-prd">
              <img src="${item.imgProduct}" class="product-img_cart">
              <p>${item.name}</p> 
          </div>   
          <div class="remove-prd">
              <a>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg> 
              </a> 
          </div>                            
      </td>
      <td class="product-quantity_cart"><input type="number" min="1" max="10" value="${item.quantity}"></td>
      <td class="product-price_cart"><p>$${item.price}</p></td>
    `;
    const productsQuantity = prdCart.querySelector('.product-quantity_cart input');
    const totalProducts = productsQuantity.value * item.price;
    prdCart.innerHTML += `
      <td class="product-total_cart"><p>$${totalProducts}</p></td>
    `;

    const totalPriceProduct = prdCart.querySelector('.product-total_cart');
    const productsQuantityNode = prdCart.querySelector('input');
    productsQuantityNode.addEventListener('change', () => {
      let quantity = parseInt(productsQuantityNode.value, 10); // Convert string to integer
      let total = quantity * Number(item.price);
      totalPriceProduct.innerHTML = `<td class="product-total_cart"><p>$${total}</p></td>`;
      item.quantity = quantity;

      localStorage.setItem('cart', JSON.stringify(localStorageCart));
    });

    const removeNode = prdCart.querySelector('a');
    removeNode.addEventListener('click',()=>{
      if (confirm('Are you sure you want to remove this product?') == true) {
        prdCart.remove();
        const index = Array.from(removeNode).indexOf(item);
        localStorageCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
      } 
      if (localStorageCart.length===0){
        const prdCart = document.createElement('tr');
          prdCart.classList.add('product-cart_detail');
          cart.appendChild(prdCart);
          prdCart.style.position='relative';
          prdCart.innerHTML = `<div class='empty-cart'><p>Your cart is empty</p><img src="img/empty-cart.png"></div>`    
          checkOutButton.href="";
          checkOutButton.style.display ="none";
      }
    })

    totalPrice += item.price * item.quantity;
    totalCartNode.innerHTML=`$${totalPrice}`
  });
}

if (localStorageCart.length !== 0){
  renderProducts();
} else if (localStorageCart.length===0){
  const prdCart = document.createElement('tr');
    prdCart.classList.add('product-cart_detail');
    cart.appendChild(prdCart);
    prdCart.style.position='relative';
    prdCart.innerHTML = `<div class='empty-cart'><p>Your cart is empty</p><img src="img/empty-cart.png"></div>`    
}


const productCartNode = document.querySelectorAll('.product-cart_detail');

function emptyCart(){
  const emptyCartNode = document.querySelector('.empty_cart');
  emptyCartNode.addEventListener('click', () => {
    if (confirm('Are you sure you want to empty cart?') == true) {
      localStorageCart.splice(0,localStorageCart.length);
      productCartNode.forEach(item => {
        cart.remove(item);
      })
      localStorage.setItem('cart', JSON.stringify(localStorageCart))
    }
    if (localStorageCart.length===0){
      const prdCart = document.createElement('tr');
        prdCart.classList.add('product-cart_detail');
        cart.appendChild(prdCart);
        prdCart.style.position='relative';
        prdCart.innerHTML = `<div class='empty-cart'><p>Your cart is empty</p><img src="img/empty-cart.png"></div>`;
        checkOutButton.href="";
        checkOutButton.style.display ="none";    
    }
  })
}

emptyCart()

if(localStorageCart.length === 0){
  checkOutButton.href="";
  checkOutButton.style.display ="none";
}