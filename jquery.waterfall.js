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
		spacingX: 10,
		spacingY: 10,
		xL: 0,
		xR: 0
	};

	$.waterfall.prototype = {
		_init: function waterfall_init(options, callback) {
			var instance = this, opts = this.options = $.extend(true, {}, $.waterfall.defaults, options);

			// work here

			this.start(opts);

			if($.isFunction(callback)) callback(this);

		},

		start: function waterfall_start(options) {
			var options = options || {};

			var that = this;

			var xL = options.xL;
			var xR = options.xR;
			var xw = options.spacingX;
			var yw = options.spacingY;

			$.each($('.' + options.itemElementCls + ':not(.feedAbsActive)'), function(k, v){
				$(v).addClass('feedAbsActive');

				var vw = $(v).width();
				var vh = $(v).height();

				if(xL <= xR) {
					$(v).css({'top': xL, 'left': 0});
					that.setPoint(options, (xL + (vh/2) + yw));
					xL = xL + vh + yw;
				}else if(xL > xR){
					$(v).css({'top': xR, 'left': vw + xw});
					that.setPoint(options, (xR + (vh/2) + yw));
					xR = xR + vh + yw;
				}
			});

			this.timeline(options, xL, xR);

			if ($.isPlainObject(options)) {
				this.options = $.extend(true, {}, this.options, options);
			}
		},

		update: function waterfall_update(options) {
			var options = options || {};

			if ($.isPlainObject(options)) {
				this.options = $.extend(true, {}, this.options, options);
			}
		},

		setPoint: function waterfall_setPoint(options, yh) {
			var options = options || {};

			$('<li class="circlePoint"></li>')
				.appendTo('#' + this.options.timelineBarCircleCls)
				.css({'top': yh});

			if ($.isPlainObject(options)) {
				this.options = $.extend(true, {}, this.options, options);
			}
		},

		timeline: function waterfall_timeline(options, xL, xR) {
			var options = options || {};

			// setting the barLine height
			if(xL >= xR) {
				$('#' + this.options.timelineBarLineCls).css({height: (xL+20) + 'px'});
				$('#' + this.options.timelineBarCircleCls).css({height: (xL+20) + 'px'});
			}else{
				$('#' + this.options.timelineBarLineCls).css({height: (xR+20) + 'px'});
				$('#' + this.options.timelineBarCircleCls).css({height: (xR+20) + 'px'});
			}


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