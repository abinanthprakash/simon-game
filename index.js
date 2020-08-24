var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function() {           //detect the keyboard press
  if (!started) {                           //check the staring of game

    $("#level-title").text("Level " + level);           //change the h1 text
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    });

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

    } else {

    console.log("wrong");           //when wrong key is pressed change title to game over

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

$("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();

    }

    }



function nextSequence() {

  userClickedPattern = [];

    level++;
      $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];  //random number generation
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    //animation

playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");   //to select css property

//3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
