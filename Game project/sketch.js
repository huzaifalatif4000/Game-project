/*

The Game Project
(Ninja character with the sword on back, evening sky, moving clouds, new trees, new mountains, collectable item rotating stars)

*/

let gameChar_x;
let gameChar_y;
let floorPos_y;

let isLeft = false;
let isRight = false;
let isFalling = false;
let isPlummeting = false;

let trees_x = [];
let clouds = [];
let mountains = [];
let cameraPosX = 0;
let canyons = [];
let collectables = [];
let score = 0;
let stars = [];
let bgSound;
let fallSound;
let hasFallen = false;
let collectableSound;
let jumpSound;
let hasJumped = false;
let platforms = [];
let flagpole;
let worldEnd = 4800;
let flagHeight = 0;
let fireworks = [];
let fireworksSound;
let winSound;
let lives = 3;
let gameOverSound;
let gameOverPlayed = false;
let heartBeat = 0;
let enemies = [];
let enemyHitSound;
let startTime;
let timeLimit = 60;
let timeLeft;
let timerSound;

function preload(){
    soundFormats('mp3', 'wav');
    bgSound = loadSound('assets/bg sound.mp3');
    fallSound = loadSound('assets/falling sound.mp3');
    collectableSound = loadSound('assets/collecting sound.mp3');
    jumpSound = loadSound('assets/jump sound.mp3');
    fireworksSound = loadSound('assets/fireworks sound.mp3');
    winSound = loadSound('assets/win sound.mp3');
    gameOverSound = loadSound('assets/gameover sound.mp3');
    enemyHitSound = loadSound('assets/enemy collision sound.mp3');
    timerSound = loadSound('assets/timer sound.mp3');
}

function setup()
{
    createCanvas(1024, 576);

    
    floorPos_y = height * 3/4;

    //code for timer
    startTime = millis();

    gameChar_x = width/2;
    gameChar_y = floorPos_y;


    //code for tree positions
    trees_x = [300, 590, 1400, 2000, 2600, 3150, 3350, 3950, 4400];

    // code for moving clouds
    clouds = [
        {x_pos: 190,  y_pos: 90,  size: 1.1},
        {x_pos: 750,  y_pos: 80,  size: 0.9},
        {x_pos: 1500, y_pos: 120, size: 1.0},
        {x_pos: 2200, y_pos: 90,  size: 1.2},
        {x_pos: 2950, y_pos: 100, size: 0.9},
        {x_pos: 4000, y_pos: 110, size: 1.1}
    ];

    // code for mountains
    mountains = [
        {x_pos: 390,  y_pos: floorPos_y, width: 310, height: 280},
        {x_pos: 1000,  y_pos: floorPos_y, width: 200, height: 200},
        {x_pos: 1900, y_pos: floorPos_y, width: 350, height: 320},
        {x_pos: 2900, y_pos: floorPos_y, width: 250, height: 210},
        {x_pos: 3600, y_pos: floorPos_y, width: 300, height: 260},
        {x_pos: 4200, y_pos: floorPos_y, width: 221, height: 265},
        {x_pos: 4250, y_pos: floorPos_y, width: 200, height: 240}
    ];

    // code for canyons
    canyons = [
        {x_pos: 150,  width: 180},
        {x_pos: 950,  width: 195},
        {x_pos: 1790, width: 200},
        {x_pos: 2550, width: 195},
        {x_pos: 3350, width: 195},
        {x_pos: 4100, width: 200}
    ];

    //code for collectable i.e rotating star
    
    collectables = [
        {x_pos: 570,  y_pos: floorPos_y - 40, size: 50, isFound: false},
        {x_pos: 1000, y_pos: floorPos_y - 70, size: 50, isFound: false},
        {x_pos: 1500, y_pos: floorPos_y - 40, size: 50, isFound: false},
        {x_pos: 2250, y_pos: floorPos_y - 40, size: 50, isFound: false},
        {x_pos: 1850, y_pos: floorPos_y - 68, size: 50, isFound: false},
        {x_pos: 2600, y_pos: floorPos_y - 72, size: 50, isFound: false},
        {x_pos: 2950, y_pos: floorPos_y - 70, size: 50, isFound: false},
        {x_pos: 3450, y_pos: floorPos_y - 70, size: 50, isFound: false},
        {x_pos: 3950, y_pos: floorPos_y - 40, size: 50, isFound: false},
        {x_pos: 4150, y_pos: floorPos_y - 70, size: 50, isFound: false},
        {x_pos: 4500, y_pos: floorPos_y - 40, size: 50, isFound: false}
    ];

      platforms = [
        {x_pos: 130, y_pos: 400, width: 150, height: 20},
        {x_pos: 930, y_pos: 390, width: 150, height: 20,
            isMoving: true, range: 70, startX:930, angle: 0, speed: 0.02},
        {x_pos: 1750, y_pos: 380, width: 180, height: 20,
            isMoving: true, range: 70, startX: 1750, angle: 0, speed: 0.03},
        {x_pos: 2530, y_pos: 380, width: 150, height: 20,
            isMoving: true, range: 70, startX: 2530, angle: 0, speed: 0.02},
        {x_pos: 3340, y_pos: 375, width: 150, height: 20,
            isMoving: true, range: 70, startX: 3340, angle: 0, speed: 0.02},
        {x_pos: 4080, y_pos: 380, width: 150, height: 20,
            isMoving: true, range: 70, startX:4080, angle: 0, speed: 0.02}
    ];

    // code for enemies 
    enemies = [];
    enemies.push(new Enemy(550, floorPos_y -10, 100));
    enemies.push(new Enemy(1380, floorPos_y -10, 150));
    enemies.push(new Enemy(2180, floorPos_y -10, 120));
    enemies.push(new Enemy(2950, floorPos_y -10, 100));
    enemies.push(new Enemy(3680, floorPos_y -10, 150));

    resetGame();


     //code for flagpole
   flagpole = {
    x_pos: 4600,
    width: 20,
    height: 100,
    isReached: false
};

    worldEnd = flagpole.x_pos + 200;

    //code for stars at the background
    for(var i = 0; i < 100; i++){
        stars.push({
            x_pos: random(0, worldEnd),
            y_pos: random(0, floorPos_y - 50),
            size: random(2,4)
        });
    }
}

