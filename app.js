var MAP_MAX_X = 898, MAP_MAX_Y = 390;
var MAP_MIN_X = -2, MAP_MIN_Y = -10;
var PLAYER_MOV_X = 100, PLAYER_MOV_Y =  80;

var Handler = function () {
    this.handler = "selector";
    this.level = 0;
}
Handler.prototype.handleInput = function(key) {
    if (this.handler == "selector") {
        if (selector.handleInput(key)) {
            this.level = 1;
        }
    } else if (this.handler == "player") {
        player.handleInput(key);
    }
}
var handler = new Handler();

var Selector = function () {
    this.sprite = 'images/Selector.png';
    this.x = 298, this.y = 230;
    this.option = [['images/char-boy.png',298,230],
        ['images/char-cat-girl.png',398,230],
        ['images/char-horn-girl.png',498,230]];
}
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
    if (this.x == 298) {
        player.sprite = 'images/char-boy.png';
    } else if (this.x == 398) {
        player.sprite = 'images/char-cat-girl.png';
    } else if (this.x == 498) {
        player.sprite = 'images/char-horn-girl.png';
    } else if (this.x == 598) {
        player.sprite = 'images/char-pink-girl.png';
    }

    handler.handler = "player";
    handler.level = 1;
    createEnemies();
}
Selector.prototype.render = function () {
    console.log('rendering selector');
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.option.forEach(function(option) {
        ctx.drawImage(Resources.get(option[0]), option[1], option[2]);
    });
}
Selector.prototype.update = function () {}
var selector = new Selector();

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    this.sprite = 'images/enemy-bug.png';
    this.start_x = x || -2;
    this.start_y = y || 70;
    this.x = x || -2;
    this.y = y || 70;
    this.speed = speed || 1;
    this.isMoving = true;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.isMoving) {
        this.x = this.x + (1 * this.speed);
    if (this.x >= 1010) {
        this.x =-2;
    }
    }    
}
Enemy.prototype.stop = function () {
    this.isMoving = false;
}
Enemy.prototype.start = function () {
    this.isMoving = true;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Enemy.prototype.reset = function() {
    this.x = this.start_x;
    this.y = this.start_y;
}
Enemy.prototype.collision = function() {
    stopEntities();
    stats['life'].number -= 1;
    resetLevel();
}

var Object = function(x, y, speed) {
    this.sprite = 'images/gem-orange.png';
    this.x = x, this.y = y, this.start_x = x, this.start_y = y;
    this.speed = speed;
    this.isMoving = true;
}
Object.prototype.update = function () {
    if (this.isMoving) {
        this.x = this.x + (1 * this.speed);
        if (this.x >= 1010) {
            this.x =-2;
        }
    }
}
Object.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Object.prototype.collision = function () {
    stopEntities();
    removeFromEntities(this);
    setTimeout(function(){
                    allEntities.forEach(function(entity) {
                   entity.start(); 
                });
                }, 3000);
}
Object.prototype.stop = function () {
    this.isMoving = false;
}
Object.prototype.start = function () {
    this.isMoving = true;
}
Object.prototype.reset = function () {
    this.x = this.start_x, this.y = this.start_y;
}

var Star = function (x, y) {
    this.x = x, this.y = y;
    this.sprite = 'images/Star.png';
}
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Star.prototype.collision = function () {

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Stats = function () {
    this.life = {
        sprite: 'images/Heart.png',
        number: 5        
    }
    this.points = 0;
}
Stats.prototype.render = function () {
    var img_x = 0, img_y = 0;
        for ( x = 0; x < this.life['number']; x++) {
            ctx.drawImage(Resources.get(this.life['sprite']),img_x,0,50,50);
            img_x += 55;
        }
}
Stats.prototype.update = function () {

}
Stats.prototype.restart = function () {
    this.life['number'] = 5;
}
var Player = function() {
    this.sprite = "";  
    this.start_x = 898, this.start_y = 390;
    this.x = 898, this.y = 390;
}
Player.prototype.update = function(dt) {
    //console.log("player.update called");
}
Player.prototype.reset = function() {
    this.x = this.start_x;
    this.y = this.start_y;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    console.log(key);    
    if ( key == 'right') {
        this.x = this.x+PLAYER_MOV_X;
    } else if (key == 'left') {
        this.x = this.x-PLAYER_MOV_X;;
    } else if (key == 'up') {
        this.y = this.y - PLAYER_MOV_Y;
    } else if (key == 'down') {
        this.y = this.y + PLAYER_MOV_Y;
    } else if (key == 'esc'){
        //Engine.reset(); NOT WORKING
    }
    if (this.x > MAP_MAX_X) {
        this.x = MAP_MAX_X;
    } else if (this.x < MAP_MIN_X) {
        this.x = MAP_MIN_X;
    } else if (this.y > MAP_MAX_Y) {
        this.y = MAP_MAX_Y;
    } else if (this.y < MAP_MIN_Y) {
        this.y = MAP_MIN_Y;
    }
   console.log(this.x);
   console.log(this.y); 
}
Player.prototype.isOnWater = function() {
    if (this.y == -10) {
            if (this.x == 198 || this.x == 698) {
                return false;
            } else {
                stats['life'].number -= 1;
                resetLevel();
                return true;
            }
        }
}
// my edit //

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// my edit //

var stats = new Stats();
var player = new Player();
var objects = [];
var star1 = new Star (198,-10);
var star2 = new Star (698,-10);
var allEntities = [];

function createEnemies() {
    allEntities.push(new Enemy());
    allEntities.push(new Enemy(-200,70,1));
    allEntities.push(new Enemy(-2,150,2));
    allEntities.push(new Enemy(-2,310,1.5));
    allEntities.push(new Object(-300,70,1));
}
function restartGame() {
    allEntities.length = 0;
    player = new Player();
    stats.restart();
    handler.level = 0;
    handler.handler = "selector"
}


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
function removeFromEntities (obj) {
    var index = allEntities.indexOf(obj);
    if (index > -1) {
        allEntities.splice(index,1);
    }
}

function resetLevel () {
    if (stats.life['number'] == 0) {
        restartGame();
    } else {
        allEntities.forEach(function(entity) {
            entity.reset();
            entity.start();
        });
        player.reset();
    }
}

document.addEventListener(/*'keyup'*/'keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'esc', // need to know how to access engine.reset()
        13: 'enter'
    };

    handler.handleInput(allowedKeys[e.keyCode]);
});
