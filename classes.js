var Renderable = function (sprite,x,y) {
    this.sprite = sprite;
    this.start_x = x || -2, this.start_y = y || 70, this.x = x, this.y = y;
}
Renderable.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Renderable.prototype.reset = function() {
    this.x = this.start_x;
    this.y = this.start_y;
}
Renderable.prototype.stop = function() {}
Renderable.prototype.start = function() {}

var Enemy = function(x, y, speed) {
    Renderable.call(this,'images/enemy-bug.png',x, y);
    this.speed = speed || 1;
    this.isMoving = true;
}
Enemy.prototype = Object.create(Renderable.prototype);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (75 * this.speed) * dt;
    if (this.x >= 1010) {
        this.x =-2;
    }   
}
Enemy.prototype.stop = function () {
    this.isMoving = false;
}
Enemy.prototype.start = function () {
    this.isMoving = true;
}
Enemy.prototype.collision = function() {    
    stats['life'].number -= 1;
    resetLevel();
}

var EnemyLeft = function(x, y, speed) {
    Renderable.call(this,'images/enemy-bug-left.png',x, y);
    this.speed = speed || 1;
    this.isMoving = true;
}
EnemyLeft.prototype = Object.create(Renderable.prototype);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyLeft.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x = this.x - (75 * this.speed) * dt;
        if (this.x < -103) {
            this.x = 1010;
        }
       
}
EnemyLeft.prototype.stop = function () {
    this.isMoving = false;
}
EnemyLeft.prototype.start = function () {
    this.isMoving = true;
}
EnemyLeft.prototype.collision = function() {    
    stats['life'].number -= 1;
    resetLevel();
}

var Player = function() {
    Renderable.call(this,'',898, 390);
}
Player.prototype = Object.create(Renderable.prototype);
Player.prototype.update = function(dt) {
    //console.log("player.update called");
}
Player.prototype.handleInput = function(key) {
    console.log(key);    
    if ( key == 'right' && this.x < MAP_MAX_X) {
        this.x = this.x+PLAYER_MOV_X;
    } else if (key == 'left' && this.x > MAP_MIN_X) {
        this.x = this.x-PLAYER_MOV_X;;
    } else if (key == 'up' && this.y > MAP_MIN_Y) {
        this.y = this.y - PLAYER_MOV_Y;
    } else if (key == 'down' && this.y < MAP_MAX_Y) {
        this.y = this.y + PLAYER_MOV_Y;
    } else if (key == 'esc'){
        //Engine.reset(); NOT WORKING
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

var Star = function (x, y) {
    this.x = x, this.y = y;
    this.sprite = 'images/Star.png';
}
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Star.prototype.collision = function () {
    stats.stars['number'] += 1;
    removeFromEntities(this);
    if (stats.stars['number'] == 2) {
        stats.level == 2;
 //       resetLevel();
 //   }
}
}
Star.prototype.update = function(dt) {}
Star.prototype.stop = function() {}
Star.prototype.start = function() {}
Star.prototype.reset = function() {}

/* var MyObject = function(x, y, speed) {
    Renderable.call(this,'images/gem-orange.png',x, y);
    this.speed = speed;
    this.isMoving = true;
}
MyObject.prototype = Object.create(Renderable.prototype);
MyObject.prototype.update = function () {
    if (this.isMoving) {
        this.x = this.x + (1 * this.speed);
        if (this.x >= 1010) {
            this.x =-2;
        }
    }
}
MyObject.prototype.collision = function () {
    stopEntities();
    removeFromEntities(this);
    setTimeout(function(){
                    allEntities.forEach(function(entity) {
                   entity.start(); 
                });
                }, 3000);
}
MyObject.prototype.stop = function () {
    this.isMoving = false;
}
MyObject.prototype.start = function () {
    this.isMoving = true;
} */