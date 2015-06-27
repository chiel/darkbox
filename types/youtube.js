'use strict';

var Darkbox = require('..');

Darkbox.types.youtube = function(opts){
	var width = opts.width || 560;
	var height = opts.height || 315;
	var size = this.fit(width, height);

	var iframe = document.createElement('iframe');
	iframe.width = size.width;
	iframe.height = size.height;
	iframe.src = 'https://www.youtube.com/embed/' + opts.id;
	iframe.setAttribute('frameborder', 0);
	iframe.setAttribute('allowfullscreen', '');

	this.empty();
	this.content.appendChild(iframe);
};
