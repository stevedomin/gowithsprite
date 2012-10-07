describe('SpriteElement', function(){

    describe('#constructor()', function(){
        it('should construct a new instance of SpriteElement without errors', function(){
            var s = new GoWithSprite.SpriteElement("./assets/alarm.png", {name:"alarm.png", size:500, type:"image/png"});
        })

        it('should have width and height properties setted after image load', function(){
            var s = new GoWithSprite.SpriteElement("./assets/alarm.png", {name:"alarm.png", size:500, type:"image/png"}, function() {
                assert(s.width === 24 && s.height === 24);
            });
        })
    })

    describe('#render()', function(){
        it('should execute without errors', function(){
            var s = new GoWithSprite.SpriteElement("./assets/alarm.png", {name:"alarm.png", size:500, type:"image/png"});
            s.render()
        })
    })
})