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

];

// Game stats object to keep track of number correct & wrong
var GameStats = {
  "correctAnswers": 0,
  "incorrectAnswers": 0,
}

// ----- Main functionality -----

// I) Loop through Each question in the data array:
  // *) Initialize variables
  //  PROCEED - boolean variable & set it to false
  // Timer - reference to a timer object, that will get cleared! each question
  // User choice - the option the user picked

  //part1) while !proceed ....

    // A) Create a timer for each question that counts down
    // A-(cont.) from 60 seconds and display it to the user

      // *.) when time is up, change the proceed variable to true -->
      // escape the while loop

    // B) Display the question & answer
      // 1) get the question & display is to the user in question box

      // 2) get the answer Choices and loop through them &
      // create the html to append to answer box

    // C) Don't proceed until



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
});
