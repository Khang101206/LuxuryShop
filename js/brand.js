const menuBoxNode = document.querySelector('.menu-box');
const brandListNode = menuBoxNode.querySelector('.brand-list');
const categoryListNode = menuBoxNode.querySelector('.category-list')
const boxMenuItemListNode = menuBoxNode.querySelectorAll('.menu-box-item-list')
const boxMenuButton = document.querySelector('.three-bars');
const boxCategoryListNode = menuBoxNode.querySelector('.menu-box-category-list');
const boxBrandListNode = menuBoxNode.querySelector('.menu-box-brand-list');

let clickCounter=0;

boxMenuButton.addEventListener('click',()=>{
    menuBoxNode.classList.add('menu-box--open')
})

boxMenuButton.onclick=function() {
  clickCounter++;
  if (clickCounter==2) {
    menuBoxNode.classList.remove('menu-box--open')
    clickCounter=0;
  }
};

let clickListCounter = 0;

boxCategoryListNode.onclick=function() {
    clickListCounter++;
    if(clickListCounter==1){
        categoryListNode.classList.add('category-list_on');
    }
    if (clickListCounter==2) {
        categoryListNode.classList.remove('category-list_on');
        clickListCounter=0;
    }
  };

  boxBrandListNode.onclick=function() {
    clickListCounter++;
    if(clickListCounter==1){
        brandListNode.classList.add('brand-list_on');
    }
    if (clickListCounter==2) {
        brandListNode.classList.remove('brand-list_on');
      clickListCounter=0;
    }
};

