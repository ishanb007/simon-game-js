var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];

function nextSequence(){
    level++;
    butpress=0;
    userClickedPattern=[];
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
var countKey=0;
var level=0;
var butpress=0;

$(document).keydown(function(){
    countKey++;
    if (countKey==1) {
        nextSequence();
    }
})

$(".btn").click(function(){
    // var userChosenColour = this.getAttribute("id");
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    butpress++;
    checkAnswer(butpress);
});

function playSound(name){
    switch (name) {
        case "red":
            var audio = new Audio("./sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("./sounds/yellow.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("./sounds/green.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("./sounds/blue.mp3");
            audio.play();
            break;
    
        default: console.log(randomChosenColour);
            break;
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentlevel){
    if (userClickedPattern[currentlevel-1]==gamePattern[currentlevel-1]) {
        console.log("success");
        if (currentlevel==level) {
            setTimeout(nextSequence,1000);
        }
    } else{
        gameOver();
    }
}

function gameOver(){
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver(){
    countKey=0;
    level=0;
    butpress=0;
    gamePattern=[];
}
