var level0 = {
    numRows: 9,
    numCols: 11,
    playerStartX: 350,
    playerStartY: 540,
    maxTime: 60,
    map: [['images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png'],
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png'],
    water: [[0,60],[70,60],[210,60],[280,60],[420,60],[490,60],[630,60],[700,60]],
    stars: [[140,60],[350,60],[560,60]],
    starsToNextLevel: 3,
    enemies: [  [0,120,1],[350,120,1],[650,120,1],
                [150,180,5],[550,180,5],
                [0,240,5],[350,240,5],[650,240,5],
                [0,300,3],
                [100,360,1],[300,360,1],[500,360,1],
                [0,420,2],
                [0,480,1],[200,480,1],[400,480,1]],
    hearts: [],
    init: function (sprite) {
        allEntities = [];
        for (key in this.enemies) {
            allEntities.push(new Enemy(this.enemies[key][0], this.enemies[key][1],this.enemies[key][2]));
        }
        for (key in this.water) {
            allEntities.push(new Water(this.water[key][0], this.water[key][1]));
        }
        for (key in this.stars) {
            allEntities.push(new Star(this.stars[key][0],this.stars[key][1]));
        }
        for (key in this.hearts) {
            allEntities.push(new Heart(this.hearts[key][0],this.hearts[key][1],this.hearts[key][2]));
        }
        playerSprite.sprite = sprite; playerSprite.x = this.playerStartX; playerSprite.y = this.playerStartY;
    },
    reset: function () {
        // player.reset();
        // enemies.reset
    }
}
var level1 = {
    numRows: 9,
    numCols: 11,
    playerStartX: 350,
    playerStartY: 540,
    maxTime: 60,
    map: [['images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png'],
                'images/stone-block-70x60.png',
                'images/stone-block-70x60.png',
                'images/stone-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png'],
    water: [[0,60],[70,60],[210,60],[280,60],[420,60],[490,60],[630,60],[700,60]],
    stars: [[140,60],[350,60],[560,60]],
    starsToNextLevel: 3,
    enemies: [  [50,120,2],[350,120,2],[650,120,2],
                [200,180,1],[500,180,1],
                [0,240,3],[200,240,3],[400,240,3],[600,240,3],
                [400,300,4],
                [100,360,1],[300,360,1],[500,360,1],
                [0,420,4],
                [0,480,1],[200,480,1],[400,480,1],[600,480,1]],
    hearts: [[420,180,2]],
    init: function (sprite) {
        allEntities = [];
        for (key in this.enemies) {
            allEntities.push(new Enemy(this.enemies[key][0], this.enemies[key][1],this.enemies[key][2]));
        }
        for (key in this.water) {
            allEntities.push(new Water(this.water[key][0], this.water[key][1]));
        }
        for (key in this.stars) {
            allEntities.push(new Star(this.stars[key][0],this.stars[key][1]));
        }
        for (key in this.hearts) {
            allEntities.push(new Heart(this.hearts[key][0],this.hearts[key][1],this.hearts[key][2]));
        }
        playerSprite.sprite = sprite; playerSprite.x = this.playerStartX; playerSprite.y = this.playerStartY;
    },
    reset: function () {
        // player.reset();
        // enemies.reset
    }
}
var level2 = {
    numRows: 9,
    numCols: 11,
    playerStartX: 350,
    playerStartY: 540,
    maxTime: 60,
    map: [['images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png','images/stone-block-70x60.png','images/water-block-70x60.png','images/water-block-70x60.png'],
                'images/water-block-70x60.png',
                'images/water-block-70x60.png',
                'images/stone-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png',
                'images/grass-block-70x60.png'],
    water: [[0,60],[70,60],[210,60],[280,60],[420,60],[490,60],[630,60],[700,60]],
    stars: [[140,60],[350,60],[560,60]],
    starsToNextLevel: 3,
    enemies: [  [50,120,2],[250,120,2],[450,120,2],[650,120,2],
                [150,180,5],[500,180,5],
                [0,240,5],[200,240,5],[400,240,5],[600,240,5],
                [0,300,3],
                [100,360,1],[300,360,1],[500,360,1],[700,360,1],
                [0,420,2],
                [0,480,1],[200,480,1],[400,480,1],[600,480,1]],
    hearts: [420,180,50],
    init: function (sprite) {
        allEntities = [];
        for (key in this.enemies) {
            allEntities.push(new Enemy(this.enemies[key][0], this.enemies[key][1],this.enemies[key][2]));
        }
        for (key in this.water) {
            allEntities.push(new Water(this.water[key][0], this.water[key][1]));
        }
        for (key in this.stars) {
            allEntities.push(new Star(this.stars[key][0],this.stars[key][1]));
        }
        for (key in this.hearts) {
            allEntities.push(new Heart(this.hearts[key][0],this.hearts[key][1],this.hearts[key][2]));
        }
        playerSprite.sprite = sprite; playerSprite.x = this.playerStartX; playerSprite.y = this.playerStartY;
    },
    reset: function () {
        // player.reset();
        // enemies.reset
    }
}

var levelList = [];
levelList.push(level0);
levelList.push(level1);
levelList.push(level2);
