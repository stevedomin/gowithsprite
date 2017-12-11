gowithsprite
========

GoWithSprite is a HTML5 CSS Sprite Generator with Retina display support.

## Usage

To create a sprite, drop your assets in the drop zone (or upload them using the upload form), then click on the button `Download Sprite & CSS`.
It will automatically generate the CSS file and the sprite image file.

If you add Retina version of your images (image name end by @2x), then it will automatically generate a Retina sprite and add a corresponding media query in the CSS.

You can also open the sprite image and CSS in the browser by clicking on `Open Sprite & CSS`.

## Docs

Documentation is generated using [docco](http://jashkenas.github.com/docco/).

To generate the documentation run the following command : `docco src/*.js src/lib/gws/*.js`.

To view it, open `docs` folder in your browser.

## Tests

Tests are written using [mocha](http://mochajs.org/).

To run tests, open the test runner HTML file in your browser. It's located in : `spec/runner.html`

## Bugs

* If you only add @2x images, CSS and sprite image won't be generated.
* When there are Retina sprites, CSS file opens in a pop-up.

## To-Do

* Write more tests
* Write more docs :) (especially in sprite_canvas.js)
* Add support for single sprite suppression in the dropzone
* Better handling of Retina
* Better name for CSS class
* Add Jake tasks

## Thanks

* Jake Gordon for the bin packing algorithm : http://codeincomplete.com/posts/2011/5/7/bin_packing/
