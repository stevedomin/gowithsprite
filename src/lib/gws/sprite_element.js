// GWS.SpriteElement
// ----------------

(function(GWS, undefined) {
	
	// ### constructor
    //
	GWS.SpriteElement = function(src, file, cb) {
		// File infos properties
		this.id = GWS.GUID();
		this.name = file.name;
		this.type = file.type;
		this.size = file.size;
		this.src = src;
		
		// Size properties
		this.width = this.height = 0;
		this.area = 0;

		// Callback is mainly used for spec
		this.cb = cb;

		this.image = new Image();
		var self = this; 
		this.image.onload = function() {
			// Initialize size properties once image is loaded
			self.width = self.image.width;
			self.height = self.image.height;
			self.area = self.width * self.height;
			
			// Call the callback. This is used for spec
			if(self.cb) self.cb();
		};
		this.image.src = this.src;
	};
	
	// ### render
	//
    // Render the SpriteElement using template engine
	GWS.SpriteElement.prototype.render = function() {
		return tmpl('sprite_template', this);
	};

}(window.GoWithSprite = window.GoWithSprite || {}));
