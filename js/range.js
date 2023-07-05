/* A function that is being called. */
const sliderNode1 = document.querySelector('.range-slider__range');
const valueNode1 = document.querySelector('.range-slider__value');
    
sliderNode1.oninput = function(){
    valueNode1.innerHTML = this.value+' $';
}

const priceRangeNode = document.querySelector('.range-slider_size')
const sliderNode2 = priceRangeNode.querySelector('.range-slider__range');
const valueNode2 = priceRangeNode.querySelector('.range-slider__value');
   
sliderNode2.oninput = function(){
    valueNode2.innerHTML = this.value+' mm';
}

