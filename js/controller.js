var controller = {
    screen: 'menu',
    renderBlackAndWhiteEffect: function () {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0,0,770,600); // (screenSettings.screenWidth,screenSettings.screenHeight)
    },
    renderHUD: function () {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,770,60); // (screenSettings.screenWidth,60)

        for ( var x = 0; x < player.life; x++) {
            if (x > 3) {              
                var text = player.life - 3 + 'x';
                ctx.font="15px Georgia";
                ctx.fillStyle = "yellow";
                ctx.fillText(text,190,20);
                break;
            }
            ctx.drawImage(Resources.get('images/Heart-50x40.png'),x*55,0);
        }


        ctx.font="20px Georgia";
        ctx.fillStyle = "yellow";
        ctx.fillText(player.temporaryScore, 385,20); // (screenSettings.screenWidth * 0.5,20)

        ctx.drawImage(Resources.get('images/Star-50x40.png'),677.6,0); // (screenSettings.screenWidth * 0.88,0)
        var textStars = player.collectedStars+"/"+levelList[player.currentLevel].starsToNextLevel;
        ctx.fillText(textStars,746.9,25); // (screenSettings.screenWidth * 0.97,25)
    },
    render: function () {
        switch(this.screen) {
            case 'menu':
                menuScreen.render();
                break;
            case 'newgame':
                newGameScreen.render();
                break;
            case 'game':
                this.renderHUD();
                timer.update();
                timeBar.render();
                break;
            case 'pause':
                this.renderBlackAndWhiteEffect();

                ctx.font="20px Georgia";
                ctx.fillStyle = "white";
                ctx.fillText("Game Paused, press ESC to resume",385,40); // (screenSettings.screenWidth * 0.5,40);
                break;
            case 'nextlevel':
                this.renderBlackAndWhiteEffect();

                roundRect(ctx,100, 100, 600, 450, 5, true, false);

                ctx.font="20px Georgia";
                ctx.fillStyle = "white";
                ctx.fillText("Congratulations! You finished this level!",385,150); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.25)
                ctx.fillText("Last Level Score: " + player.totalScore,385,210); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.35)

                ctx.fillText(player.currentLevelScore.collectedHearts + " hearts: " + player.currentLevelScore.collectedHeartsScore,385,240); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.4)
                ctx.fillText(player.currentLevelScore.collectedStars + " start: " + player.currentLevelScore.collectedStarsScore,385,270); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.45)
                ctx.fillText(player.currentLevelScore.collectedGems + " gems: " + player.currentLevelScore.collectedGemsScore,385,300); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.5)
                ctx.fillText(player.currentLevelScore.timeRemaining + " time remaining: " + player.currentLevelScore.timeRemainingScore,385,330); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.55)

                ctx.fillText("This Level Score: " + player.currentLevelScore.score,385,390); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.65)
                ctx.fillText("Total Score: " + (player.totalScore + player.currentLevelScore.score),385,450); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.75)

                ctx.fillText("Press ENTER to continue",385,510); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.85)
                break;
            case 'gameover':
                this.renderBlackAndWhiteEffect();

                roundRect(ctx,100, 100, 600, 400, 5, true, false);

                ctx.font="20px Georgia";
                ctx.fillStyle = "white";
                ctx.fillText("Game Over =(",385,180); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.3)
                ctx.fillText("Points: " + player.levelPoints,385,240); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.4)
                ctx.fillText("Press ENTER to continue",385,420); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.7)
                break;
            default:
                break;
        }
    },
    handleInput: function (key)
    {
        switch(this.screen) {
            case 'game':
                if ( key === 'right' && playerSprite.x < screenSettings.maxPosX) {
                    playerSprite.x = playerSprite.x + screenSettings.mapCol;
                } else if (key === 'left' && playerSprite.x > screenSettings.minPosX) {
                    playerSprite.x = playerSprite.x - screenSettings.mapCol;
                } else if (key === 'up' && playerSprite.y > screenSettings.minPosY) {
                    playerSprite.y = playerSprite.y - screenSettings.mapRow;
                } else if (key === 'down' && playerSprite.y < screenSettings.maxPosY) {
                    playerSprite.y = playerSprite.y + screenSettings.mapRow;
                } else if (key === 'escape'){
                    player.pauseGame();               
                }   
                console.log(playerSprite.x);
                console.log(playerSprite.y); 
                break;
            case 'pause':
                if (key === 'escape') {
                    player.resumeGame();
                }
                break;
            case 'newgame':
                newGameScreen.handleInput(key);
                break;
            case 'menu':
                menuScreen.handleInput(key);
                break;
            case 'nextlevel':
                if (key === 'enter') {
                    player.goToNextLevel();
                }
                break;
            case 'gameover':
                if (key === 'enter') {
                    player.gameOver();
                }
                break;
            default:
                break;
        }
    }
}