//function code to draw the rotating star
function drawStar(size){
    beginShape();
    fill(255, 215, 0);
    stroke(255, 180, 0);
    strokeWeight(2);

    for(let i = 0; i < 10; i++){
        let angle = i * PI / 4;
        let radius = (i % 2 === 0) ? size: size * 0.45;
        vertex(cos(angle) * radius, sin(angle) * radius);
    }
    endShape(CLOSE);
}

function draw()
{
    //code for evning sky
    background(51, 31, 99);


    drawMoon();
    drawStars();
    drawGround();

    cameraPosX = gameChar_x - width / 2;

    push();
    translate(-cameraPosX, 0);

    drawClouds();
    drawMountains();
    drawTrees();
    drawCollectables();
    drawCanyons();
    drawPlatforms();
    drawNinja();
    drawFlagpole();
    drawEnemies();
    checkEnemyContact();

    pop();

    if(flagpole.isReached){
    drawFireworks();
    }

    if(!flagpole.isReached){
    timeLeft = max(0, timeLimit - floor((millis() - startTime) / 1000));
}

if(!flagpole.isReached && timeLeft <= 10 && timeLeft > 0){
    if(!timerSound.isPlaying()){
        timerSound.play();
    }
}

if(timeLeft <= 0){
    if(timerSound.isPlaying()){
        timerSound.stop();
    }
    lives = 0;
}
    checkCanyon();
    applyGravity();
    handleMovement();
    checkFlagpole();
    drawScore();
    drawTimer();
    drawHearts();

    if(lives <= 0){
    push();
    resetMatrix();
    fill(255,0,0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2);
    pop();
    if(bgSound.isPlaying()) bgSound.stop();
    if(!gameOverPlayed){
        gameOverSound.play();
        gameOverPlayed = true;
    }
    noLoop();
}
}

    function drawMoon(){

    //code for crescent moon
    push();
    translate(900, 100);
    rotate(-PI / 8);
    noStroke();
    fill(255, 255, 200);
    ellipse(0, 0, 79, 79);
    fill(51, 31, 99);
    ellipse(15, 0, 79, 79);
    pop();
    }

    function drawStars(){

        //code for stars in the sky
        push();
        translate(-cameraPosX * 0.3, 0);
        fill(255);
    noStroke();
    for (let s of stars){
        ellipse(s.x_pos, s.y_pos, s.size, s.size);
    }
    pop();
}

    function drawGround(){

    //code for ground
    noStroke();
    fill(19, 119, 59);
    rect(0, floorPos_y, width, height - floorPos_y);
    }
    function drawClouds(){

    //code for moving clouds
    for (var i = 0; i < clouds.length; i++) {
        var cloud = clouds[i];

        fill(255);
        ellipse(cloud.x_pos, cloud.y_pos, 60 * cloud.size);
        ellipse(cloud.x_pos + 40 * cloud.size, cloud.y_pos - 15 * cloud.size, 80 * cloud.size);
        ellipse(cloud.x_pos + 80 * cloud.size, cloud.y_pos, 60 * cloud.size);

        //code for movement of clouds
        cloud.x_pos += 0.3;   
        if (cloud.x_pos > worldEnd + 200){
            cloud.x_pos = -200;
        } 
    }
}

