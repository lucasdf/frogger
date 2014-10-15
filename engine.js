var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;
    var requestID = 0;

    canvas.height = 606;
    canvas.width = 1010;
    doc.body.appendChild(canvas);
    
    
    
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        
        update(dt);
        if (handler.level == 0) {
            renderStart(); } 
        else {
            render(); 
        }
        lastTime = now;
        requestID = win.requestAnimationFrame(main);
        
    };

    function init() {      
        lastTime = Date.now();
        if (handler.level == 0) {
            renderStart();
            main();
        } else {
            render();
            createEnemies();
            main();
        }
        
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
        stats.update();
    }

    function renderStart() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,1010,800);

        ctx.font="20px Georgia";
        ctx.fillStyle = 'blue';
        ctx.fillText("Select your player and press enter",100,90);
        selector.render();
    }
    function render() {
        renderMap(map,6,10);   
        renderEntities();
    }
    
    function renderMap(map,rows,cols) {
        var rowImages = map, numRows = rows, numCols = cols, row, col;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,1010,83);


        for (row = 0; row < numRows; row++) {
            var count = 0;
            for (col = 0; col < numCols; col++) {
                if (rowImages[row] instanceof Array) {
                    ctx.drawImage(Resources.get(rowImages[row][count]), col * 101, row * 83);
                    count++;                  
            } else {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
            }
        }  
    }
    function renderEntities() {
        allEntities.forEach(function(entity) {
            entity.render();
        });
        player.render();
        stats.render();
    }

    Resources.load([
        'images/Star.png',
        'images/Heart.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
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
