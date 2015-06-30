'use strict';

var deepMixIn = require('mout/object/deepMixIn');
var forOwn = require('mout/object/forOwn');

/**
 * Darkbox
 *
 * @param {Object} opts
 */
var Darkbox = function(opts){
	if (!(this instanceof Darkbox)){
		return new Darkbox(opts);
	}

	this.opts = deepMixIn({}, Darkbox.defaults, opts);
};

require('util').inherits(Darkbox, require('events').EventEmitter);

/**
 * Default options
 */
Darkbox.defaults = {
	// minimal margin to keep from the edges of the viewport
	margin: {
		x: 100,
		y: 100
	}
};

/**
 * Build up all required elements
 */
Darkbox.prototype._build = function(){
	if (this.overlay) return;

	var overlay = document.createElement('div');
	overlay.classList.add('darkbox-overlay');
	document.body.appendChild(overlay);
	this.overlay = overlay;

	var wrap = document.createElement('div');
	wrap.classList.add('darkbox-wrap');
	overlay.appendChild(wrap);
	this.wrap = wrap;

	var content = document.createElement('div');
	content.classList.add('darkbox-content');
	wrap.appendChild(content);
	this.content = content;

	this.fit(200, 200);
	this._setEvents();
};

/**
 * Set required events
 */
Darkbox.prototype._setEvents = function(){
	var self = this;

	self.overlay.addEventListener('click', function(e){
		if (e.target !== self.overlay) return;
		self.close();
	});
};

/**
 * Open darkbox with given options
 *
 * @param {String} type - Type of content
 * @param {Object} opts - Options to pass to the type handler function
 */
Darkbox.prototype.open = function(type, opts){
	if (!Darkbox.types[type]){
		return console.error(new Error('Unknown content type `' + type + '`'));
	}

	this._build();
	document.body.style.overflow = 'hidden';
	this.overlay.classList.add('darkbox-type-' + type);
	this.overlay.classList.add('is-shown');
	this.wrap.classList.add('is-shown');

	Darkbox.types[type].call(this, opts);
};

/**
 * Close this instance of darkbox
 */
Darkbox.prototype.close = function(){
	this.emit('close');
	this.overlay.classList.remove('is-shown');
	this.wrap.classList.remove('is-shown');
	document.body.style.overflow = '';
};

/**
 * Empty the content area of children
 */
Darkbox.prototype.empty = function(){
	while (this.content.firstChild){
		this.content.removeChild(this.content.firstChild);
	}
};

/**
 * Render controls and set associated events
 *
 * @return {Object} - The darkbox instance
 */
Darkbox.prototype.renderControls = function(opts){
	if (this.controls) return;
	opts = opts || {};

	this.controls = {};

	var self = this;
	['prev', 'next', 'close'].forEach(function(type){
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.classList.add('darkbox-control');
		btn.classList.add('darkbox-control-' + type);
		self.wrap.appendChild(btn);
		self.controls[type] = btn;
	});

	self.controls.prev.addEventListener('click', function(){
		self.emit('previous');
	});

	self.controls.next.addEventListener('click', function(){
		self.emit('next');
	});

	self.controls.close.addEventListener('click', function(){
		self.close();
	});

	return this;
};

/**
 * Fit the content box to a maximum for given dimensions
 *
 * @param {Number} width - The desired width to scale to
 * @param {Number} height - The desired height to scale to
 * @param {Object} opts
 * @param {String} opts.mode - The scaling method to use
 * @param {Boolean} opts.maintainRatio - Respect the aspect ratio when scaling, defaults to true
 *
 * @return {Object} - Object containing calculated width and height
 */
Darkbox.prototype.fit = function(width, height, opts){
	opts = opts || {};
	if (!opts.mode) opts.mode = 'contain';
	if (opts.maintainRatio !== false) opts.maintainRatio = true;

	var iW = window.innerWidth;
	var iH = window.innerHeight;

	// calculate max width & height based on mode
	var maxWidth, maxHeight, scale;
	if (opts.mode === 'contain'){
		maxWidth = iW - (this.opts.margin.x * 2);
		maxHeight = iH - (this.opts.margin.y * 2);

		if (width > maxWidth){
			scale = maxWidth / width;
			width = width * scale;
			if (opts.maintainRatio) height = height * scale;
		}
		if (height > maxHeight){
			scale = maxHeight / height;
			height = height * scale;
			if (opts.maintainRatio) width = width * scale;
		}
	}

	width = Math.round(width);
	height = Math.round(height);

	var props = {
		width: width + 'px',
		height: height + 'px',
		top: ((iH - height) / 2) + 'px',
		left: ((iW - width) / 2) + 'px'
	};

	var self = this;
	forOwn(props, function(value, key){
		self.wrap.style[key] = value;
	});

	return {
		width: width,
		height: height
	};
};

/**
 * Content types darkbox can open
 */
Darkbox.types = {};

module.exports = Darkbox;
