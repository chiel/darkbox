'use strict';

var Darkbox = require('..');

Darkbox.types.youtube = function(opts){
	var self = this;
	var width = opts.width || 560;
	var height = opts.height || 315;

	self.empty();
	self.fit(width, height, {
		callback: function(){
			var iframe = document.createElement('iframe');
			iframe.width = width;
			iframe.height = height;
			iframe.src = 'https://www.youtube.com/embed/' + opts.id;
			iframe.setAttribute('frameborder', 0);
			iframe.setAttribute('allowfullscreen', '');

			self.content.appendChild(iframe);
			self.content.classList.add('is-loaded');
		}
	});
};
