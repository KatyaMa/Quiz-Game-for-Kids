// window.onload = function() {
//     displayQuestion();
//   };
  
//   const quiz = [
//     {
//       question: "What is the capital of France?",
//       answers: {
//         a: "Paris",
//         b: "London",
//         c: "Berlin"
//       },
//       correctAnswer: "a"
//     },
//     {
//       question: "What is the highest mountain in the world?",
//       answers: {
//         a: "Mount Everest",
//         b: "K2",
//         c: "Mount Kilimanjaro"
//       },
//       correctAnswer: "a"
//     },
//     {
//       question: "What is the largest ocean in the world?",
//       answers: {
//         a: "Atlantic Ocean",
//         b: "Indian Ocean",
//         c: "Pacific Ocean"
//       },
//       correctAnswer: "c"
//     }
//   ];
  
//   let currentQuestion = 0;
//   let score = 0;
  
//   const questionElement = document.getElementById("question");
//   const answersElement = document.getElementById("answers");
//   const submitButton = document.getElementById("submit");
//   const resultElement = document.getElementById("result");
  
//   function displayQuestion() {
//     const currentQuiz = quiz[currentQuestion];
//     questionElement.innerHTML = currentQuiz.question;
//     answersElement.innerHTML = "";
//     for (const key in currentQuiz.answers) {
//       answersElement.innerHTML +=
//         `<label><input type="radio" name="answer" value="${key}">` +
//         currentQuiz.answers[key] +
//         "</label><br>";
//     }
//     submitButton.style.display = "inline-block";
//   }
  
//   submitButton.addEventListener("click", function() {
//     const selectedAnswer = document.querySelector('input[name="answer"]:checked');
//     if (!selectedAnswer) {
//       alert("Please select an answer before submitting.");
//       return;
//     }
//     const answer = selectedAnswer.value;
//     if (answer === quiz[currentQuestion].correctAnswer) {
//       score++;
//     }
//     resultElement.innerHTML = "Correct answers: " + score;
//     currentQuestion++;
//     if (currentQuestion === quiz.length) {
//       resultElement.innerHTML += "<br>Quiz Completed!";
//       submitButton.style.display = "none";
//     } else {
//       displayQuestion();
//     }
//   });



window.onload = function() {
    let quiz = [];
    let currentQuestion = 0;
    let score = 0;
    
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const submitButton = document.getElementById("submit-button");
    const resultElement = document.getElementById("result");
  
    fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
      .then(response => response.json())
      .then(data => {
        data.results.forEach(result => {
          const answers = {};
          result.incorrect_answers.forEach((answer, index) => {
            answers[String.fromCharCode(97 + index)] = answer;
          });
          answers["c"] = result.correct_answer;
          quiz.push({
            question: result.question,
            answers: answers,
            correctAnswer: "c"
          });
        });
        displayQuestion();
      });
  
    function displayQuestion() {
      const currentQuiz = quiz[currentQuestion];
      questionElement.innerHTML = currentQuiz.question;
      answersElement.innerHTML = "";
      for (const key in currentQuiz.answers) {
        answersElement.innerHTML +=
          `<label><input type="radio" name="answer" value="${key}">` +
          currentQuiz.answers[key] +
          "</label><br>";
      }
      submitButton.style.display = "inline-block";
    }
  
    submitButton.addEventListener("click", function() {
      const answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === quiz[currentQuestion].correctAnswer) {
        score++;
      }
      resultElement.innerHTML = "Correct answers: " + score;
      currentQuestion++;
      if (currentQuestion === quiz.length) {
        resultElement.innerHTML += "<br>Quiz Completed!";
        submitButton.style.display = "none";
      } else {
        displayQuestion();
      }
    });



    // This will add the play again button when the quiz is completed, 
    // and when you click on the play again button, it will reset the score and currentQuestion, 
    // clear the result, and display the first question again.

    submitButton.addEventListener("click", function() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
          resultElement.innerHTML = "Please select an answer.";
        } else {
          const answer = selectedOption.value;
          if (answer === quiz[currentQuestion].correctAnswer) {
            score++;
          }
          resultElement.innerHTML = "Correct answers: " + score;
          currentQuestion++;
          if (currentQuestion === quiz.length) {
            resultElement.innerHTML += "<br><button id='play-again'>Play Again</button>";
            submitButton.style.display = "none";
            const playAgainButton = document.getElementById("play-again");
            playAgainButton.addEventListener("click", function() {
              score = 0;
              currentQuestion = 0;
              resultElement.innerHTML = "";
              displayQuestion();
              submitButton.style.display = "inline-block";
            });
          } else {
            displayQuestion();
          }
        }
      });
    
    
    
    
      
      
      
  };
