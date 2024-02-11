"use strict";

// Canvas and rendering context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// UI Elements
const button = document.querySelector(".button");
const input = document.querySelector(".text");
const answer = document.querySelector(".answer");
const questionDisplay = document.querySelector(".question");
const cWidth = canvas.width;
const cHeight = canvas.height;
const radio = 278;

// Questions data
const questions = [
  {
    letter: "A",
    question: "Relació afectiva entre dues o més persones basada en afecte.",
    answer: "Amistat",
  },
  {
    letter: "B",
    question: "Qualitat de ser bo, generós, amable i afable.",
    answer: "Bondat",
  },
  {
    letter: "C",
    question:
      "Creença en l'honestedat, la integritat i les bones intencions d'una altra persona o entitat.",
    answer: "Confiança",
  },
  {
    letter: "D",
    question:
      "Compromís i lliurament total cap a una activitat, tasca o objectiu específic.",
    answer: "Dedicació",
  },
  {
    letter: "E",
    question:
      "Justícia, imparcialitat i tractament just en situacions diverses.",
    answer: "Equitat",
  },
  {
    letter: "F",
    question:
      "Estat emocional i subjectiu caracteritzat per sentiments de joia, satisfacció, benestar i contentament.",
    answer: "Felicitat",
  },
  {
    letter: "G",
    question:
      "Disposició a donar, compartir o ajudar els altres de manera desinteressada.",
    answer: "Generositat",
  },
  {
    letter: "H",
    question:
      "Concepte que abraça la integritat, l'honestedat i la rectitud en el comportament personal.",
    answer: "Honor",
  },
  {
    letter: "I",
    question:
      "Principi fonamental de tractar totes les persones de manera justa i equitativa.",
    answer: "Igualtat",
  },
  {
    letter: "J",
    question:
      "Principi ètic i moral que es refereix a l'equitat, imparcialitat i tracte just a l'àmbit social, legal i moral.",
    answer: "Justícia",
  },
  {
    letter: "K",
    question:"Forma comuna o estàndard d'un idioma, utilitzada per a la comunicació entre parlants de diferents dialectes o variants.",
    answer: "Koinè",
  },
  {
    letter: "L",
    question: "Qualitat de ser fidel i confiable cap a altres persones o causes.",
    answer: "Lealtat",
  },
  {
    letter: "LL",
    question:
      "Paraula que conté la LL, el significat de la qual és: modals cortesos, mostra respecte i actua amb noblesa i honor.",
    answer: "Cavallerós",
  },
  {
    letter: "M",
    question:
      "És un valor que destaca la importància de no vanagloriar-se i reconèixer les pròpies limitacions.",
    answer: "Modèstia",
  },
  {
    letter: "N",
    question: "Qualitat de ser honorable, generós i tindre una conducta digna i respectuosa envers els altres.",
    answer: "Noblesa",
  },
  {
    letter: "O",
    question: "Perspectiva positiva i esperançada del futur, de si mateix i del món que l'envolta.",
    answer: "Optimisme",
  },
  {
    letter: "P",
    question: "La capacitat de persistir i continuar esforçant-se cap a una meta.",
    answer: "Perseverança",
  },
  {
    letter: "Q",
    question: "Grau d'excel·lència, característiques distintives o propietats que tenen alguna cosa.",
    answer: "Qualitat",
  },
  {
    letter: "R",
    question: "L'actitud de considerar amb estima i reconèixer els drets i opinions dels altres, demostrant cortesia, tolerància i educació.",
    answer: "Respecte",
  },
  {
    letter: "S",
    question: "Col·laboració i suport mutu entre individus o grups especialment en situacions difícils o de necessitat.",
    answer: "Solidaritat",
  },
  {
    letter: "T",
    question: "Respecte a les idees, creences o pràctiques dels altres quan són diferents o contràries a les pròpies.",
    answer: "Tolerància",
  },
  {
    letter: "U",
    question: "L'acció d'estar junts o connectats, mostrant col·laboració i força conjunta.",
    answer: "Unió",
  },
  {
    letter: "V",
    question: "Fet o gesta heroica executada amb valor.",
    answer: "Valentia",
  },
  {
    letter: "W",
    question: "Tecnologia de comunicació sense fils que permet la connexió a Internet.",
    answer: "WiFi",
  }, 
  {
    letter: "X",
    question: "Paraula que conté la X: estat d'ànim intens o elevat",
    answer: "Exaltació",
  },
  {
    letter: "Y",
    question: "Paraula que conté la Y: expressió d'afecte, tendresa i estima envers altres persones o coses.",
    answer: "Carinyo",
  },
  {
    letter: "Z",
    question: "L'entusiasme i la dedicació intensa per aconseguir un objectiu o per defensar una causa amb fervor.",
    answer: "Zel",
  },
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
    this.color = "";
    this.radio = 30;
    this.index = index;
    this.x = Math.cos(this.angle) * radio + cWidth / 2;
    this.y = Math.sin(this.angle) * radio + cHeight / 2;
  }

  // Method to draw the letter circle on the canvas
  Draw() {
    context.lineWidth = 2;
    if (this.correct === true) this.color = "green";
    else if (this.correct === false) this.color = "red";
    else if (this.correct === null) this.color = "blue";

    if (this.index === currentLetterIndex) {
      this.color = "orange";
    }

    context.fillStyle = this.color;
    context.strokeStyle = "black";

    context.beginPath();
    context.arc(this.x, this.y, this.radio, 0, Math.PI * 2, true);
    context.stroke();
    context.fill();

    context.fillStyle = "white";
    context.font = "bold 35px Impact";

    const textX = this.x - context.measureText(this.letter).width / 2;
    const textY =
      this.y + context.measureText(this.letter).actualBoundingBoxAscent / 2;

    context.fillText(this.letter, textX, textY);
  }
}

