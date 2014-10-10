var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;
    var requestID = 0;
    var stopped;
    

    canvas.height = 606;
    canvas.width = 1010;
    doc.body.appendChild(canvas);
    
    
    
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        
        update(dt);
        render();
        lastTime = now;
        if (!stopped) {
        requestID = win.requestAnimationFrame(main);
        }
        
    };

    function init() {

 //       reset();
        stopEnemies();        
        lastTime = Date.now();
        render();
        createEnemies();
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
                if (e_x > p_x -80 && e_x < p_x + 70) {
                    if (entity.collision() == 0) {
                        restartGame();
                    }
                }
            }
        });
    }
    function updateEntities(dt) {
        allEntities.forEach(function(entity) {
            entity.update();
        });
        player.update();
        stats.update();
    }

    function render() {
        ctx.fillRect(0,0,1010,83);
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 10,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }     
        renderEntities();
    }
    
    function renderEntities() {
        allEntities.forEach(function(entity) {
            entity.render();
        });
        player.render();
        stats.render();
    }

    function resetGame() {
        allEntities.forEach(function(entity) {
            entity.reset();
        });
        player.reset();
        stats['life'].reset();
    }
    
    function stopEnemies() {
    allEntities.length = 0;
    }
    
    function reset() {
        console.log('reset called');
        window.cancelAnimationFrame(requestID);
        stopped = true;
        stopEnemies();
        setTimeout(function(){
            //resetAll();
            //createEnemies();
            stopped = false;
            console.log("timeout called")
            //requestID = win.requestAnimationFrame(main);
            init();
            }, 3000);
    }

    Resources.load([
        
        'images/Heart.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/gem-orange.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
