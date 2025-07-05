//Canvas element setup
const canv = document.getElementById("gameCanvas");
const c = canv.getContext("2d");
//Define size and font style of the canvas
canv.width = 1080;
canv.height = 720;
c.font = "30px Arial";
//booleans used for smooth player movement
isHoldingLeft = false;
isHoldingRight = false;
//'running' variable is used to stop the game loop when done.
running = true;
/*'kc' is an abreviation of 'kill count'
  when a block is hit, the counter increments by 1.
  the game stops when the kill count reackes 64. 
*/ 
let kc = 0;
//Player object
const player = {
    //position
    x: 480,
    y: canv.height-40,
    //size
    width: 120,
    height: 20,
    color: 'white',
    lives: 3
}
//Ball object
const ball = {
    //position
    x: 520,
    y: canv.height-60,
    //velocity
    xv: 2,
    yv: -2,
    //size and appearence
    scale: 20,
    color: 'white'
}
//'Blocks' class to create multiple objects to hit
class Block {
    constructor(x, y, width, height, color, killed){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.color = color,
        this.killed = killed
    }
    update() {
        let color;
        if(this.color == 0){
            color = '#FF0000';
        } if (this.color == 1) {
            color = '#FF7000';
        } if (this.color == 2){
            color = '#FFDC00';
        } if (this.color == 3) {
            color = '#C5FF00';
        } if (this.color == 4){
            color = '#7CFF00';
        } if (this.color == 5) {
            color = '#00FF1F';
        } if (this.color == 6){
            color = '#00FFB9';
        } if (this.color == 7) {
            color = '#00D4FF';
        }
        c.fillStyle = color;
        c.fillRect(this.x, this.y, this.width, this.height);

        if(ball.x + ball.scale > this.x && ball.x < this.x + this.width){
            if(ball.y == this.y + this.height){
                ball.yv *= -1;
                this.x = canv.width;
                this.y = canv.height;
                this.killed = true;
                kc++;
                }
            if(ball.y + ball.scale == this.y){
                ball.yv *= -1;
                this.x = canv.width;
                this.y = canv.height;
                this.killed = true;
                kc++;
                }
            }
        if(ball.y + ball.scale > this.y && ball.y < this.y + this.height){
            if(ball.x == this.x + this.width){
                ball.xv *= -1;
                this.x = canv.width;
                this.y = canv.height;
                this.killed = true;
                kc++;
                }
            if(ball.x + ball.scale == this.x){
                ball.xv *= -1;
                this.x = canv.width;
                this.y = canv.height;
                this.killed = true;
                kc++;
                }
            }
        }
    }


blocks = []

for (let j = 0; j < 8; j++){
    blocks.push([]);
    for (let i = 0; i < 8; i++){
        blocks[j].push(new Block((26)+(130*i), 60+(30*j), 120, 20, j, false));
    }
}


function drawBlocks() {
    for (let j = 0; j < 8; j++){
        for (let i = 0; i < 8; i++){
        blocks[j][i].update();
        }
    }
}

function update() {
   if(running){
        c.clearRect(0, 0, canv.width, canv.height);
        c.fillStyle = player.color;
        c.fillRect(player.x, player.y, player.width, player.height);
        c.fillText('Lives: ' + player.lives, 10, 32);

        c.fillStyle = ball.color;
        c.fillRect(ball.x, ball.y, ball.scale, ball.scale);

        drawBlocks();

        if(ball.x >= canv.width-ball.scale || ball.x <= 0){
            ball.xv *= -1;
        }   
        if(ball.y <= 0){
            ball.yv *= -1;
        }
        if(ball.x + ball.scale > player.x && ball.x < player.x + player.width){
            if(ball.y + ball.scale >= player.y && ball.y < player.y + player.height){
                ball.yv *= -1;
                ball.y = canv.height-60
                if(isHoldingRight && ball.xv < 0){
                    ball.xv *= -1;
                }
                if(isHoldingLeft && ball.xv > 0){
                    ball.xv *= -1;
                }
            }
        }
        if(ball.y + ball.scale > canv.height){
            ball.x = 520;
            ball.y = canv.height-60;
            ball.xv = 2;
            ball.yv = -2;
            player.x = 520;
            player.lives--;
        }

        if(player.lives <= 0){
            running = false;
        }

        if(kc == 64){
            running = false;
        }

        if(isHoldingLeft == true){
            if(player.x >= 0){
            player.x -= 4;            
            }
        }
        if(isHoldingRight == true){
            if(player.x <= canv.width-player.width){
            player.x += 4;            
            }
        }

        ball.x += ball.xv;
        ball.y += ball.yv;
    } else{
        c.font = "50px Arial";
        c.fillStyle = 'white';
        c.fillText('Game Over!', 420, 580)
    }
}
//Player input detection
window.addEventListener("keydown", function (event) {
    //left arrow
    if (event.keyCode == 37) {
        isHoldingLeft = true;
    }
    //right arrow
    else if (event.keyCode == 39) {
        isHoldingRight = true;
    }
});

window.addEventListener("keyup", function (event) {
    //left arrow
    if (event.keyCode == 37) {
        isHoldingLeft = false;
    }
    //right arrow
    else if (event.keyCode == 39) {
        isHoldingRight = false;
    }
});

setInterval(update, 10);