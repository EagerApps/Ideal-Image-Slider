/*
 * Ideal Image Slider Install Helper
 *
 */

var IdealImageSliderInstallHelper = (function() {
	"use strict";

	/*
	 * Helper functions
	 */
	var _ready = function(fn) {
		if (document.addEventListener) {
			return document.addEventListener('DOMContentLoaded', fn);
		} else {
			return document.attachEvent('onreadystatechange', function() {
				if (document.readyState === 'interactive') {
					return fn();
				}
			});
		}
	};

	/*
	 * Build slider HTML and initialize
	 *
   * <div id="slider">
   *     <img src="img/1.jpg" alt="">
   *     <img data-src="img/2.jpg" src="" alt="">
   *     <img data-src="img/3.jpg" src="" alt="">
   * </div>
   * new IdealImageSlider.Slider('#slider');
   */
	var init = function(location, options) {
		if (!location || options.slides.length < 1) {
			return;
		}

		var id, slider, i, slide, firstImg, img, link;

		id = 'ideal-image-slider-' + ((Math.random() * 9999999) | 0) + '-' + (+ new Date);
		slider = document.createElement('div');
		slider.id = id;

		for (i = 0; i < options.slides.length; i++) {
			slide = options.slides[i];

			img = document.createElement('img');

			if (i === 0) {
				firstImg = img;
			} else {
				img.setAttribute('data-src', slide.image);
			}

			if (slide.description) {
				img.setAttribute('title', slide.description);
				img.setAttribute('alt', slide.description);
			}

			if (slide.link) {
				link = document.createElement('a');
				link.href = slide.link;

				if (slide.description) {
					link.setAttribute('title', slide.description);
				}

				link.appendChild(img);
				slider.appendChild(link);
			} else {
				slider.appendChild(img);
			}
		}

		firstImg.onload = function() {
			location.appendChild(slider);

			new IdealImageSlider.Slider('#' + id);
		};

		firstImg.src = options.slides[0].image;
	};

	return {
		init: init
	}

})();
