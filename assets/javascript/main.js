// -----  Questions & Answers Data -----
// TO DO: eventually put the data in a separate file and import it
data = [
  {
    "question": "What is your favorite color?",
    "answerChoices": ["blue", "no red", "no green", "yelllllow!"],
    "correctAnswer": 0,
    // 'URL': "www.google.com",
  },
  {
    "question": "What is the capital of Hungry?",
    "answerChoices": [
      "Turkey",
      "Budapest",
      "Bucharest",
      "ohh boyy am I hungry!"],
    "correctAnswer": 1,
    // 'URL': "www.google.com",
  },
  // {
  //   "question": "foo",
  //
  // }

];

// Game stats object to keep track of number correct & wrong
var GameStats = {
  "correctAnswers": 0,
  "incorrectAnswers": 0,
}

// ----- Main functionality -----
var Game = {
  intervalTimer: null, // will hold a reference to the Interval timer
  countdownTimer: null, //will hold a reference to the countdown 1min
  currentIndex: 0,
  secondsLeft: 10,
  SECONDS_PER_QUESTION: 10,
  questions_data: data,
  user_guess: -1,

  /* initializes the game, gets called in the read() event listener
  */
  initialize: function(){
    this.currentIndex = 0;
    this.secondsLeft = this.SECONDS_PER_QUESTION;
    $('#seconds').html(this.secondsLeft); // prevents the lag in seconds
    console.log("starting game");
    this.nextQuestion(this.currentIndex);
    // console.log("Game is done"); // gets called right after prev line, bc ...
  },

  /* this method will present the question & answer for display
  * to the user.
  * @param index - the index of the question to present
  */
  nextQuestion: function(index){
    console.log("next quesiton called!");
    // 1) check to see if the index is not in the question data array
    if (index >= this.questions_data.length){
      this.gameOver();
      return;
    }
  // 2) display the question and answers (event listeners)
    this.user_guess = -1;
    this.secondsLeft = this.SECONDS_PER_QUESTION;
    $('#seconds').html(this.secondsLeft);
    var question_obj = this.questions_data[index]; // gets current question obj
    // console.log(question);
    // A) Get the question
      var question = $("<h3>").html(question_obj.question);
      $("#update-target").append(question);
    // B) Loop through the answerChoices array
    question_obj.answerChoices.forEach(function(choice, index){
        // console.log(choice);
        // console.log("inside the for each" + index);
        // create a button nested in a div, that displays answer choice with index
        var button_choice = $("<button>")
                              .addClass("btn btn-primary btn-answerChoice")
                              .attr("index", index)
                              .html(choice);
        var button_wrapper = $("<div>", {'class': 'button-wrapper'})
                              .append( button_choice );
        $("#update-target").append(button_wrapper);
    });

    // 3) write event listener for each button:
    var self = this;
    $(".btn-answerChoice").on('click', function(){
      console.log($(this).attr("index"));
      // get the user's guess
      self.user_guess = $(this).attr("index"); // if you use this, it'll be the button, better way??
      // clear the intervalTimer
      clearInterval(self.intervalTimer);
      // reset seconds left
      self.secondsLeft = self.SECONDS_PER_QUESTION;
      // empty the div
      $("#update-target").empty();
      // show the answer;
      self.showAnswer();
    })

  // 4) count down every second
    this.intervalTimer = setInterval(function(){
      // console.log(this); // since anonymous func inside setInterval is bound, this is game object
      // subtract one second
      this.secondsLeft --;
      // console.log(this.secondsLeft);
      $('#seconds').html(this.secondsLeft);
      // check to make sure that the time is not zero!
      if (this.secondsLeft <= 0){
        // clear Interval & reset the count down
        clearInterval(this.intervalTimer);
        this.secondsLeft = this.SECONDS_PER_QUESTION;
        // empty the html div
        $("#update-target").empty();
        // show the answer;
        this.showAnswer();
      }
    }.bind(this), 1000); // binds the anonymous func to the game object.

  },

  showAnswer: function(){
    // show answer
    // console.log("Showing the answer");
    $('#seconds').html("--");
    var current_question = this.questions_data[this.currentIndex];
    // check if the user was correct:
    if (current_question.correctAnswer == this.user_guess){
      console.log("You are correct");
    } else {
      console.log("You're wrong");
    }

    // change the display of the timer

    // check if the user's choice was correct or not
    // create a set time out interval that will display time ...
    this.intervalTimer = setTimeout(function(){
      // empty the html div
      console.log("TADA!");
      $("#update-target").empty();
      // set the index to the next potential question in array, and display it
      this.currentIndex ++;
      this.nextQuestion(this.currentIndex);
    }.bind(this), 3000)
  },

  gameOver: function(){
    console.log("Game is done, play again?");
  },
}

/*
* @param current_index - the index of the next question
* @param data - all the question to be asked
*/
// function nextQuestion(index){
//   // Check to make sure the current_index is in the data array
//   var thisIndex = index;
//   if (thisIndex >= data.length){
//     console.log("Error: array out of bound: " + thisIndex);
//     return false;
//   }
//   // create the Time out function
//   countdownTimer = setTimeout(function(){
//     console.log("current index: " + thisIndex);
//     currentIndex ++;
//     // display the answer
//     showAnswer();
//     // // call the next potential question
//     // nextQuestion(currentIndex, data);
//   }, 2000);
// }; // closes nextQuestion function


/*
* @param currentIndex - the index of the next question
* @param data - all the question to be asked
*/
// function showAnswer(){
//   console.log("The answer!");
//   countdownTimer = setTimeout(function(){
//     nextQuestion(currentIndex, data);
//   }, 3000);
// }
//


  // A) initialize variables
  // current_question - index that keeps track of current question
  // var currentIndex = questionNumber; // will hold the current question
  // var secondsLeft = 60; // seconds left?
  //
  // countdownTimer = window.setTimeout(function(){
  //
  // }, 5 *1000);

  // B) If the index is not >= to length of questions ...
    // 1) Display the question to the user
    // 2.) Display the answer choices to the user
      // each answer choice should be a button
      // event listener to each button
        // event listener will clear the setTimeout!
    // 3.) set a timer that counts down from 60 seconds
      // *.) If counter is not the length of the array, call this function again.



  // part2) Check to see if the user's input was correctAnswers
  // wrap the messages in a timer for 5 seconds
    // if) user is wrong!!
      // Display what the correct is
      // update incorrectAnswers var

   // else) user was right!!
    // tell them good job
    // update correctAnswers var



// ----- Event listenter for when page loads -----
$(document).ready(function(){
  // console.log("ready");
  // call the main game function here!
  Game.initialize();

});







// Opt #1 -- pseudo code
// initialize an array of Questions

// loop through each question in the array

  // display question and answer to the user
    // create an event listener for each potential answer
      // when event listener is called --> PROCEED

  // create an interval timer that counts down from say 60 seconds
    // for every 1000ms decrement by 1
    // check  to see if you're out of time
      // if so, clear the timer and --> PROCEED

  // only when PROCEED,
  // ** PROBLEM HERE ***
    // check if user is correct / display answer

  // END OF forEach loop (get the next question if it exists)
