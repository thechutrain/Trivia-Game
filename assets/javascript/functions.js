// function that creates the starting page!
function setHomePage(){
  // *) clear the page
  // clearInterval(Game.intervalTimer);
  $("#landing-container").removeClass("hide");
  $("#game-container").addClass("hide");

  // A) Create event listener for each quiz button
  // A-cont) to toggle selected button!
  $(".quiz-button").on("click", function(){
    // 0) remove the selector
    // DON"T allow for multiple selections
    $(".quiz-button").removeClass("selectedQuiz");
    // console.log($(".quiz-button")); // prints an array of the 3 buttons
    // 1) if class has the .selectedQuiz class, remove it
    // console.log($(this).hasClass("selectedQuiz")); // >> true or false
    var button = $(this);
    if (button.hasClass("selectedQuiz")){
      button.removeClass("selectedQuiz");
    } else{
      // 2) else, if it doesn't add it
      button.addClass("selectedQuiz");
    }
  });

  // B) create an event listener for just the play game button
  $(".play-game-button").on("click", function(){
      Game.initialize(1);
      // hide the quiz choices
      $("#landing-container").addClass("hide");
      $("#game-container").removeClass("hide").addClass("display");
  }); // closes play game event listener
}
