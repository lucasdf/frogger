var life = {
	total: 5,
	sprite: 'images/Heart.png',
	spriteInitialPosX: 0,
	spriteIncrementalPosX: 55,
	render: function () {
		posX = 0;
		for ( x = 0; x < this.total; x++) {
            ctx.drawImage(Resources.get(this.sprite),posX,0,50,50);
            posX += this.spriteIncrementalPosX;
        }
	}
}
var playerStars = {
    collected: 0,
    sprite: 'images/Star.png',
    render: function () {
        ctx.drawImage(Resources.get(this.sprite),800,0,50,50);

        ctx.font="20px Georgia";
        ctx.fillStyle = "yellow";
        ctx.fillText(this.collected+"/"+currentLevel.starsToNextLevel,850,35,150);
    }
}

var screenSettings = {
	screenWidth: 909,
	screenHeight: 606,
	mapCol: 101,
	mapRow: 83,
	changeResolution: function() {
		this.screenWidth = 505;
		this.screenHeight = 303;
		this.mapCol = 50.5;
		this.mapRow = 41.5;
	}
}

var level1 = {
	mapX: 6,
	mapY: 9,
	map: [['images/water-block.png','images/stone-block.png','images/water-block.png','images/water-block.png','images/stone-block.png','images/water-block.png','images/water-block.png','images/stone-block.png','images/water-block.png'],
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png' ],
    water: [[-2,-10],[198,-10],[298,-10],[498,-10],[598,-10],[798,-10]],
    isOnWater: function (playerX, playerY) {	
    	for (key in this.water) {
    		if (this.water[key][0] === playerX && this.water[key][1] === playerY) {
                life.total -= 1;
                this.reset();
    			return true;
    		}
    	}
    	return false;
    },
    collectedStars: 0,
    starsToNextLevel: 3,
    stars: [new Star (98,-10),new Star (398,-10),new Star (698,-10)],
    collectStar: function (star) {
    	this.collectedStars += 1;
        playerStars.collected += 1;
    	removeFromArray(this.stars, star);
    	if (this.collectedStars === this.starsToNextLevel) {
    		currentLevel = level2;
    		console.log("Congratulations");
    	}
        this.reset();
    },
    reset: function () {
        player.reset();
        // enemies.reset
    }
}
var level2 = {
	mapX: 6,
	mapY: 9,
	map:[['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/stone-block.png','images/water-block.png'],
         ['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png'],
         ['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png'],
		 ['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png'],
		 ['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png'],
		 ['images/stone-block.png','images/stone-block.png','images/stone-block.png','images/stone-block.png','images/water-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png','images/grass-block.png']],
    water: [[598,-10],[798,-10],[398,70],[398,150],[398,230],[398,310],[398,390]],
    isOnWater: function (playerX, playerY) {	
    	for (key in this.water) {
    		if (this.water[key][0] === playerX && this.water[key][1] === playerY) {
                this.reset();
    			return true;
    		}
    	}
    	return false;
    },
    collectedStars: 0,
    starsToNextLevel: 3,
    stars: [new Star (98,-10),new Star (398,-10),new Star (698,-10)],
    collectStar: function (star) {
    	this.collectedStars += 1;
    	removeFromArray(this.stars, star);
    	if (this.collectedStars === this.starsToNextLevel) {
    		console.log("Congratulations");
    	}
    },
    reset: function () {
        player.reset();
    }
}

var currentLevel = level1