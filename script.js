const questions = [
  {
    question: "What is the capital of Nigeria?",
    answers: [
      { text: "Abuja", correct: true },
      { text: "Lagos", correct: false },
      { text: "Kano", correct: false },
      { text: "Port Harcourt", correct: false },
    ],
  },
  {
    question: "Who is the current president of Nigeria?",
    answers: [
      { text: "Umaru Musa Yar'adua", correct: false },
      { text: "Abdulsalami Abubakar", correct: false },
      { text: "Bola Ahmed Tinubu", correct: true },
      { text: "Babangida Mustapha", correct: false },
    ],
  },
  {
    question: "How many states does Nigeria have?",
    answers: [
      { text: "10", correct: false },
      { text: "36", correct: true },
      { text: "27", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Which state has the highest population in Nigeria?",
    answers: [
        { text: "Oyo State", correct: false },
        { text: "Enugu State", correct: false },
        { text: "Benue State", correct: false },
        { text: "Plateau State", correct: true }
    ]
  }
];
const questionEl = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = `Question ${questionNo}: ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add('btn');
        answerBtn.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer)
    });
}
function resetState(){
    nextBtn.style.display = "none"
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e){
    const selectedOption = e.target;
    const correct = selectedOption.dataset.correct === 'true';
    if(correct){
        selectedOption.classList.add("correct");
        score++
    }
    else{
        selectedOption.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(btn => {
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextBtn.style.display = "block"
}
function displayScore(){
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Restart Quiz";
    nextBtn.style.display = "block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(questions.length > currentQuestionIndex){
        showQuestion();
    }
    else{
        displayScore();
    }
}
nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})
startQuiz();
