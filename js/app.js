var screenSettings = {
    screenWidth: 770,
    screenHeight: 600,
    baseMapCol: 70,
    baseMapRow: 60,
    basePercentage: 1.0,
    mapCol: 70,
    mapRow: 60,
    minPosX: 0,
    maxPosX: 700,
    minPosY: 60,
    maxPosY: 540
}

var timer = {
    elapsed: 0,
    now: 0,
    lastTime: 0,
    start: function () {
        this.lastTime = Date.now();
    },
    update: function () {
        this.now = Date.now();
        this.elapsed += this.now - this.lastTime;
        this.lastTime = this.now;
    },
    restart: function () {
        this.elapsed = 0,
        this.lastTime = Date.now();
    },
    getElapsed: function () {
        return Math.floor(this.elapsed/1000);
    }
}
var timeBar = {
    maxTime: 60,
    render: function () {

        var elapsed = timer.getElapsed();
        var width = screenSettings.screenWidth - ( (screenSettings.screenWidth / this.maxTime) * elapsed)
        ctx.fillStyle = 'red';
        ctx.fillRect(0,40,width,20);

        ctx.fillStyle = 'white';
        ctx.fillText( this.maxTime - timer.getElapsed(),screenSettings.screenWidth * 0.5,55);
    }
}

var player = {
    sprite: '',
    life: 5,
    currentLevel: 0,
    collectedStars: 0,
    temporaryScore: 0,
    totalScore: 0,
    currentLevelScore: {
        collectedHearts: 0,
        collectedHeartsScore: 0,
        collectedHeartsBaseScore: 100,

        collectedStars: 0,
        collectedStarsScore: 0,
        collectedStarsBaseScore: 100,

        collectedGems: 0,
        collectedGemsScore: 0,
        collectedGemsBaseScore: 100,

        timeRemaining: 0,
        timeRemainingScore: 0,
        timeRemainingBaseScore: 2,

        score: 0,
        restart: function () {
            this.collectedHearts = 0; this.collectedHeartsScore = 0;
            this.collectedStars = 0; this.collectedStarsScore = 0;
            this.collectedGems = 0; this.collectedGemsScore = 0;
            this.timeRemaining = 0; this.timeRemainingScore = 0;
            this.score = 0;
        },
        calculateScore: function () {
            this.collectedHeartsScore = this.collectedHearts * this.collectedHeartsBaseScore;
            this.collectedStars = player.collectedStars;
            this.collectedStarsScore = this.collectedStars * this.collectedStarsBaseScore;
            this.collectedGemsScore = this.collectedGems * this.collectedGemsBaseScore;
            this.timeRemaining = levelList[player.currentLevel].maxTime - timer.getElapsed();
            this.timeRemainingScore = this.timeRemaining * this.timeRemainingBaseScore;
            this.score = this.collectedHeartsScore + this.collectedStarsScore + this.collectedGemsScore + this.timeRemainingScore;
        }
    },
    reduceLife: function () {
        this.life--;
        if (this.life > 0) {
            this.restartLevel();
        } else {
            playerSprite.x = -200; playerSprite.y = -200;
            this.currentLevelScore.calculateScore();
            controller.screen = 'gameover';
        }
        
    },
    collectStar: function (obj) {
        removeFromEntities(obj);
        this.collectedStars++;
        this.temporaryScore += 100;
        
        if (this.collectedStars < levelList[this.currentLevel].starsToNextLevel) {
            this.restartLevel();
        } else {
            playerSprite.x = -200; playerSprite.y = -200;
            this.currentLevelScore.calculateScore();
            controller.screen = 'nextlevel';
        }     
    },
    gameOver: function () {
        controller.screen = 'menu';
        this.currentLevel = 0;
        levelList[0].init('images/char-boy-70x60.png');
    },
    collectHeart: function (obj) {
        this.life++;
        this.temporaryScore += 100;
        removeFromEntities(obj);
    },
    goToNextLevel: function () {
        this.currentLevel++;
        this.collectedStars = 0;
        this.totalScore += this.currentLevelScore.score;
        this.temporaryScore = this.totalScore;

        levelList[player.currentLevel].init(this.sprite);
        this.currentLevelScore.restart();
        timer.restart();
        controller.screen = 'game';
    },
    pauseGame: function () {
        allEntities.forEach(function(entity) {
            entity.pause();
        });
        controller.screen = 'pause';
    },
    resumeGame: function () {
        allEntities.forEach(function(entity) {
            entity.resume();
        });
        timer.start();
        controller.screen = 'game';
    },
    restartLevel: function () {
        playerSprite.reset();
        allEntities.forEach(function(entity) {
            entity.reset();
        });
    },
    startGame: function (sprite) {
        this.sprite = sprite;
        this.life = 5;
        this.currentLevel = 1;
        this.collectedStars = 0;
        this.temporaryScore = 0;
        this.totalScore = 0;
        this.currentLevelScore.restart();

        levelList[player.currentLevel].init(sprite);

        controller.screen = 'game';

        timer.restart();

        this.pauseGame(); // DEBUUUUG
    }
}

