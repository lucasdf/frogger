var MAP_MAX_X = 798, MAP_MAX_Y = 390;
var MAP_MIN_X = -2, MAP_MIN_Y = -10;
var PLAYER_MOV_X = 100, PLAYER_MOV_Y =  80;

// Enemies our player must avoid

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player('images/char-boy.png');
var star1 = new Star (198,-10);
var star2 = new Star (698,-10);
var allEntities = [];

function createEnemies() {
    allEntities.push(new Enemy());
    allEntities.push(new Enemy(-200,70,1));
    allEntities.push(new Enemy(-2,150,2));
    allEntities.push(new Enemy(-2,310,1.5));
    allEntities.push(new EnemyLeft(1010,70,1.5));
}

function restartGame() {
    allEntities.length = 0;
    player = new Player();
    stats.restart();
    stats.level = 0;
    handler.handler = "selector"
}

function removeFromEntities (obj) {
    var index = allEntities.indexOf(obj);
    if (index > -1) {
        allEntities.splice(index,1);
    }
}

function removeFromArray (arr, obj) {
    var index = arr.indexOf(obj);
    if (index > -1) {
        arr.splice(index,1);
    }
}


function resetLevel () {
    if (stats.life['number'] == 0) {
        restartGame();
    } else {
        stopEntities();
        allEntities.forEach(function(entity) {
            entity.reset();
            entity.start();
        });
        player.reset();
//        selector.reset();
    }
}

document.addEventListener(/*'keyup'*/'keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'esc', // open pause screen, allow to restart
        13: 'enter'
    };
    // handler.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});

/* 
var Selector = function () {
    Renderable.call(this,'images/Selector.png',298, 230);
    this.option = [['images/char-boy.png',298,230],
        ['images/char-cat-girl.png',398,230],
        ['images/char-horn-girl.png',498,230]];
}
Selector.prototype = Object.create(Renderable.prototype);
Selector.prototype.handleInput = function(key) {
    console.log(key);    
    if ( key == 'right') {
        this.x = this.x+PLAYER_MOV_X;
    } else if (key == 'left') {
        this.x = this.x-PLAYER_MOV_X;;
    } else if (key == 'enter'){
        this.select();
    }
    if (this.x > 598) {
        this.x = 598;
    } else if (this.x < 298) {
        this.x = 298;
    }
   console.log(this.x);
   console.log(this.y); 
}
Selector.prototype.select = function () {
    if (this.x == 298 || this.x == 398 || this.x == 498) {
    if (this.x == 298) {
        player.sprite = 'images/char-boy.png';
    } else if (this.x == 398) {
        player.sprite = 'images/char-cat-girl.png';
    } else if (this.x == 498) {
        player.sprite = 'images/char-horn-girl.png';
    }
    handler.handler = "player";
    stats.level = 1;
    createEnemies();
    }
}

Selector.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.option.forEach(function(option) {
        ctx.drawImage(Resources.get(option[0]), option[1], option[2]);
    });
}
Selector.prototype.update = function () {}
var selector = new Selector(); 
*/

/*
function stopEntities () {
    allEntities.forEach(function(entity) {
            entity.stop();
        });
}
function startEntities () {
    allEntities.forEach(function(entity) {
            entity.start();
        });
} 
*/