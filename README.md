# Darkbox

Tired of writing the same old lightbox implementation for every new project?
Yeah, me too. That's why I decided to do it right for once and write a proper
implementation that encourages reuse and extension.


## Goals

- Usable in a variety of implementations
- Extensible to new media types. Not everything has to be in core.
- Minimal/no boilerplate code required to get set up
- Include helper functions for common lightbox-related tasks
- Aimed at modern browsers (for now, pull requests welcome)


## Usage

At the moment, Darkbox is only available on [npm][npm], so you'll require a
buildtool such as [browserify][browserify] in order to use it. Will happily
accept pull requests for other environments though!

```bash
$ npm install --save darkbox
```

Then in your javascript code:

```js
var Darkbox = require('darkbox');
var darkbox = new Darkbox(options);
darkbox.open(type, typeOptions);
```

[npm]: https://www.npmjs.com/
[browserify]: http://browserify.org/


## Types

Nowadays, all types of content are loaded into lightboxes in order to maintain a
nice user experience. As a result of this, many lightbox implementations have
become rather bloated and are starting to feel sluggish. To avoid this, Darkbox
is set up in a way that new types are easily added, whether they are included
in the Darkbox distribution or not.

Reusable ones will be added to core for easy inclusion, but you will have to
manually include them, to avoid the scenario described above.


### Included types

- gallery
- youtube


### Custom types

Including handler functions for custom types couldn't be easier! For an example,
view the `types/youtube.js` file. To make that handler execute, we could do:

```js
var Darkbox = require('darkbox');
require('darkbox/types/youtube');

var darkbox = new Darkbox();
darkbox.open('youtube', {
  id: 'dQw4w9WgXcQ',
  width: 560,
  height: 315
});
```

As you can see, all we had to do is `require('darkbox/types/youtube')` and the
handler registered itself to be usable. To create your own handler you could do
something very similar:

```js
var Darkbox = require('darkbox');
Darkbox.types.myType = function(opts){};
```

That's it!

The `opts` object gets passed through from the `darkbox.open` call that
triggered it, so you can decide for yourself what options you desire.

`this` within that function would point to the instance of darkbox
that triggered the handler, so you have easy access to utility methods such as
`fit`, `empty` and `renderControls`.


## License

The MIT License (MIT)

Copyright (c) 2015 Chiel Kunkels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