var SpacialObject = function (x, y, w, h) {
    this.x = x, this.y = y,
    this.width = w, this.height = h;
}
SpacialObject.prototype.collision = function () {}
SpacialObject.prototype.update = function () {}
SpacialObject.prototype.pause = function () {}
SpacialObject.prototype.render = function () {}
SpacialObject.prototype.resume = function () {}
SpacialObject.prototype.reset = function () {}

var Water = function (x, y) {
    SpacialObject.call(this, x, y, 70, 60);
}
Water.prototype = Object.create(SpacialObject.prototype);
Water.prototype.collision = function () {
    player.reduceLife();
}

var Renderable = function (sprite,x,y) {

    SpacialObject.call(this,x,y,70,60);

    this.sprite = sprite;    
    this.start_x = this.x, this.start_y = this.y;
    this.isMoving = true;

    //this.x = x, this.y = y,
    //this.width = 70, this.height = 60;
}
Renderable.prototype = Object.create(SpacialObject.prototype);
Renderable.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Renderable.prototype.reset = function() {
    this.x = this.start_x;
    this.y = this.start_y;
}
Renderable.prototype.pause = function() {
    this.isMoving = false;
}
Renderable.prototype.resume = function() {
    this.isMoving = true;
}

var Enemy = function(x,y,speed) {
    Renderable.call(this,'images/enemy-bug-70x60.png',x, y);
    this.speed = speed || 100;
    this.width = 70, this.height = 60;
}
Enemy.prototype = Object.create(Renderable.prototype);
Enemy.prototype.update = function(dt) {
    if (this.isMoving) {
        this.x = this.x + (this.speed);
        if (this.x >= screenSettings.screenWidth) {
            this.x = -70;
        }
    }
}
Enemy.prototype.collision = function () {
    //controller.pauseGame();
    player.reduceLife();
}

var Star = function(x,y) {
    Renderable.call(this,'images/Star-70x60.png',x,y);
    this.width= 70, this.height = 60;
}
Star.prototype = Object.create(Renderable.prototype);
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
}
Star.prototype.collision = function () {
    player.collectStar(this);
}

var Heart = function (x,y,speed) {
    Renderable.call(this,'images/Heart-70x60.png',x, y);
    this.speed = speed || 100;
    this.width = 70, this.height = 60;
}
Heart.prototype = Object.create(Renderable.prototype);
Heart.prototype.update = function(dt) {
    if (this.isMoving) {
        this.x = this.x + (this.speed);
        if (this.x >= screenSettings.screenWidth) {
            this.x = -70;
        }
    }
}
Heart.prototype.collision = function () {
    //controller.pauseGame();
    player.collectHeart(this);
}

var PlayerSprite = function(sprite,x,y) {
    Renderable.call(this,sprite,x,y);
    this.width = 70, this.height = 60;
}
PlayerSprite.prototype = Object.create(Renderable.prototype);
PlayerSprite.prototype.update = function(dt) {
    //console.log("player.update called");
}
PlayerSprite.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
var playerSprite = new PlayerSprite('images/char-boy-70x60.png',350,540);



// This listens for key presses and sends the keys to controller.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        27: 'escape',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var key = allowedKeys[e.keyCode];
    console.log(key);    
    controller.handleInput(allowedKeys[e.keyCode]); 
});

var allEntities = [];
levelList[0].init('images/char-boy-70x60.png');

function cheat () {
    player.collectStar();
    player.collectStar();
    player.collectStar();
}

function removeFromEntities (obj) {
    var index = allEntities.indexOf(obj);
    if (index > -1) {
        allEntities.splice(index,1);
    }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}

/* var EnemyLeft = function(x,y,speed) {
    Renderable.call(this,'images/enemy-bug-left.png',x, y);
    this.speed = speed || 125;
}
EnemyLeft.prototype = Object.create(Renderable.prototype);
EnemyLeft.prototype.update = function(dt) {
    if (this.isMoving) {
        this.x = this.x - (this.speed * screenSettings.basePercentage) * dt;
        if (this.x <= -100) {
            this.x = screenSettings.screenWidth;
        }
    }
}
EnemyLeft.prototype.collision = function () {
    player.reduceLife();
} */
