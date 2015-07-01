'use strict';

var Darkbox = require('..');
var loadImage = require('../lib/loadimage');

Darkbox.types.gallery = function(opts){
	var self = this;
	self.renderControls();

	var currentIndex = opts.index;

	var to = function(index){
		loadImage(opts.items[index], function(img){
			self.empty();
			self.fit(img.naturalWidth, img.naturalHeight, {
				callback: function(width, height){
					img.width = width;
					img.height = height;
					self.content.appendChild(img);
				}
			});
		});
	};

	var previous = function(){
		if (currentIndex < 1) return;
		to(--currentIndex);
	};

	var next = function(){
		if (currentIndex > opts.items.length - 2) return;
		to(++currentIndex);
	};

	var close = function(){
		self.removeListener('previous', previous);
		self.removeListener('next', next);
		self.removeListener('close', close);
	};

	self.on('previous', previous);
	self.on('next', next);
	self.on('close', close);

	self.empty();
	to(opts.index);
};