function drawFireworks() {

    // code for fireworks 
    if (flagpole.isReached && random() < 0.03)
        fireworks.push({
            x: random(100, width - 100),
            y: height,
            speedY: random(-15, -12),
            exploded: false,
            particles: []
    
        });

    for (let i = fireworks.length - 1; i >= 0; i--) {

        let f = fireworks[i];

        if (!f.exploded) {

            noStroke();
            fill(255);
            ellipse(f.x, f.y, 5);

            f.y += f.speedY;
            f.speedY += 0.3;

            if (f.speedY >= 0) {
                f.exploded = true;
                if(!fireworksSound.isPlaying()){
                    fireworksSound.setLoop(true);
                    fireworksSound.play();
                }

                for (let j = 0; j < 40; j++)
                    f.particles.push({
                        x: f.x,
                        y: f.y,
                        speedX: random(-5, 5),
                        speedY: random(-5, 5),
                        life: 80,
                        color: color(random(255), random(255), random(255))
                    });
            }
        } 
        
        else {

            for (let j = f.particles.length - 1; j >= 0; j--) {

                let p = f.particles[j];

                fill(p.color);
                ellipse(p.x, p.y, 4);

                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += 0.1;
                p.life--;

                if (p.life <= 0)
                    f.particles.splice(j, 1);
            }

            if (!f.particles.length)
                fireworks.splice(i, 1);
        }
    }
}

    function drawMountains(){

        //code for mounatins
    for (var i = 0; i < mountains.length; i++) {
        var mountain = mountains[i];

        //code for left face
        fill(111, 71, 41);
        triangle(
            mountain.x_pos, mountain.y_pos,
            mountain.x_pos + mountain.width/2, mountain.y_pos - mountain.height,
            mountain.x_pos + mountain.width, mountain.y_pos
        );

        //code for right face
        fill(150, 110, 60);
        triangle(
            mountain.x_pos + mountain.width, mountain.y_pos,
            mountain.x_pos + mountain.width/2, mountain.y_pos - mountain.height,
            mountain.x_pos + mountain.width - 40, mountain.y_pos
        );
    }
}

    function drawTrees(){
    //code for trees and fruits
    for (var i = 0; i < trees_x.length; i++) {
        var tx = trees_x[i];
        var ty = floorPos_y;

        fill(90, 60, 30);
        rect(tx, ty - 120, 45, 120);
        
        fill(20,140,40);
        ellipse(tx + 20, ty - 150, 120, 120);
        ellipse(tx - 10, ty - 125, 120, 120);
        ellipse(tx + 50, ty - 125, 120, 120);

        //code for fruits
        fill("red");
        ellipse(tx - 10, ty - 140, 12);
        ellipse(tx + 50, ty - 150, 12);
        ellipse(tx + 10, ty - 170, 12);
        ellipse(tx + 30, ty - 130, 12);
    }
}
     
    //code for canyons
    function drawCanyons(){
    for (let i = 0; i < canyons.length; i++) {
        let c = canyons[i];

        for(let y = floorPos_y; y < height; y += 5){
            let shade = map(y, floorPos_y, height, 70, 20);
            fill(shade);
            rect(c.x_pos, y, c.width, 5);
        }
            
            //code for lava
            let lavaHeight = 40;

        fill(255, 60, 0); 
        rect(c.x_pos, height - lavaHeight, c.width, lavaHeight);

        fill(255, 140, 0);
        for(let x = c.x_pos; x < c.x_pos + c.width; x += 20){
            let wave = sin(frameCount * 0.1 + x * 0.05) * 6;
            ellipse(x, height - lavaHeight + wave, 20, 12);
        }
        
        if(random() < 0.05){
    fill(255, 220, 0);
    ellipse(
        random(c.x_pos, c.x_pos + c.width),
        height - lavaHeight + random(-10,10),
        random(5,12)
    );
}

        fill(255, 200, 0);
        rect(c.x_pos, height - lavaHeight - 3, c.width, 3);
    }
}
    
    //code for moving platforms
    function drawPlatforms(){
    for(let i = 0; i < platforms.length; i++){
        let platform = platforms[i];

        if(platform.isMoving){

            let previousX = platform.x_pos;

            platform.angle += platform.speed;

            platform.x_pos = platform.startX + 
                             sin(platform.angle) * platform.range;

            platform.deltaX = platform.x_pos - previousX;
        }
        else{
            platform.deltaX = 0;
        }

        fill(140, 80, 25);
        rect(platform.x_pos, platform.y_pos,
             platform.width, platform.height);
    }
}

     function drawCollectables(){
    //code for rotating star collectable
    for (var i = 0; i < collectables.length; i++) {
        var collectable = collectables[i];

        if (!collectable.isFound) {

            if (collectable.angle === undefined) collectable.angle = 0;
            collectable.angle += 0.05;

            push();
            translate(collectable.x_pos, collectable.y_pos);
            rotate(collectable.angle);

           drawStar(collectable.size * 0.4);

            pop();

            var d = dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos);
            if (d < 60){
                 collectable.isFound = true;
                 score +=1;
                 collectableSound.play();
            }
        }
    }
}
     
    function drawScore(){
    //code for score display
    push();
    resetMatrix();
    fill(250);
    textSize(30);
    text("Score: " + score, 20, 40);
    pop();
    }

    //code to display timer
    function drawTimer(){

    push();
    resetMatrix();

    //code for timer text
    if(timeLeft <= 10){
        fill(255,0,0);
        textSize(32);
    }
    else{
        fill(255);
        textSize(30);
    }

    text("Time: " + timeLeft, 20, 150);

    // code for timer bar
    let barWidth = 200;
    let barHeight = 20;

    let remaining = map(timeLeft, 0, timeLimit, 0, barWidth);

    //background
    fill(80);
    rect(20, 170, barWidth, barHeight);

    //remaining time
    if(timeLeft <= 10){
        fill(255,0,0);
    }else{
        fill(0,200,0);
    }

    rect(20, 170, remaining, barHeight);

    pop();

}

    //code to draw hearts for lives
    function drawHearts(){

    push();
    resetMatrix();

    heartBeat += 0.1;
    let scaleBeat = 1 + sin(heartBeat) * 0.1;

    for(let i = 0; i < lives; i++){

        push();
        translate(40 + i * 40, 80);
        scale(scaleBeat);

        fill(220, 0, 0);
        noStroke();

        beginShape();
        vertex(0, 0);
        bezierVertex(-10, -10, -20, 5, 0, 20);
        bezierVertex(20, 5, 10, -10, 0, 0);
        endShape(CLOSE);

        pop();
    }

    pop();
}
    
    //code for gravity
   function applyGravity() {
    if (isPlummeting) return;

    let charHeight = 15;
    let onPlatform = false;

    for (let p of platforms) {
        let withinX = gameChar_x > p.x_pos && gameChar_x < p.x_pos + p.width;

        if (withinX && gameChar_y + charHeight >= p.y_pos - 5 && gameChar_y + charHeight <= p.y_pos + 10) {
            onPlatform = true;
            gameChar_y = p.y_pos - charHeight; // code for land on platform
            isFalling = false;
            hasJumped = false;
            if(p.isMoving){
                gameChar_x += p.deltaX;
            }
        }
    }
    // apply gravity if not on floor or platform
    if (!onPlatform && gameChar_y < floorPos_y) {
        gameChar_y += 4;
        isFalling = true;
    } else if (gameChar_y >= floorPos_y) {
        gameChar_y = floorPos_y;
        isFalling = false;
        hasJumped = false;
    }
}

