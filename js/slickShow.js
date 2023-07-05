$('.product-detail_features').ready(function(){
  $('.img-slider').slick({
    nextArrow: '<button type="button" class="slick-next">❯</button>',
    prevArrow: '<button type="button" class="slick-prev">❮</button>',
  });
});

$('div[data-slide]').click(function(e) {
  e.preventDefault();
  var slideno = $(this).data('slide');
  $('.img-slider').slick('slickGoTo', slideno - 1);
});

