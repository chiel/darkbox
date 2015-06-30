'use strict';

var Darkbox = require('..');

Darkbox.types.gallery = function(opts){
	var self = this;
	self.renderControls();

	var currentIndex = opts.index;

	var loadImage = function(index){
		var img = new Image();

		img.addEventListener('load', function(){
			self.empty();
			self.fit(img.naturalWidth, img.naturalHeight, {
				callback: function(width, height){
					img.width = width;
					img.height = height;
					self.content.appendChild(img);
				}
			});
		});
		img.src = opts.items[index];
	};

	var previous = function(){
		if (currentIndex < 1) return;
		loadImage(--currentIndex);
	};

	var next = function(){
		if (currentIndex > opts.items.length - 2) return;
		loadImage(++currentIndex);
	};

	var close = function(){
		self.removeListener('previous', previous);
		self.removeListener('next', next);
		self.removeListener('close', close);
	};

	self.on('previous', previous);
	self.on('next', next);
	self.on('close', close);

	loadImage(opts.index);
};