function resetGame(){
    //code for reset game
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    hasFallen = false;

    if(!bgSound.isPlaying()){
        bgSound.setLoop(true);
        bgSound.play();
    }
}
    

    function handleMovement(){
    //code for allow the movement if not plummeting
    if (!isPlummeting && !flagpole.isReached) {
    if (isLeft)  gameChar_x -= 8;
    if (isRight) gameChar_x += 8;
}   else {
    //code for stop movement when falling into the canyon
    isLeft = false;
    isRight = false;
}
    }

    function checkCanyon(){
    //code for canyon check
    isPlummeting = false;
    for (let i = 0; i < canyons.length; i++) {
        let c = canyons[i];
        if (gameChar_x > c.x_pos &&
            gameChar_x < c.x_pos + c.width &&
            gameChar_y >= floorPos_y) {
            isPlummeting = true;
        }
    }

    if (isPlummeting){
        gameChar_y += 12;
        if(gameChar_y > height + 100){
            if(lives > 0){
                lives -= 1;
                resetGame();
            }
        }
        if(!hasFallen){
            if(bgSound.isPlaying()){
                bgSound.stop();
            }
            fallSound.play();
            hasFallen = true;
        }

    } 
}

function drawEnemies(){
    // code for enemies
    for(let i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }
}

