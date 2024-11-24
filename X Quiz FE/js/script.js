let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "In which language is memory management provided by JVM?",
        options: ["Java", "C", "C++", "Python"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "Which of the following is not a valid variable name in Python?",
        options: ["_myVar", "myVar2", "2myVar", "my_var"],
        correct: 2
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "In which data structure, elements are added at one end and removed from the other?",
        options: ["Array", "Stack", "Queue", "LinkedList"],
        correct: 2
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    }
];

const questionEl = document.getElementById('question');
const answerListEl = document.getElementById('answer-list');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const questionCounterEl = document.getElementById('question-counter');

function loadQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.text;
    answerListEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.classList.add('option');
        li.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option-${index}">
            <label for="option-${index}">${option}</label>
        `;
        li.addEventListener('click', () => selectOption(index));
        answerListEl.appendChild(li);
    });
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    timeLeft = 30;
    if (timer) clearInterval(timer);
    startTimer();
    updateProgress();
    updateQuestionCounter();
}

function selectOption(index) {
    const options = answerListEl.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    const selectedOption = answerListEl.querySelector(`#option-${index}`).closest('.option');
    selectedOption.classList.add('selected');
    answerListEl.querySelector(`#option-${index}`).checked = true;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = answerListEl.querySelector('.selected input');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const correctOptionIndex = questions[currentQuestion].correct;
    const selectedOptionIndex = parseInt(selectedOption.value);
    const options = answerListEl.querySelectorAll('.option');

    options[correctOptionIndex].classList.add('correct');
    if (selectedOptionIndex !== correctOptionIndex) {
        options[selectedOptionIndex].classList.add('incorrect');
    } else {
        score++;
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionCounter() {
    questionCounterEl.textContent = `${currentQuestion + 1} of ${questions.length}`;
}

function showResults() {
    alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    resetQuiz();
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    updateProgress();
    clearInterval(timer);
    timerEl.textContent = `Time: 30s`;
}

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
});
loadQuestion();
