'use strict';

// Canvas and rendering context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// UI Elements
const button = document.querySelector('.button');
const input = document.querySelector('.text');
const answer = document.querySelector('.answer');
const questionDisplay = document.querySelector('.question');
const cWidth = canvas.width;
const cHeight = canvas.height;
const radio = 278;

// Questions data
const questions = [{
        letter: "A",
        question: "Relación afectiva entre dos o más personas basada en el cariño",
        answer: "Amistad"
    },
    {
        letter: "B",
        question: "Cualidad de ser bueno, generoso, amable y benevolente",
        answer: "Bondad"
    },
    {
        letter: "C",
        question: "Creencia en la honestidad, integridad, habilidades y buenas intenciones de otra persona o entidad.",
        answer: "Confianza"
    },
    {
        letter: "D",
        question: "Compromiso y la entrega total hacia una actividad, tarea o objetivo específico",
        answer: "Dedicación"
    },
    {
        letter: "E",
        question: "Justicia, imparcialidad y tratamiento justo en situaciones diversas.",
        answer: "Equitat"
    },
    {
        letter: "F",
        question: "Estado emocional y subjetivo caracterizado por sentimientos de alegría, satisfacción, bienestar y contento.",
        answer: "Felicitat"
    },
    {
        letter: "G",
        question: "Disposición a dar, compartir o ayudar a los demás de manera desinteresada",
        answer: "Generositat"
    },
    {
        letter: "H",
        question: "Concepto que abarca la integridad, la honestidad y la rectitud en el comportamiento personal",
        answer: "Honor"
    },
    {
        letter: "I",
        question: "Principio fundamental de tratar a todas las personas de manera justa y equitativa",
        answer: "Igualtat"
    },
    {
        letter: "J",
        question: "Principio ético y moral que se refiere a la equidad, imparcialidad y trato justo en el ámbito social, legal y moral.",
        answer: "Justícia"
    },
    {
        letter: "K",
        question: "",
        answer: "K"
    },
    {
        letter: "L",
        question: "",
        answer: "L"
    },
    {
        letter: "LL",
        question: "",
        answer: "LL"
    },
    {
        letter: "M",
        question: "",
        answer: "M"
    },
    {
        letter: "N",
        question: "",
        answer: "N"
    },
    {
        letter: "O",
        question: "",
        answer: "O"
    },
    {
        letter: "P",
        question: "",
        answer: "P"
    },
    {
        letter: "Q",
        question: "",
        answer: "Q"
    },
    {
        letter: "R",
        question: "",
        answer: "R"
    },
    {
        letter: "S",
        question: "",
        answer: "S"
    },
    {
        letter: "T",
        question: "",
        answer: "T"
    },
    {
        letter: "U",
        question: "",
        answer: "U"
    },
    {
        letter: "V",
        question: "",
        answer: "V"
    },
    {
        letter: "W",
        question: "",
        answer: "W"
    },
    {
        letter: "X",
        question: "",
        answer: "X"
    },
    {
        letter: "Y",
        question: "",
        answer: "Y"
    },
    {
        letter: "Z",
        question: "",
        answer: "Z"
    }
];

// Game variables
let questionIndex = -1;
let currentLetterIndex = -1;
let corrects = 0;
let wrongs = 0;

// Array to store Letter objects
const letters = [];

// Letter class to represent each circle in the game
class Letter {
    constructor(angle, letter, index) {
        this.angle = angle;
        this.letter = letter;
        this.correct = null;
        this.color = '';
        this.radio = 30;
        this.index = index;
        this.x = Math.cos(this.angle) * radio + cWidth / 2;
        this.y = Math.sin(this.angle) * radio + cHeight / 2;
    }

    // Method to draw the letter circle on the canvas
    Draw() {
        ctx.lineWidth = 2;
        if (this.correct === true) this.color = 'green';
        else if (this.correct === false) this.color = 'red';
        else if (this.correct === null) this.color = 'blue';

        if (this.index === currentLetterIndex) {
            this.color = 'orange';
        }

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 35px Impact';

        const textX = this.x - ctx.measureText(this.letter).width / 2;
        const textY = this.y + ctx.measureText(this.letter).actualBoundingBoxAscent / 2;

        ctx.fillText(this.letter, textX, textY);
    }
}

// Initialize Letter objects for each question
for (const [i, question] of questions.entries()) {
    const angle = 2 * Math.PI / questions.length * i - Math.PI / 2;
    letters.push(new Letter(angle, question.letter, i));
}

// Function to draw the entire canvas
function Draw() {
    for (const letter of letters) {
        letter.Draw();
    }
}

// FUNCTION TO NORMALIZE TEXT (REMOVE ACCENTS AND CONVERT TO LOWERCASE)
function Normalize(text) {
    return text
      .toLowerCase()
      .replace(/[áàäéèëíìïóòöúùü]/g, (match) => match.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  }
  
// Function to handle user's answer
function Answer() {
    const index = questionIndex % questions.length;
    const answerText = input.value;

    if (answerText.length <= 0) {
        Pasapalabra();
        return;
    }

    answer.className = 'answer ';

    if (Normalize(answerText) === Normalize(questions[index].answer)) {
        answer.className += 'good';
        letters[index].correct = true;
        corrects++;
        answer.innerHTML = questions[index].answer;
    } else {
        answer.className += 'bad';
        letters[index].correct = false;
        wrongs++;
        answer.innerHTML = questions[index].answer;
    }

    input.disabled = true;
    input.value = '';
    Draw();
}

// Function to handle skipping to the next word
function Pasapalabra() {
    if (corrects + wrongs < questions.length) {
        questionIndex++;
        currentLetterIndex = questionIndex % questions.length;
        const index = currentLetterIndex;

        if (letters[index].correct !== null) {
            Pasapalabra();
            return;
        }

        answer.innerHTML = '';
        questionDisplay.innerHTML = questions[index].question;
        input.disabled = false;
        input.select();

        Draw();
    } else {
        DrawScore();
    }
}

// Function to draw the final scores
function DrawScore() {
    const textCorrects = `Correct: ${corrects}`;
    const textWrongs = `Wrong: ${wrongs}`;

    ctx.font = '30px Impact';

    const widthCorrects = ctx.measureText(textCorrects).width;
    const widthWrongs = ctx.measureText(textWrongs).width;

    const correctsX = (cWidth - widthCorrects) / 2;
    const wrongsX = (cWidth - widthWrongs) / 2;

    ctx.fillStyle = '#fff';
    ctx.fillText('Correct: ', correctsX, cHeight / 2 - 30);
    ctx.fillText('Wrong: ', wrongsX, cHeight / 2 + 30);

    ctx.fillStyle = '#0f0';
    ctx.fillText(corrects, correctsX + ctx.measureText('Correct: ').width, cHeight / 2 - 30);

    ctx.fillStyle = '#f00';
    ctx.fillText(wrongs, wrongsX + ctx.measureText('Wrong: ').width, cHeight / 2 + 30);
}

// Function to handle answer submission events
function handleAnswerSubmission() {
    Answer();
    Draw();
}

// Event listeners
button.addEventListener('click', handleAnswerSubmission);

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && document.activeElement !== input) {
        handleAnswerSubmission();
    }
});

canvas.addEventListener('click', Pasapalabra);

input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleAnswerSubmission();
    }
});

// Initial setup
Pasapalabra();