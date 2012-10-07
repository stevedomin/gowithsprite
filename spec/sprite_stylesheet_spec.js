describe('SpriteStylesheet', function(){

    describe('#constructor()', function(){
        it('should construct a new instance of SpriteStylesheet without errors', function(){
            
        	var spriteCanvas = new GoWithSprite.SpriteCanvas([]);
        	var retinaSpriteCanvas = new GoWithSprite.SpriteCanvas([]);

            var s = new GoWithSprite.SpriteStylesheet(spriteCanvas, retinaSpriteCanvas);
        })
    })

    describe('#setSpriteCanvas()', function(){
        it('should not call generateCSS()', function(){
            
        	var spriteCanvas = new GoWithSprite.SpriteCanvas([]);
        	var retinaSpriteCanvas = new GoWithSprite.SpriteCanvas([]);

            var s = new GoWithSprite.SpriteStylesheet(spriteCanvas, retinaSpriteCanvas);
            s.setSpriteCanvas(new GoWithSprite.SpriteCanvas([]));

            assert(typeof s.css === 'undefined');
        })
    })

    describe('#setRetinaSpriteCanvas()', function(){
        it('should not call generateCSS()', function(){
            
        	var spriteCanvas = new GoWithSprite.SpriteCanvas([]);
        	var retinaSpriteCanvas = new GoWithSprite.SpriteCanvas([]);

            var s = new GoWithSprite.SpriteStylesheet(spriteCanvas, retinaSpriteCanvas);
            s.setRetinaSpriteCanvas(new GoWithSprite.SpriteCanvas([]));

            assert(typeof s.css === 'undefined');
        })
    })

    describe('#genereateCSS()', function(){
        it('should not call generateCSS()', function(){
            
        	var spriteCanvas = new GoWithSprite.SpriteCanvas([]);
        	var retinaSpriteCanvas = new GoWithSprite.SpriteCanvas([]);

            var s = new GoWithSprite.SpriteStylesheet(spriteCanvas, retinaSpriteCanvas);
            s.setRetinaSpriteCanvas(new GoWithSprite.SpriteCanvas([]));

            assert(typeof s.css === 'undefined');
        })
    })

})