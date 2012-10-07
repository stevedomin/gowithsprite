// GWS.SpriteCanvas
// ----------------

// This new version of SpriteCanvas uses a box packing algorithm. 
// Thanks Jake Gordon for helping understand how it works and the algorithm above.
// http://codeincomplete.com/posts/2011/5/7/bin_packing/
(function(GWS, undefined) {

    // ### constructor
    //
	GWS.SpriteCanvas = function(sprites) {
		this.sprites = sprites;

        // Create the canvas element
		this.canvas = document.createElement("canvas");

        if (this.sprites.length > 0) {
            // Try to fit all sprites using a box packing algorithm
            this.fit();
            this.draw();
            this.generateSprite();
        }
    };

    // ### fit
    //
    GWS.SpriteCanvas.prototype.fit = function(sprites) {
        var node
            , sprite
            , l = this.sprites.length
            , w = l > 0 ? this.sprites[0].width : 0
            , h = l > 0 ? this.sprites[0].height : 0;
        
        this.root = {
              x: 0
            , y: 0
            , width: w
            , height: h 
        };

        for (var i = 0; i < l ; i++) {
            sprite = this.sprites[i];

            if (node = this.findNode(this.root, sprite.width, sprite.height))
                sprite.fit = this.splitNode(node, sprite.width, sprite.height);
            else
                sprite.fit = this.growNode(sprite.width, sprite.height);
        }
    };

    // ### findNode
    //
    GWS.SpriteCanvas.prototype.findNode = function(root, w, h) {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.width) && (h <= root.height))
            return root;
        else
            return null;
    };

    // ### splitNode
    //
    GWS.SpriteCanvas.prototype.splitNode = function(node, w, h) {
        node.used = true;
        node.down  = { x: node.x,     y: node.y + h, width: node.width,     height: node.height - h };
        node.right = { x: node.x + w, y: node.y,     width: node.width - w, height: h          };
        return node;
    };

    // ### growNode
    //
    GWS.SpriteCanvas.prototype.growNode = function(w, h) {
        var canGrowDown  = (w <= this.root.width);
        var canGrowRight = (h <= this.root.height);

        var shouldGrowRight = canGrowRight && (this.root.height >= (this.root.width + w)); // attempt to keep square-ish by growing right when height is much greater than width
        var shouldGrowDown  = canGrowDown  && (this.root.width >= (this.root.height + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

        if (shouldGrowRight)
            return this.growRight(w, h);
        else if (shouldGrowDown)
            return this.growDown(w, h);
        else if (canGrowRight)
            return this.growRight(w, h);
        else if (canGrowDown)
            return this.growDown(w, h);
        else
            return null; // need to ensure sensible root starting size to avoid this happening
    };

    // ### growRight
    //
    GWS.SpriteCanvas.prototype.growRight = function(w, h) {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width + w,
            height: this.root.height,
            down: this.root,
            right: { x: this.root.width, y: 0, width: w, height: this.root.height }
        };
        
        if (node = this.findNode(this.root, w, h))
            return this.splitNode(node, w, h);
        else
            return null;
    };

    // ### growDown
    //
    GWS.SpriteCanvas.prototype.growDown = function(w, h) {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width,
            height: this.root.height + h,
            down:  { x: 0, y: this.root.height, width: this.root.width, height: h },
            right: this.root
        };

        if (node = this.findNode(this.root, w, h))
            return this.splitNode(node, w, h);
        else
            return null;
    };

    // ### draw
    //
    // Draw sprites on canvas
	GWS.SpriteCanvas.prototype.draw = function() {
		var context, data;

        this.canvas.width = this.root.width;
        this.canvas.height = this.root.height;

        try {
            context = this.canvas.getContext('2d');
            
            var i, sprite;
            for (i = 0 ; i < this.sprites.length ; i++) {
                sprite = this.sprites[i];

                if (sprite.fit)
                    context.drawImage(sprite.image, sprite.fit.x, sprite.fit.y);
            }
        } catch (error) {
            console.log(error);
        }
	};

    // ### generateSprite
    //
    // Genereate Blob and objectURL of sprite
    GWS.SpriteCanvas.prototype.generateSprite = function() {
        // Create Data URL
        this.dataURL = this.canvas.toDataURL("image/png");
        try {
            // Try to create a Blob from the data URL
            this.blob = GWS.createBlobFromDataURI(this.dataURL);
            // Try to create an objectURL from the Blob
            this.objectURL = GWS.createObjectURL(this.blob);
        } catch (e) {
            console.log(error);
        }
    };

}(window.GoWithSprite = window.GoWithSprite || {}));
