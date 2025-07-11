const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: "HyperText Markup Language",
    difficulty: "Easy"
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
    difficulty: "Easy"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<nav>"],
    answer: "<a>",
    difficulty: "Easy"
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font", "styles"],
    answer: "style",
    difficulty: "Easy"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["bgcolor", "background", "color", "background-color"],
    answer: "background-color",
    difficulty: "Easy"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
    difficulty: "Medium"
  },
  {
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    options: ["append()", "push()", "insert()", "addToEnd()"],
    answer: "push()",
    difficulty: "Medium"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Display Object Method",
      "Digital Ordinance Model"
    ],
    answer: "Document Object Model",
    difficulty: "Medium"
  },
  {
    question: "Which JavaScript keyword is used to declare constants?",
    options: ["var", "let", "constant", "const"],
    answer: "const",
    difficulty: "Medium"
  },
  {
    question: "What is the correct syntax to write a comment in JavaScript?",
    options: ["<!-- comment -->", "// comment", "# comment", "/* comment */"],
    answer: "// comment",
    difficulty: "Medium"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunc()",
      "create.myFunc()",
      "def myFunc()",
      "function:myFunc()"
    ],
    answer: "function myFunc()",
    difficulty: "Medium"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>",
    difficulty: "Medium"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets",
    difficulty: "Medium"
  },
  {
    question: "Which operator is used to compare both value and type in JavaScript?",
    options: ["==", "=", "===", "!="],
    answer: "===",
    difficulty: "Medium"
  },
  {
    question: "How do you call a function named `myFunction` in JavaScript?",
    options: ["call myFunction", "myFunction()", "call function myFunction", "run myFunction"],
    answer: "myFunction()",
    difficulty: "Medium"
  },
  {
    question: "What is the use of the useEffect() hook in React?",
    options: [
      "To style components",
      "To manage state",
      "To perform side effects like API calls",
      "To render JSX"
    ],
    answer: "To perform side effects like API calls",
    difficulty: "Hard"
  },
  {
    question: "Which lifecycle method is called after a React component mounts?",
    options: ["componentWillMount", "componentDidMount", "render", "componentWillUnmount"],
    answer: "componentDidMount",
    difficulty: "Hard"
  },
  {
    question: "Which HTML5 element is used to define navigation links?",
    options: ["<nav>", "<menu>", "<aside>", "<navigate>"],
    answer: "<nav>",
    difficulty: "Hard"
  },
  {
    question: "In JavaScript, what does the 'this' keyword refer to in a regular function?",
    options: [
      "The function itself",
      "The parent scope",
      "The global object or calling object",
      "The class name"
    ],
    answer: "The global object or calling object",
    difficulty: "Hard"
  },
  {
    question: "Which of these tools can be used to bundle and compile JavaScript code?",
    options: ["Webpack", "MySQL", "Postman", "Node.js"],
    answer: "Webpack",
    difficulty: "Hard"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;
let skippedCount = 0;

const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionCounter = document.getElementById("questionCounter");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");
const feedback = document.getElementById("feedback");
const darkToggle = document.getElementById("darkToggle");
const skipBtn = document.getElementById("skipBtn");

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  timerDisplay.innerText = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft === 5) {
      alert("⏳ Hurry up! Only 5 seconds left!");
    }
    if (timeLeft === 0) {
      clearInterval(timer);
      feedback.innerText = `⏰ Time's up! The correct answer is "${questions[currentQuestion].answer}".`;
      disableOptions();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionBox.innerText = q.question;
  optionsBox.innerHTML = "";

  scoreDisplay.innerText = `Score: ${score}`;
  questionCounter.innerText = `Question: ${currentQuestion + 1}/${questions.length}`;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(btn.innerText);
    optionsBox.appendChild(btn);
  });

  // Show difficulty
  const diffLabel = document.getElementById("difficultyLabel");
  diffLabel.innerText = `Difficulty: ${q.difficulty}`;
  diffLabel.className = "";
  diffLabel.classList.add(q.difficulty.toLowerCase());

  // Progress bar update
  const progressBar = document.getElementById("progressBar");
  const progressPercent = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  feedback.innerText = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
  shareBtn.style.display = "none";
  skipBtn.style.display = "inline-block";

  skipBtn.disabled = false;
  skipBtn.style.display = "inline-block";  // Or "block"

  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
    feedback.innerText = "✅ Correct!";
  } else {
    feedback.innerText = `❌ Wrong! The correct answer is "${correct}".`;
  }

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) btn.style.backgroundColor = "#4caf50";
    else btn.style.backgroundColor = "#f44336";
  });

  nextBtn.style.display = "block";
  skipBtn.disabled = true;

}

function disableOptions() {
  const correct = questions[currentQuestion].answer;
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) btn.style.backgroundColor = "#4caf50";
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

skipBtn.onclick = () => {
  skippedCount++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
};
// let diff = document.querySelectorAll("#difficultyLabel");

function showScore() {
  const diffLabel = document.getElementById("difficultyLabel");
  // let h1 = document.querySelectorAll("h1");
  // h1.style.marginTop = "20px"
  document.getElementById("downloadPdfBtn").style.display = "inline-block";
  diffLabel.style.display = "none";
  clearInterval(timer);
  questionBox.innerText = "🎉 Quiz Completed!";
  optionsBox.innerHTML = "";
  nextBtn.style.display = "none";
  skipBtn.style.display = "none";
  timerDisplay.innerText = "";
  feedback.innerText = "";

  const correctAnswers = score;
  const wrongAnswers = questions.length - score - skippedCount;

  const ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Wrong', 'Skipped'],
      datasets: [{
        label: 'Quiz Result',
        data: [correctAnswers, wrongAnswers, skippedCount],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: `Final Score: ${score} / ${questions.length}`
        }
      }
    }
  });

  restartBtn.style.display = "inline-block";
  shareBtn.style.display = "inline-block";
  document.getElementById("progressBar").style.width = "100%";
}

shareBtn.onclick = () => {
  alert("click on ok to share on whatsapp")
  const shareMessage = `I scored ${score}/${questions.length} on this fun quiz! 🎯`;
  const url = window.location.href;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareMessage + "\n" + url)}`;
  window.open(whatsappURL, "_blank");
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  skippedCount = 0;
  scoreBox.innerHTML = `
    <canvas id="resultChart" width="200" height="200"></canvas><br><br>
    <button id="restartBtn">Restart Quiz</button>
    <button id="shareBtn">Share Result</button>
  `;
  loadQuestion();
  document.getElementById("restartBtn").onclick = restartBtn.onclick;
  document.getElementById("shareBtn").onclick = shareBtn.onclick;
};

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
  document.getElementById("difficultyLabel").style.display = "none";
});

document.getElementById("downloadPdfBtn").onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const correct = score;
  const total = questions.length;
  const wrong = total - score - skippedCount;

  doc.setFontSize(18);
  doc.text("Quiz Result", 20, 20);

  doc.setFontSize(12);
  doc.text(`Total Questions: ${total}`, 20, 40);
  doc.text(`Correct Answers: ${correct}`, 20, 50);
  doc.text(`Wrong Answers: ${wrong}`, 20, 60);
  doc.text(`Skipped Questions: ${skippedCount}`, 20, 70);

  const date = new Date();
  doc.text(`Date: ${date.toLocaleString()}`, 20, 85);

  doc.save("quiz-result.pdf");
};


loadQuestion();
