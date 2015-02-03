var menuScreen = {
    selected: 0,
    button: [
        {text: 'NEW GAME', run: function() {controller.screen = 'newgame';}},
        {text: 'LEADERBOARD'},
        {text: 'SETTINGS'}
    ],
    render: function () 
    {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0,0,770,600); // (screenSettings.screenWidth,screenSettings.screenHeight)

        ctx.font = "54px Lucida Console";
        ctx.fillStyle = "green";
        ctx.textAlign="center";
        ctx.fillText("FROGGER CLONE GAME", 385, 48); // (screenSettings.screenWidth * 0.5,screenSettings.screenHeight * 0.08)

        ctx.font = "40px Lucida Console";
        ctx.textAlign="center";

        var i, h;
        for (i = 0, h = 0.4; i < this.button.length; i++, h = h + 0.1) {
            if ( i === this.selected) {
                ctx.fillStyle = "white";
                ctx.fillText(this.button[i].text, 385, 600 * h); // (screenSettings.screenWidth * 0.5, screenSettings.screenHeight * h)
            } else {
                ctx.fillStyle = "#808080";
                ctx.fillText(this.button[i].text, 385, 600 * h); // (screenSettings.screenWidth * 0.5, screenSettings.screenHeight * h)
            }
        }
    },
    handleInput: function (key)
    {
        switch(key) {
            case 'enter':
                this.button[this.selected].run();
                break;
            case 'down':
                if (this.selected < this.button.length - 1) {
                    this.selected++;
                }
                break;
            case 'up':
                if (this.selected > 0) {
                    this.selected--;
                }
                break;
            default:
                break;
        }
    }
}

var newGameScreen = {
    selected: 0,
    button: [
        {sprite: 'images/char-cat-girl.png', run: function() { player.startGame('images/char-cat-girl-70x60.png')}},
        {sprite: 'images/char-horn-girl.png', run: function() { player.startGame('images/char-horn-girl-70x60.png')}},
        {sprite: 'images/char-pink-girl.png', run: function() { player.startGame('images/char-pink-girl-70x60.png')}}
    ],
    render: function ()
    {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0,0,screenSettings.screenWidth,screenSettings.screenHeight);


        ctx.font = "54px Lucida Console";
        ctx.fillStyle = "green";
        ctx.textAlign="center";
        ctx.fillText("FROGGER CLONE GAME", 385, 48);
        
        var font = "40px Lucida Console";
        ctx.font = font;
        ctx.fillStyle = "white";
        ctx.textAlign="center";
        ctx.fillText("Select your character", 385, 240); // (screenSettings.screenWidth * 0.5, screenSettings.screenHeight * 0.4)

        var i, x;
        for (i = 0, x = -0.3; i < this.button.length; i++) {
            var w = 770 * x;
            if ( i === this.selected) {
                ctx.drawImage(Resources.get('images/Selector.png'), 385 + w, 282, 101, 171 ); // (screenSettings.screenWidth * 0.5 + w, screenSettings.screenHeight * 0.47)
            } 
                ctx.drawImage(Resources.get(this.button[i].sprite), 385 + w, 282, 101, 171 ); // (screenSettings.screenWidth * 0.5 + w, screenSettings.screenHeight * 0.47)
                x += 0.2;
        }
    },
    handleInput: function (key)
    {
        switch(key) {
            case 'enter':
                this.button[this.selected].run();
                break;
            case 'right':
                if (this.selected < this.button.length - 1) {
                    this.selected++;
                }
                break;
            case 'left':
                if (this.selected > 0) {
                    this.selected--;
                }
                break;
            case 'escape':
                controller.screen = 'menu';
                break;
            default:
                break;
        }
    }
}

var settingsScreen = {

}