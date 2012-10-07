// GoWithSprite
// ----------------

(function(GWS, undefined) {

    // Variable declaration
    var sprites = []
        , retinaSprites = []
        , spriteCanvas = null
        , retinaSpriteCanvas = null
        , spriteStylesheet = null
        , generated = false;

    // UI element variables
    var dropzone = document.getElementById('dropzone')
        , downloadSpriteAndCSSButton = document.getElementById('downloadSpriteAndCSSButton')
        , openSpriteAndCSSButton = document.getElementById('openSpriteAndCSSButton')
        , uploadSpritesInput = document.getElementById('uploadSpritesInput')
        , clearCanvasButton = document.getElementById('clearCanvasButton')
        , helpText = document.getElementById('helpText');

    // ## Methods
    //

    // ### generateSpriteAndCSS
    //
    function generateSpriteAndCSS() {

        // Sort sprites by area
        sprites = sprites.sort(function (a, b) {
            if (b.area === a.area) {
                return b.name > a.name ? 1 : -1;
            } else {
                return b.area - a.area;
            }
        });

        // Create a new SpriteCanvas (copying the sprites array)
        spriteCanvas = new GWS.SpriteCanvas(sprites.slice());

        if (retinaSprites.length > 0)
        {
            // Sort retina sprites by area
            retinaSprites = retinaSprites.sort(function (a, b) {
                if (b.area === a.area) {
                    return b.name > a.name ? 1 : -1;
                } else {
                    return b.area - a.area;
                }
            });

            // Create a new SpriteCanvas (copying the retinaSprites array)
            retinaSpriteCanvas = new GWS.SpriteCanvas(retinaSprites.slice());
        }

        // and a SpriteStylesheet
        spriteStylesheet = new GWS.SpriteStylesheet(spriteCanvas, retinaSpriteCanvas);

        generated = true;
    }

    // ### processFiles
    //
    function processFiles(files) {

        // Remove the help text if there are no sprites in dropzone 
        if (sprites.length == 0)
        {
            dropzone.removeClassName('center');
            document.getElementById('dropzone').removeAllElements();    
        }

        generated = false;

        // Loop through list of files user dropped.
        for (var i = 0, file; file = files[i]; i++) {

            // Only process image files.
            if (!(/image/i).test(file.type)) {
                continue;
            }

            var reader = new FileReader();

            reader.onerror = function(e) {
                console.error('Error code: ' + e.target.error.code);
            };

            // Create a closure to capture the file information.
            reader.onload = (function(f) {
                return function(event) {
                    var spriteElement = new GWS.SpriteElement(event.target.result, f);

                    if ((/@2x/i).test(f.name)) {
                        // Add the SpriteElement to the retina sprite list
                        retinaSprites.push(spriteElement);
                    }
                    else {
                        // Add the SpriteElement to the sprite list
                        sprites.push(spriteElement);
                    }

                    // Render thumbnail template with the file info (data object).
                    document.getElementById('dropzone').insertAdjacentHTML('afterBegin', spriteElement.render());
                };
            })(file);

            // Read in the image file as a data url.
            reader.readAsDataURL(file);
        }
    }

    // ### resetState
    //
    function resetState() {
        sprites = [];
        retinaSprites = [];

        generated = false;

        spriteCanvas = null;
        retinaSpriteCanvas = null;
        spriteStylesheet = null;
    }

    // ## Event handlers
    //

    // ### dropzone_dragEnterHandler
    //
    // Event handler for drag events.
    function dropzone_dragEnterHandler(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // ### dropzone_dragOverHandler
    //
    // `dropzone_dragOverHandler` is the event handler for drag over events.
    function dropzone_dragOverHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        
        dropzone.addClassName('dropzone-over');
    }

    // ### dropzone_dragLeaveHandler
    //
    // `dropzone_dragLeaveHandler` is the event handler for drag leave events.
    function dropzone_dragLeaveHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        
        dropzone.removeClassName('dropzone-over');
    }

    // ### dropzone_dropHandler
    //
    // `dropzone_dragEnterHandler` is the event handler for drop events.
    function dropzone_dropHandler(event) {
        event.stopPropagation();
        event.preventDefault();

        dropzone.removeClassName('dropzone-over');
        
        var files = event.dataTransfer.files;

        processFiles(files);
    }

    // ### uploadSprites_changeHandler
    //
    function uploadSprites_changeHandler(event) {
        var files = event.target.files;

        processFiles(files);
    }

    // ### downloadSpriteAndCSS_clickHandler
    //
    function downloadSpriteAndCSS_clickHandler(event) {
        if (sprites.length == 0)
            return;
        
        if (!generated)
            generateSpriteAndCSS();

        saveAs(spriteCanvas.blob, "sprite.png");
        if (typeof retinaSpriteCanvas !== "undefined" && retinaSpriteCanvas !== null)
            saveAs(retinaSpriteCanvas.blob, "sprite@2x.png");
        saveAs(spriteStylesheet.blob, "sprite.css");
    }

    // ### openSpriteAndCSS_clickHandler
    //
    function openSpriteAndCSS_clickHandler(event) {
        if (sprites.length == 0)
            return;

        if (!generated)
            generateSpriteAndCSS();

        // Open CSS and sprite files in new tab
        // BUG : When there are retina sprites, CSS opens in a pop-up
        window.open(spriteCanvas.objectURL, "_blank");
        if (typeof retinaSpriteCanvas !== "undefined" && retinaSpriteCanvas !== null)
            window.open(retinaSpriteCanvas.objectURL, "_blank");
        window.open(spriteStylesheet.objectURL, "_blank");
    }

    // ### clearCanvas_clickHandler
    //
    function clearCanvas_clickHandler(event) {
        // Remove all elements from dropzone
        document.getElementById('dropzone').removeAllElements();

        resetState();

        dropzone.addClassName('center');
        
        // !! Change this asap
        // Not the most elegant way to do it but it works and it's quick
        dropzone.innerHTML = '<h2 id="helpText">Drop image files here from your desktop</h2>';
    }

    // Add drag and drop event handlers on dropzone.
    dropzone.addEventListener('dragenter', dropzone_dragEnterHandler, false);
    dropzone.addEventListener('dragover', dropzone_dragOverHandler, false);
    dropzone.addEventListener('dragleave', dropzone_dragLeaveHandler, false);
    dropzone.addEventListener('drop', dropzone_dropHandler, false);

    // Add UI elements event handlers
    uploadSpritesInput.addEventListener('change', uploadSprites_changeHandler, false);
    downloadSpriteAndCSSButton.addEventListener('click', downloadSpriteAndCSS_clickHandler, false);
    openSpriteAndCSSButton.addEventListener('click', openSpriteAndCSS_clickHandler, false);
    clearCanvasButton.addEventListener('click', clearCanvas_clickHandler, false);


}(window.GoWithSprite = window.GoWithSprite || {}));
