/*  Enemy has the following attributes
    1) It has x, y co-ordinates
    2) It has a speed 
    3) This speed is within a speed range
    4) It can belong to any of the row counts.
    5) It has an image
*/

var maxWealth = 0;
var Enemy = function () {
    this.numRows = 4;
    this.numColumns = 5;
    this.sprite = 'images/enemy-bug.png';
    this.speedRange = {
        min: 50,
        max: 350
    };
    this.speed = this.randomSpeed();
    this.reset();
}

/* This is the default x start position */
Enemy.prototype.coordinateX = function () {
    return -101;
}

/* This is the default y start position */
Enemy.prototype.coordinateY = function () {
    return 64 + Math.floor(Math.random() * this.numRows) * 83;
}

/* Update the enemy's position, required method for game
 Parameter: dt, a time delta between ticks
*/
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    /*  If the x co-ordinate is in excess of canvas
        width, this should be reset.
    */
    if (this.x > (this.numColumns * 101)) {
        this.reset();
    }
}

/* This resets the position of the enemy */
Enemy.prototype.reset = function () {
    this.x = this.coordinateX();
    this.y = this.coordinateY();
    this.speed = this.randomSpeed();
}
// Set random speed for the different bugs
// CH - added random bug speed based on difference between min & max speeds
Enemy.prototype.randomSpeed = function () {
    return Math.floor(Math.random() * (this.speedRange.max - this.speedRange.min)) + this.speedRange.min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*   Now write your own player class
     This class requires an update(), render() and
     a handleInput() method.
     */

/*  Every Player should have the following attributes
    1) a location (x & y co-ordinates)
    2) a set of images for the player
    2) an image will be randomly selected for each game

*/
var Player = function () {
    this.images = ['images/char-boy.png',
                    "images/char-cat-girl.png",
                    'images/char-horn-girl.png',
                    "images/char-pink-girl.png",
                    "images/char-princess-girl.png"]
    this.sprite = this.images[Math.floor(Math.random() * 5)];
    this.reset();
};

/* The Player initial position
    is either the first row or the last row
    This reset function performs this assignment
    */

Player.prototype.reset = function () {
    var row = Math.floor(Math.random() * 2);
    this.y = (row == 0) ? -8 : 407;
    this.x = Math.floor(Math.random() * 5) * 101;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* This function performs the player movement with
    UP, DOWN, RIGHT & LEFT keys
    */
Player.prototype.handleInput = function (keyCode) {
    if (keyCode === 'left' && this.x >= 101) {
        this.x -= 101;
    }
    else if (keyCode === 'right' && this.x < (505 - 101)) {
        this.x += 101;
    }
    else if (keyCode === 'up' && this.y >= 30) {
        this.y -= 83;
    }
    else if (keyCode === 'down' && this.y < 406) {
        this.y += 83;
    }
};

/*This is the update function for the player */
Player.prototype.update = function () {
    /*  I have delegated the function checkCollisions
        to the Engine class. So this function essentially does nothing
        */
}

/*  This function verifies if there is a collision
    between an enemy and player 
    based on their co-cordinates
    */
function isColliding(enemy) {
    var colliding = false;
    if ((Math.abs(player.x - enemy.x) < 20) & (Math.abs(player.y - enemy.y) < 20)) {
        colliding = true;
    }
    return colliding;
}

/*  This procedure gets called by Engines updateEntities
    if there are collisions between the enemy and the player
    */

function checkCollisions() {
    for (var enemyIndex in allEnemies) {
        if (isColliding(allEnemies[enemyIndex])) {
            player.reset();
            wealth--;
            if (wealth <= 0) {
                window.sessionStorage.setItem("wealth", maxWealth);
                window.sessionStorage.setItem("duration", durationText);
                window.location = "./gameover.html"
            }
        }
    }
};

/*  Treasure is a collection of treasures
    to be collected by the player
    This has the following attributes
    1) a collection of images to simulate different 
    treasures to be collected by the player
    2) a specific random image is shown at a time
    3) The location where the treasure can appear is driven by
       the rows & columns in which these treasures can appear
    4) The (x,y) co-ordinate for the treasure
*/
var Treasure = function () {
    this.images = ['images/Key.png',
                    'images/Star.png',
                    'images/Heart.png',
                    'images/Gem%20Blue.png',
                    'images/Gem%20Orange.png',
                    'images/Gem%20Green.png'];
    this.image = this.images[Math.floor(Math.random() * 6)];
    this.numRows = 6;
    this.numColumns = 5;
    this.reset();
}

/*  This reset function of the treasure assigns x & y co-ordinates
    and the treasure image based on some random number generated
    */

Treasure.prototype.reset = function () {
    var row = Math.floor(Math.random() * this.numRows);
    this.x = Math.floor(Math.random() * row) * 101;
    this.y = -8 + Math.floor(Math.random() * this.numRows) * 83;
    this.image = this.images[Math.floor(Math.random() * 6)];
}

/*  This render function of the Treasure draws the treasure */
Treasure.prototype.render = function () {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
}

/*  This is a function which allows the player to gather the treaure 
    displayed on the screen */
function gatherWealth() {
    if ((Math.abs(treasure.x - player.x) < 20) & (Math.abs(treasure.y - player.y) < 20)) {
        wealth++;
        maxWealth = Math.max(wealth, maxWealth);
        treasure.reset();
    }
}

/*  This function verifies if the player is close enough to pick up
    the treasure shown in the screen
    */
Treasure.prototype.update = function () {
    gatherWealth();
}

/*   Now instantiate your objects.
     Place all enemy objects in an array called allEnemies
     Place the player object in a variable called player
     */
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var bug6 = new Enemy();
var bug7 = new Enemy();
var bug8 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6, bug7, bug8];

var player = new Player();

/* This variable keeps track of the treasures collected by the player */
var wealth = 0;
var treasure = new Treasure();

/* This listens for key presses and sends the keys to your
 Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
