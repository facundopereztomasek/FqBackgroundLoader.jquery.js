;(function($) {
	var defaults = {
		'callback': function(){
			$(document.body).addClass('FqImagesLoaded');
		}
	}

	getUrlFromBackground = function( background ){
		var urlExpression =/\((.*)\)/;
		var found = background.match(urlExpression);
		return found ? found[1] : null;
	}

	$.fn.FqBackgroundLoader = function(options) {

		if(typeof options === 'function'){
			options={'callback':options}
		}else if(options.constructor != Object){
			throw new Error('Error de tipo: El parámetro debe ser un objeto o función');
		}
		var o = $.extend({}, defaults, options);

		var	callback = o.callback,
			imagesLength = 0,
			elements = this,
			newImg,
			bg,
			style;

		for( var e = 0 ; e < elements.length ; e++ ){

			style = window.getComputedStyle(elements[e]);

			if(style.backgroundImage && style.backgroundImage != 'none'){

				imagesLength++;

				bg = getUrlFromBackground(style.backgroundImage);
				newImg = new Image();
				newImg.src = bg;
				newImg.onload = function(){
					imagesLength--;
					if(imagesLength == 0){
						callback();
					}
				}
			}
		}

		return this;
	}
})(jQuery);
