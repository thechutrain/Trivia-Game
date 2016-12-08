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
  //   "question": "Who wrote the book Cat\'s cradle?", // tricky to put something in italics!
  //   "answerChoices": [
  //     "Ray Bradbury",
  //     "F. Scott Fitzgerald",
  //     "Ernest Hemingway",
  //     "Kurt Vonnegut",
  //   ],
  //   "correctAnswer": 3,
  //
  // }

];

// ----- Main functionality -----
var Game = {
  intervalTimer: null, // will hold a reference to the Interval timer
  countdownTimer: null, //will hold a reference to the countdown 1min
  currentIndex: 0,
  secondsLeft: 10,
  SECONDS_PER_QUESTION: 10,
  questions_data: data,
  user_guess: -1,
  correctAnswers: 0,
  incorrectAnswers: 0,

  /* initializes the game, gets called in the read() event listener
  */
  initialize: function(){
    $("#update-target").empty();
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
                              .addClass("btn btn-primary btn-block " +
                               "btn-answerChoice")
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
    // 1) Reset timer & empty the div?
    // Change the view of the timer
    $('#seconds').html("--");

    // 2) Get the current question & correct answer!
    var current_question = this.questions_data[this.currentIndex];
    var correctIndex = current_question.correctAnswer;
    var correctAnswer = current_question.answerChoices[correctIndex];
    // console.log(correctAnswer); // works!

    // console.log(current_question.answerChoices[current_question.correcAnswer]); // doesn't work!!
    // var correct_answer = current_question.answerChoices[current_question.correcAnswer];
    // console.log(correct_answer);

    // 3) check if the user was correct:
    if (current_question.correctAnswer == this.user_guess){
      // display that the user was correct & the correct answer
      // console.log("You are correct");
      var message = $("<div>").append(
                        $("<p>").html(correctAnswer + " is right!")
                      );
      this.correctAnswers ++;
    } else {
      // display user was wrong, and the correct answer
      // console.log("You're wrong");
      var message = $("<div>").append(
                      $("<p>").html("Sorry, " + correctAnswer +
                        " was the correct answer.")
                      );
      this.incorrectAnswers ++;
    }

    // 4) Update the view of #update-target ...
    $("#update-target").append(message);
    // check if the user's choice was correct or not
    // create a set time out interval that will display time ...
    this.intervalTimer = setTimeout(function(){
      // empty the html div
      console.log("TADA!");
      $("#update-target").empty();
      // set the index to the next potential question in array, and display it
      this.currentIndex ++;
      this.nextQuestion(this.currentIndex);
    }.bind(this), 1500)
  },

  gameOver: function(){
    // create the message
    var message = $("<h2>").html("You Finished the Game!").append(
                    $("<h4>").html("Questions answered correctly: "
                      + this.correctAnswers).append(
                        $("<h4>").html("Questions answered incorrectly: "
                          + this.incorrectAnswers)
                      )
                  );
    // create a button for play again
    var playAgain = $("<div>").append(
                        $("<button>").addClass("btn btn-info btn-play-again").html(
                          "play again?"
                        )
                    );
    // append the button to the message
    message.append(playAgain);
    $("#update-target").empty().append(message);

    // create a button that is an event listener for initialize game!
    // the event listener has to be outside
    var self = this;
    $(".btn-play-again").on("click", function(){
      // alert("another game!");
      self.initialize();
      // console.log("self: ");
      // console.log(self);
      // console.log("this: ");
      // console.log(this);
    });
  },
}

// ----- Event listenter for when page loads -----
$(document).ready(function(){
  // console.log("ready");
  // call the main game function here!
  Game.initialize();
});
