document.addEventListener("DOMContentLoaded", () => {

  const categories = [
    "Назад в будущее",
    "Угадай мелодию",
    "Нет слов, одни эмодзи",
    "В прямом эфире",
    "Чёрный квадрат",
    "Эй, подруга, что с лицом?"
  ];

  const questions = {
    "Назад в будущее": {
      100: {
        question: "В репертуаре Саши и Ярика есть много одинаковых ролей...",
        answer: {
          text: "Ромео",
          image: "pics/answer1_100.jpg"
        }
      },
      200: {
        question: "Расставьте исполнения мюзикла «Тетрадь смерти» в хронологическом порядке",
        answer: {
          text: "В. 2017 год, Г. 2018 год, А. 2021 год, А. 2021 год"
        }
      }
    },
    "Угадай мелодию": {
      100: {
        question: "Текст Проверка",
        answer: {
          text: "Ответ1",
          audio: "music/tyani2.mp3"
        }
      }
    }
  };

  const boardBody = document.getElementById("board-body");
  const boardScreen = document.getElementById("game-board");
  const questionScreen = document.getElementById("question-screen");
  const answerScreen = document.getElementById("answer-screen");
  const audioPlayer = document.getElementById("audio-player");

  let currentQuestion = null;
  let currentCell = null;

  // ---- Аудио ----
  function playAudio(src) {
    if (!audioPlayer || !src) return;
    audioPlayer.pause();
    audioPlayer.src = src;
    audioPlayer.currentTime = 0;
    audioPlayer.play().catch(e => console.error("audio play error:", e));
  }

  function stopAudio() {
    if (!audioPlayer) return;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  // ---- Экран ----
  function showScreen(screen) {
    [boardScreen, questionScreen, answerScreen].forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
  }

  // ---- Открытие вопроса ----
  function openQuestion(category, value, cell) {
    currentQuestion = questions[category][value];
    currentCell = cell;

    document.getElementById("question-category").textContent = category;
    document.getElementById("question-value").textContent = value;
    document.getElementById("question-text").textContent = currentQuestion.question;

    // Кнопки музыки на вопросе
    const playBtnQ = document.getElementById("play-music-question");
    const stopBtnQ = document.getElementById("stop-music-question");
    if (currentQuestion.questionAudio) {
      playBtnQ.style.display = "inline-block";
      stopBtnQ.style.display = "inline-block";
    } else {
      playBtnQ.style.display = "none";
      stopBtnQ.style.display = "none";
    }

    stopAudio();
    showScreen(questionScreen);
  }

  // ---- Генерация доски ----
  categories.forEach(category => {
    const row = document.createElement("tr");
    const catCell = document.createElement("td");
    catCell.textContent = category;
    row.appendChild(catCell);

    [100, 200, 300, 400, 500].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;

      if (questions[category]?.[value]) {
        cell.onclick = () => openQuestion(category, value, cell);
      } else {
        cell.classList.add("used");
      }

      row.appendChild(cell);
    });

    boardBody.appendChild(row);
  });

  // ---- Кнопка Узнать ответ ----
  document.getElementById("show-answer").onclick = () => {
    if (!currentQuestion) return;

    const container = document.getElementById("answer-text");
    container.innerHTML = "";

    // текст
    const text = document.createElement("div");
    text.textContent = currentQuestion.answer.text || "";
    container.appendChild(text);

    // картинка
    if (currentQuestion.answer.image) {
      const img = document.createElement("img");
      img.src = currentQuestion.answer.image;
      img.alt = "Иллюстрация ответа";
      container.appendChild(img);
    }

    // Кнопки музыки на ответе
    const playBtnA = document.getElementById("play-music-answer");
    const stopBtnA = document.getElementById("stop-music-answer");
    if (currentQuestion.answer.audio) {
      playBtnA.style.display = "inline-block";
      stopBtnA.style.display = "inline-block";
    } else {
      playBtnA.style.display = "none";
      stopBtnA.style.display = "none";
    }

    stopAudio();
    showScreen(answerScreen);
  };

  // ---- Кнопка Назад к доске ----
  document.getElementById("back-to-board").onclick = () => {
    if (currentCell) {
      currentCell.classList.add("used");
      currentCell.onclick = null;
    }
    stopAudio();
    showScreen(boardScreen);
  };

  // ---- Кнопки музыки ----
  document.getElementById("play-music-question").onclick = () => {
    if (currentQuestion?.questionAudio) playAudio(currentQuestion.questionAudio);
  };
  document.getElementById("stop-music-question").onclick = stopAudio;

  document.getElementById("play-music-answer").onclick = () => {
    if (currentQuestion?.answer?.audio) playAudio(currentQuestion.answer.audio);
  };
  document.getElementById("stop-music-answer").onclick = stopAudio;

});
