// GWS.SpriteStylesheet
// ----------------

(function(GWS, undefined) {

    // ### constructor
    //
    // 
	GWS.SpriteStylesheet = function(spriteCanvas, retinaSpriteCanvas) {
        // The base string that will be used to name sprite CSS class
		this.baseClassName = "sprite";
        // Default background image file name
        this.backgroundImageName = "sprite";

        // Check if spriteCanvas exist otherwise it's not necessary to generate CSS
        if (typeof spriteCanvas !== "undefined" && spriteCanvas !== null) {
            this.setSpriteCanvas(spriteCanvas);
        }

        // Check if spriteCanvas exist otherwise it's not necessary to generate CSS
        if (typeof retinaSpriteCanvas !== "undefined" && retinaSpriteCanvas !== null) {
            this.setRetinaSpriteCanvas(retinaSpriteCanvas);
        }
	};

    // ### setSpriteCanvas
    //
    // Set the spriteCanvas property and regenerate the CSS
    GWS.SpriteStylesheet.prototype.setSpriteCanvas = function(spriteCanvas) {
        this.spriteCanvas = spriteCanvas;
        
        if (spriteCanvas.sprites.length > 0)
            this.generateCSS(false); 
        
    };

    // ### setRetinaSpriteCanvas
    //
    // Set the spriteCanvas property and regenerate the CSS
    GWS.SpriteStylesheet.prototype.setRetinaSpriteCanvas = function(spriteCanvas) {
        this.retinaSpriteCanvas = spriteCanvas;

        if (this.retinaSpriteCanvas.sprites.length > 0)
            this.generateCSS(true);
    };

    // ### generateCSS
    //
    // Generate a Blob and objectURL CSS from the SpriteCanvas
    GWS.SpriteStylesheet.prototype.generateCSS = function(retina) {
        
        this.css = [];

        // Loop through sprites and create one CSS declaration with correct properties
        // for each
        for (var i = 0, sprite; sprite = this.spriteCanvas.sprites[i]; i++) {
            this.css = this.css.concat([
                "." + this.baseClassName + "-" + sprite.name + " {"
                , "    background: url(" + this.backgroundImageName + ".png) no-repeat -" + sprite.fit.x + "px -" + sprite.fit.y + "px;"
                , "    width: " + sprite.image.width + "px;"
                , "    height: " + sprite.image.height + "px;"
                , "}\n"
            ]);
        }

        // If there are retina sprites, add a media query to target Retina displays to the CSS
        if (retina) {
            this.css = this.css.concat([
                "@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {"
                , "    background-image: url(" + this.backgroundImageName + "@2x.png);"
                , "    background-size: " + this.spriteCanvas.root.width + "px " + this.spriteCanvas.root.height + "px;"
                , "}\n"
            ]);   
        }
        
        // Create Data URL
        this.dataURL = "data:text/plain," + encodeURIComponent(this.css.join("\n"));
        
        try {
            // Try to create a Blob from the data URL
            this.blob = GWS.createBlobFromDataURI(this.dataURL);
            // Try to create an objectURL from the Blob
            this.objectURL = GWS.createObjectURL(this.blob);
        } catch (error) {
            console.log(error)
        }
    };

}(window.GoWithSprite = window.GoWithSprite || {}));
