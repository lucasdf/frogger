var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        firstTime;
    var requestID = 0;

    canvas.height = screenSettings.screenHeight; //606;
    canvas.width = screenSettings.screenWidth; //1010;
    doc.body.appendChild(canvas);
    
    
    
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        timeElapsed = now - firstTime;

        update(dt);
        render();    
        lastTime = now;
        requestID = win.requestAnimationFrame(main);
    };
    
    function init() {   
        firstTime = Date.now();
        lastTime = Date.now();
//        renderStart();
        main(); 
    }
    function update(dt) {
        updateEntities(dt);
        checkCollisions(dt);
    }
    function checkCollisions(dt) {
        var p_x = player.x;
        var p_y = player.y;
        allEntities.forEach(function(entity) {
            var e_x = entity.x;
            var e_y = entity.y;
            if (e_y == p_y) {
                if (e_x > p_x -80 && e_x < p_x + 80) {
                    entity.collision();
                }
            }
        });
//        levels[gameStat.currentLevel]
        currentLevel.stars.forEach(function(entity) {
            var e_x = entity.x;
            var e_y = entity.y;
            if (e_y == p_y) {
                if (e_x > p_x -80 && e_x < p_x + 80) {
                    entity.collision();
                }
            }
        });

        player.isOnWater();
    }

    function updateEntities(dt) {
        allEntities.forEach(function(entity) {
            entity.update(dt);
        });
        player.update();
//        stats.update();
    }

    function render() {
        renderMap(currentLevel.map,currentLevel.mapX,currentLevel.mapY);
        renderEntities();

    }
    
    function renderMap(map,rows,cols) {
        var rowImages = map, numRows = rows, numCols = cols, row, col;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,1010,83);

        for (row = 0; row < numRows; row++) {
            var count = 0;
            for (col = 0; col < numCols; col++) {
                if (rowImages[row] instanceof Array) {
                    ctx.drawImage(Resources.get(rowImages[row][count]), col * screenSettings.mapCol, row * screenSettings.mapRow);
                    count++;                  
            } else {
                ctx.drawImage(Resources.get(rowImages[row]), col * screenSettings.mapCol, row * screenSettings.mapRow);
                }
            }
        }  
    }
    function renderEntities() {
    /*    allEntities.forEach(function(entity) {
            entity.render();
        }); */

        player.render();
        life.render();
        playerStars.render();
        currentLevel['stars'].forEach(function(entity) {
            entity.render();
        }); 
//        stats.render();
    }

    Resources.load([
        'images/Star.png',
        'images/Heart.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/enemy-bug-left.png',
        'images/Selector.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/gem-orange.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);

/*    function renderStart() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,1010,800);

        ctx.font="20px Georgia";
        ctx.fillStyle = 'blue';
        ctx.fillText("Select your player and press enter",100,90);
        selector.render();
    } */
