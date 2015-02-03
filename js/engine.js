var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;
    canvas.height = screenSettings.screenHeight; //606;
    canvas.width = screenSettings.screenWidth; //1010;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        checkCollisions();
        updateEntities(dt);
        
    }

    function checkCollisions() {
        allEntities.forEach(function(entity) {
            if (entity.x < playerSprite.x + playerSprite.width &&
                entity.x + playerSprite.width > playerSprite.x &&
                entity.y < playerSprite.y + playerSprite.height &&
                entity.height + entity.y > playerSprite.y) {
                
                entity.collision();
            }
        });
    }

    function updateEntities(dt) {
        allEntities.forEach(function(entity) {
            entity.update(dt);
        });
    }

    function render() {
        var currentLevel = levelList[player.currentLevel];
        var rowImages = currentLevel.map, numRows = currentLevel.numRows, numCols = currentLevel.numCols, row, col;
        for (row = 0; row < numRows; row++) {
            var count = 0;
            for (col = 0; col < numCols; col++) {
                if (rowImages[row] instanceof Array) {
                    ctx.drawImage(Resources.get(rowImages[row][count]), col * 70, row * 60 + 60);
                    count++;                  
                    } else {
                        ctx.drawImage(Resources.get(rowImages[row]), col * 70, row * 60 + 60);                
                    }
                }
            }
        renderEntities();
        controller.render();
        
    }

    var renderAnimation = (function () {
        var time = 140;
        var actual = 0;
        var decrease = (screenSettings.screenHeight - 52) / time;
        return function () {
            if (actual < time) {
                ctx.fillRect(0,0,screenSettings.screenWidth,screenSettings.screenHeight - (decrease * actual));
                console.log("yep");
                console.log(screenSettings.screenHeight - (decrease * actual));
                actual++;
            }
        }
            
    })();
    
    function renderEntities() {
        allEntities.forEach(function(entity) {
            entity.render();
        });
        playerSprite.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/Star.png',
        'images/Star-50x40.png',
        'images/Star-70x60.png',
        'images/Heart.png',
        'images/Heart-50x40.png',
        'images/Heart-70x60.png',
        'images/stone-block.png',
        'images/stone-block-70x60.png',
        'images/water-block.png',
        'images/water-block-70x60.png',
        'images/grass-block.png',
        'images/grass-block-70x60.png',
        'images/grass-block-f.png',
        'images/grass-block-r.png',
        'images/grass-block-o.png',
        'images/grass-block-g.png',
        'images/grass-block-e.png',
        'images/enemy-bug-70x60.png',
        'images/enemy-bug-left.png',
        'images/Selector.png',
        'images/char-boy.png',
        'images/char-boy-70x60.png',
        'images/char-cat-girl.png',
        'images/char-cat-girl-70x60.png',
        'images/char-horn-girl.png',
        'images/char-horn-girl-70x60.png',
        'images/char-pink-girl.png',
        'images/char-pink-girl-70x60.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
    global.canvas = canvas;
})(this);
