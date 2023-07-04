let localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
const cart = document.querySelector('.product-list_order-summary tbody');
const subtotalNode = document.querySelector('.total-line_table .subtotal');
const completeButton = document.querySelector('.complete-order_button');
const inputPhone = document.querySelector('.input-phone');
const inputName = document.querySelector('.input-name');
const inputAddress = document.querySelector('.input-address');
const invalidPhone = document.querySelector('.invalid-phone');
const invalidName = document.querySelector('.invalid-name');
const invalidAddress = document.querySelector('.invalid-address');
const discountInput = document.querySelector('.discount-code input');
const applyDiscountButton = document.querySelector('.apply-discount_button');
const totalTableNode = document.querySelector('.total-line_table tbody');
const lineNode = document.querySelector('.line');
const totalNode = document.querySelector('.total-payment_checkout');


let subtotal = 0;
console.log(subtotalNode); 

function renderProducts() {
    localStorageCart.forEach(item => {
      const prdCart = document.createElement('tr');
      prdCart.classList.add('product-cart_detail');
      cart.appendChild(prdCart);
      prdCart.innerHTML = `
        <td class="product-name_checkout">
            <div class="info-prd">
                <img src="${item.imgProduct}" class="product-img_checkout">
                <p class="info-prd_name">${item.name}</p> 
                <p class="info-prd_quantity">x ${item.quantity}</p>
            </div>                            
        </td>
      `;
      subtotal += item.quantity*item.price;
    });
    subtotalNode.innerHTML=`$${subtotal}`
  }

renderProducts()

const discount = [
  {
    code:'voucher20',
    voucher: 0.2
  }, 
  {
    code:  'voucherfreeship',
    voucher: 5
  }, 
  {
    code: 'voucher10',
    voucher: 0.1
  }, 
  {
    code:'voucher15',
    voucher: 0.15
  }, 
  {
    code:'voucher5',
    voucher: 0.05
  }
];

discount.forEach(item=>{
  item.off=item.voucher*subtotal;
})

let total = 0 ;

function applyDiscount() {
  applyDiscountButton.addEventListener('click', () => {
    const enteredCode = discountInput.value;
    const foundDiscount = discount.find(item => item.code === enteredCode);
    console.log(foundDiscount);
    if (foundDiscount) {
      discountInput.style.border = "solid 1px #1ec900";
      console.log(true);
      const discountNode = document.createElement('tr');
      discountNode.classList.add('discount')
      totalTableNode.appendChild(discountNode);
      discountNode.innerHTML=`
      <th><p>Discount</p></th>
      <td class="discount">$${foundDiscount.off}</td>`
      lineNode.remove();
      const newLineNode = document.createElement('tr');
      newLineNode.classList.add('line');
      totalTableNode.appendChild(newLineNode);
      total-=foundDiscount.off
      total = subtotal+5-foundDiscount.off ;
      totalNode.innerText = `$${total}`
    } else {
      discountInput.style.border = "solid 1px #ff0000";
      console.log(false);
    }
  });
}

applyDiscount();


total = subtotal+5 ;
totalNode.innerText = `$${total}`



let address = false;
let phone = false;
let name = false;

completeButton.addEventListener('click', () => {
    if (inputAddress.value === '') {
      invalidAddress.style.display = "block";
      invalidAddress.style.color= "#ff0000";
      invalidAddress.innerHTML=`Please enter your address`;
      inputAddress.style.border="solid 1px #ff0000";
      address = false;
    } else {
        invalidAddress.style.display = "block";
        invalidAddress.style.color = "#1ec900";
        invalidAddress.innerHTML=`Valid address`
        inputAddress.style.border="solid 1px #1ec900";
        address = true;
    }
    if (inputName.value === '') {
      invalidName.style.display = "block";
      invalidName.style.color= "#ff0000";
      invalidName.innerHTML=`Please enter your fullname`
      inputName.style.border="solid 1px #ff0000";
      name = false;
    } else {
        invalidName.style.display = "block";
        invalidName.style.color = "#1ec900";
        invalidName.innerHTML=`Valid full name`
        inputName.style.border="solid 1px #1ec900";
        name =true;
    }
    if (inputPhone.value === '') {
      invalidPhone.style.display = "block";
      invalidPhone.style.color= "#ff0000";
      invalidPhone.innerHTML=`Please enter the phone number`
      inputPhone.style.border="solid 1px #ff0000";
      phone =false;
    } else 
    if(inputPhone.value.length === 10||inputPhone.value.length === 11){
        invalidPhone.style.display = "block";
        invalidPhone.style.color = "#1ec900";
        invalidPhone.innerHTML=`Valid phone number`
        inputPhone.style.border="solid 1px #1ec900";
        phone = true;
    } else {
      invalidPhone.style.display = "block";
      invalidPhone.style.color= "#ff0000";
      invalidPhone.innerHTML=`Invalid phone number`
      inputPhone.style.border="solid 1px #ff0000";
      phone = false;
    }
    if(name===true||address===true||phone===true){
      completeButton.href = "completeOrder.html";
      localStorageCart = [];
      localStorage.setItem('cart', JSON.stringify(localStorageCart));
    }
});


// console.log(totalNode);