// Initialize Letter objects for each question
for (const [i, question] of questions.entries()) {
  const angle = ((2 * Math.PI) / questions.length) * i - Math.PI / 2;
  letters.push(new Letter(angle, question.letter, i));
}

// Function to draw the entire canvas
function Draw() {
  for (const letter of letters) {
    letter.Draw();
  }
  if (corrects + wrongs === questions.length) {
    DrawScore();
  }
}

// Function to normalize text (remove accents and convert to lowercase)
function Normalize(text) {
  return text
    .toLowerCase()
    .replace(/[áàäéèëíìïóòöúùü]/g, (match) =>
      match.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
}

// Function to handle user's answer
function Answer() {
  const index = questionIndex % questions.length;
  const answerText = input.value;

  if (answerText.length <= 0) {
    Pasapalabra();
    return;
  }

  answer.className = "answer ";

  if (Normalize(answerText) === Normalize(questions[index].answer)) {
    answer.className += "good";
    letters[index].correct = true;
    corrects++;
    answer.innerHTML = questions[index].answer;
  } else {
    answer.className += "bad";
    letters[index].correct = false;
    wrongs++;
    answer.innerHTML = questions[index].answer;
  }

  input.disabled = true;
  input.value = "";
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

    answer.innerHTML = "";
    questionDisplay.innerHTML = questions[index].question;
    input.disabled = false;
    input.select();

    Draw();
  } else {
    DrawScore();
  }
}

//Function to draw the final scores
function DrawScore() {
  const textCorrectos = `Correctos: ${corrects}`;
  const textIncorrectos = `Incorrectos: ${wrongs}`;
  const fontSize = 30;

  context.font = `${fontSize}px Impact`;

  const widthCorrectos = context.measureText(textCorrectos).width;
  const widthIncorrectos = context.measureText(textIncorrectos).width;

  // Calculate the maximum width between the words
  const maxWidth = Math.max(widthCorrectos, widthIncorrectos);

  const correctosX = (cWidth - maxWidth) / 2;
  const incorrectosX = (cWidth - maxWidth) / 2;
  const baselineY = cHeight / 2;

  const drawText = (text, x, y, color) => {
    context.fillStyle = color;
    context.fillText(text, x, y);
  };

  // Draw labels
  drawText("Correctos: ", correctosX, baselineY - 30, "white");
  drawText("Incorrectos: ", incorrectosX, baselineY + 30, "white");

  // Draw scores
  drawText(corrects, correctosX + maxWidth, baselineY - 30, "green");
  drawText(wrongs, incorrectosX + maxWidth, baselineY + 30, "red");

  // Hide the last answer and question
  answer.innerHTML = "";
  questionDisplay.innerHTML = "";
  currentLetterIndex = -1; // Reset currentLetterIndex
}

// Function to handle answer submission events
function handleAnswerSubmission() {
  Answer();
  Draw();
}

// Event listeners
button.addEventListener("click", handleAnswerSubmission);

canvas.addEventListener("click", Pasapalabra);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (document.activeElement === input) {
      // If the input has focus, handle the answer
      e.preventDefault();
      handleAnswerSubmission();
    } else {
      // If not, move to next question
      Pasapalabra();
    }
  }
});

// Initial setup
Pasapalabra();