//code to check enemy contact
function checkEnemyContact(){
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].checkContact(gameChar_x, gameChar_y)){
            
            if(lives > 0){
                if(bgSound.isPlaying()){
                    bgSound.stop();
                }
                lives --;
                enemyHitSound.play();
                resetGame();
            }

            break; // prevent losing multiple lives at once
        }
    }
}

// code for draw flagpole with moving flag
function drawFlagpole() {
    push();
    translate(flagpole.x_pos, floorPos_y);

    fill(100, 50, 20);
    rectMode(CENTER);
    rect(0, 10, 40, 20, 5); // small base with rounded corners

    for (let i = 0; i < 150; i += 10) {
        let shade = map(i, 0, 150, 150, 255);
        stroke(shade);
        strokeWeight(4);
        line(0, -i, 0, -i - 10);
    }

    noStroke();

    rectMode(CORNER);

    let flagWidth = 40;
    let flagHeight = 25;
    let yOffset = -150;

    if (flagpole.isReached) {
        // code for draw flag
        fill(0, 200, 0);
        for (let i = 0; i < flagWidth; i += 5) {
            let wave = sin((frameCount + i) * 0.2) * 5; // simple waving effect
            rect(i - 20, yOffset + wave, 5, flagHeight);
        }

        // code for fireworks
        fill(255, 215, 0);
        ellipse(0, yOffset - 10, 15, 15);

        // code for level complete text
        resetMatrix();
        fill(255, 215, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("LEVEL COMPLETE!", width / 2, height / 2);

    } else {
        fill(200, 0, 0);
        for (let i = 0; i < flagWidth; i += 5) {
            let wave = sin((frameCount + i) * 0.2) * 5;
            rect(i - 20, yOffset + flagHeight - wave, 5, flagHeight);
        }
    }

    pop();
}

//code for check flagpole
function checkFlagpole() {

    if (!flagpole.isReached && gameChar_x >= flagpole.x_pos - 10) {

        flagpole.isReached = true;

        isLeft = false;
        isRight = false;

        if(bgSound.isPlaying()){
            bgSound.stop();
        }
        if(timerSound.isPlaying()){
            timerSound.stop();
        }

        if(!winSound.isPlaying()){
            winSound.play();
        }
    }
}


//code for ninja character with different poses and sword on back
function drawNinja() {
    push();
    translate(gameChar_x, gameChar_y);

    let bodyHeight = 40;
    let bodyWidth = 20;
    let headSize = 25;

    //code for determining jumoing and falling
    let yOffset = 0;
    if (isFalling || isPlummeting) yOffset = -10;

    //code for sword on back
    //code for blade
    fill(80);
    rect(-3, -bodyHeight - 25 - yOffset, 5, 35); 
    //code for hanlde
    fill(150);
    rect(-5, -bodyHeight - 30 - yOffset, 9, 5);

    // drae based on movement state
    if (isLeft && isFalling) {
        fill(0);
        rect(-bodyWidth/2 - 2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(-2, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(-7, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(-2, -bodyHeight - headSize/2 - yOffset, 5, 5);
    } else if (isRight && isFalling) {
        fill(0);
        rect(-bodyWidth/2 - 2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(2, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(2, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(7, -bodyHeight - headSize/2 - yOffset, 5, 5);
    } else if (isLeft) {
        fill(0);
        rect(-bodyWidth/2 - 2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(-2, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(-6, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(-1, -bodyHeight - headSize/2 - yOffset, 5, 5);
        fill(0);
        rect(-bodyWidth/2 - 5, -bodyHeight + 5 - yOffset, 5, 20);
        rect(bodyWidth/2, -bodyHeight + 5 - yOffset, 5, 20);
    } else if (isRight) {
        fill(0);
        rect(-bodyWidth/2 - 2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(2, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(2, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(6, -bodyHeight - headSize/2 - yOffset, 5, 5);
        fill(0);
        rect(-bodyWidth/2 - 5, -bodyHeight + 5 - yOffset, 5, 20);
        rect(bodyWidth/2, -bodyHeight + 5 - yOffset, 5, 20);
    } else if (isFalling || isPlummeting) {
        fill(0);
        rect(-bodyWidth/2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(0, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(-5, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(5, -bodyHeight - headSize/2 - yOffset, 5, 5);
    } else {
        fill(0);
        rect(-bodyWidth/2, -bodyHeight - yOffset, bodyWidth, bodyHeight);
        fill(30);
        ellipse(0, -bodyHeight - headSize/2 - yOffset, headSize, headSize);
        fill(255);
        ellipse(-5, -bodyHeight - headSize/2 - yOffset, 5, 5);
        ellipse(5, -bodyHeight - headSize/2 - yOffset, 5, 5);
    }

    //code for read headband
    fill(200,0,0);
    rect(-bodyWidth/2, -bodyHeight - headSize - yOffset + 5, bodyWidth, 5);

    //code for legs
    fill(0);
    rect(-6, -yOffset, 5, 15);
    rect(1, -yOffset, 5, 15);

    pop();
}

// code for enemy class
function Enemy(x, y, range){
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1; // movement speed

    this.update = function(){
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range){
            this.inc = -1;
        }
        else if(this.currentX < this.x){
            this.inc = 1;
        }
    };

    this.draw = function(){
        this.update();

        push();
        translate(this.currentX, this.y);

        // body
        fill(20);
        rect(-8, -30, 16, 30);

        // head
        fill(40);
        ellipse(0, -38, 20);

        // eyes
        fill(255,0,0);
        ellipse(-5, -40, 5);
        ellipse(5, -40, 5);

        pop();
    };

    this.checkContact = function(gc_x, gc_y){
        let d = dist(gc_x, gc_y, this.currentX, this.y);
        if(d < 35){
            return true;
        }
        return false;
    };
}

function keyPressed()
{
    userStartAudio();
    if(!bgSound.isPlaying()){
        bgSound.setLoop(true);
        bgSound.play();
    }
    if (!isPlummeting){
    if(key == 'a') isLeft = true;
    if(key == 'd') isRight = true;

    if (key == 'w' && !isFalling){
        gameChar_y -=100;
        isFalling = true;
        hasJumped = true;
        jumpSound.play();
    }
    }
}
function keyReleased()
{
    if (key == 'a') isLeft = false;
    if (key == 'd') isRight = false;
}