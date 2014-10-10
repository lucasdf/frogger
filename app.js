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

var Object = function(x, y, speed) {
    this.sprite = 'images/gem-orange.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

Object.prototype.update = function () {
    this.x = this.x + (1 * this.speed);
    if (this.x >= 1010) {
        this.x =-2;
    }
}

Object.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Object.prototype.checkCollision = function (player_x, player_y) {
    if (this.y == player_y) {
        if (this.x > player_x - 80 && this.x < player_x + 70) {
            removeFromObjects(this);
            return true;
        }   
    }
    return false;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// my edit //
var MAP_MAX_X = 898;
var MAP_MAX_Y = 390;
var MAP_MIN_X = -2;
var MAP_MIN_Y = -10;

var PLAYER_MOV_X = 100;
var PLAYER_MOV_Y =  80;

var Stats = function () {
    this.life = {
        sprite: 'images/Heart.png',
        number: 5        
    }
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

var Player = function() {
    this.sprite = 'images/char-boy.png';   
    this.start_x = 898;
    this.start_y = 390;
    
    this.x = 898;
    this.y = 390;
    
    this.life = {
        sprite: 'images/Heart.png',
        number: 5        
    }
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
   // console.log(this.x);
   // console.log(this.y); 
}
// my edit //

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// my edit //
var allEnemies = [];
function createEnemies() {
    allEnemies.push(new Enemy());
    allEnemies.push(new Enemy(-200,70,1));
    allEnemies.push(new Enemy(-2,150,2));
    allEnemies.push(new Enemy(-2,230,2));
    allEnemies.push(new Enemy(-2,310,1.5));
    allEnemies.push(new Enemy(-100,390,4));
    allEnemies.push(new Enemy(-2,390,4));

}
function stopEnemies() {
    allEnemies.length = 0;
    console.log(allEnemies);
}

var stats = new Stats();
var player = new Player();
var objects = [];
objects.push(new Object(-300,70,1));
objects.push(new Object(-500,70,1));
function removeFromObjects (obj) {
    var index = objects.indexOf(obj);
    if (index > -1) {
        objects.splice(index,1);
    }
}

// my edit //


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener(/*'keyup'*/'keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'esc' // need to know how to access engine.reset()
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
