/*
 *
 * # MapsWalker Waterfall - 1.0.0
 * https://github.com/DKMonster/waterfall
 *
 * 
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 *
 * Autor: David Kross (DKxMonster)
 * @fb 	fb.me/DavidZhang.DK
 * @tw 	@dkxmonster
 * @in 	tw.linkedin.com/in/dkxmonster
 * @git https://github.com/DKMonster
 *
 *
 */

(function(window, $, undefined){

	$.waterfall = function waterfall(options, callback, element) {
		this.element = $(element);
		this._init(options, callback);
	};

	$.waterfall.defaults = {
		parentElementCls: '',
		itemElementCls: '',
		spacing: '10'
	};

	$.waterfall.prototype = {
		_init: function waterfall_init(options, callback) {
			var instance = this, opts = this.options = $.extend(true, {}, $.waterfall.defaults, options);

			// work here

			console.log(opts);

			if($.isFunction(callback)) callback(this);

		},

		update: function waterfall_update(options) {
			var options = options || {};

			if ($.isPlainObject(options)) {
				this.options = $.extend(true, {}, this.options, options);
			}
		}
	};
	
	// there is waterfall.
	$.fn.waterfall = function(options, callback) {
		var that = typeof options;

		switch(that) {
			// method
			case 'string':
				var args = Array.prototype.slice.call(arguments, 1);

				this.each(function() {
					var instance = $.data(this, 'waterfall');

					if(!instance) {
						return false;
					}

					// we are using the _ express private function avoid outside can't using that.
					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						return false;
					}

					instance[options].apply(instance, args);

				});

				break;

			// creation
			case 'object':

				this.each(function() {
					var instance = $.data(this, 'waterfall');

					if (instance) {
						instance.update(options);
					}else{
						// 我們透過 new 來動態建立一個我們所寫好的 prototype
						// 並且將他利用 $.data 的方式儲存起來
						// 好處是，我們隨時都可以用 $.data 把他拿出來作壞事
						$.data(this, 'waterfall', new $.waterfall(options, callback, this));
					}
				});

				break;
		}

		return this;
	}

})(window, jQuery);