/* main.js
* This file controls the event handling of the app
*
*/
// ----- Event listenter for when page loads -----
$(document).ready(function(){
    // A) Create event listener for each quiz button
    // A-cont) to toggle selected button!
    $(".quiz-button").on("click", function(){
      var button = $(this);
      // 1) if class has the .selectedQuiz class, remove it
      // console.log($(this).hasClass("selectedQuiz")); // >> true or false
      if (button.hasClass("selectedQuiz")){
        button.removeClass("selectedQuiz");
      } else{
        // 2) else, if it doesn't add it
        button.addClass("selectedQuiz");
      }
    });

    // B) create an event listener for just the play game button
    $(".play-game-button").on("click", function(){
        Game.initialize();
    }); // closes play game event listener

}); // closes document.ready() EL
