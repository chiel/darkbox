'use strict';

var isFunction = require('mout/lang/isFunction');

/**
 * Load an image by url
 *
 * @param {String} src
 * @param {Function} callback
 */
module.exports = function(src, callback) {
	if (!isFunction(callback)) return;

	var img = new Image();
	img.addEventListener('load', function() {
		callback(img);
	});
	img.src = src;
};
