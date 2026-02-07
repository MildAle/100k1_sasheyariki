document.addEventListener("DOMContentLoaded", () => {

  // ---------------- ДАННЫЕ ----------------

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
        question: { text: "В репертуаре Саши и Ярика есть много одинаковых ролей..." },
        answer: { text: "Ромео", image: "pics/answer1_100.jpg" }
      },
      200: {
        question: { text: "Расставьте исполнения мюзикла «Тетрадь смерти» в хронологическом порядке", video: "video/question200.mp4" },
        answer: { text: "В. 2017 год, Г. 2018 год, А. 2021 год, А. 2021 год" }
      }
    },
    "Угадай мелодию": {
      100: {
        question: { audio: "music/tyani2.mp3" },
        answer: { text: "Ответ1" }
      },
      500: {
        question: { audio: "music/more_than_words_question.mp3" },
        answer: { video: "video/more_than_words_melodia_500.mp4" }
      }
    }
  };

  // ---------------- DOM ----------------

  const boardBody = document.getElementById("board-body");
  const boardScreen = document.getElementById("game-board");
  const questionScreen = document.getElementById("question-screen");
  const answerScreen = document.getElementById("answer-screen");
  const audioPlayer = document.getElementById("audio-player");

  const questionVideoWrapper = document.getElementById("question-video-wrapper");
  const answerVideoWrapper = document.getElementById("answer-video-wrapper");
  const questionVideo = document.getElementById("question-video");
  const answerVideo = document.getElementById("answer-video");

  let currentQuestion = null;
  let currentCell = null;

  // ---------------- АУДИО ----------------

  function playAudio(src) {
    if (!src) return;
    audioPlayer.pause();
    audioPlayer.src = src;
    audioPlayer.currentTime = 0;
    audioPlayer.play().catch(() => { });
  }

  function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  // ---------------- ВИДЕО ----------------

  function stopVideo(video, wrapper) {
    if (!video || !wrapper) return;
    video.pause();
    video.currentTime = 0;
    video.src = "";
    wrapper.style.display = "none";
  }

  function setupVideo(data, video, wrapper) {
    stopVideo(video, wrapper);

    if (!data.video) return;

    wrapper.style.display = "flex";
    video.src = data.video;
    video.load();

    const container = wrapper.querySelector(".video-container");
    const playIcon = wrapper.querySelector(".video-play-icon");

    // показываем иконку в начале
    playIcon.style.display = "block";

    // события для управления иконкой
    video.onplay = () => playIcon.style.display = "none";
    video.onpause = () => playIcon.style.display = "block";

    // клик по контейнеру
    container.onclick = () => {
      if (video.paused) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    };
  }

  // ---------------- ЭКРАНЫ ----------------

  function showScreen(screen) {
    [boardScreen, questionScreen, answerScreen].forEach(s =>
      s.classList.remove("active")
    );
    screen.classList.add("active");
  }

  // ---------------- РЕНДЕР КОНТЕНТА ----------------

  function renderContent(data, containerId, playBtnId, stopBtnId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    // текст
    if (data.text) {
      const div = document.createElement("div");
      div.textContent = data.text;
      container.appendChild(div);
    }

    // картинка
    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      img.alt = "";
      container.appendChild(img);
    }

    // кнопки музыки
    const playBtn = document.getElementById(playBtnId);
    const stopBtn = document.getElementById(stopBtnId);

    if (data.audio) {
      playBtn.style.display = "inline-block";
      stopBtn.style.display = "inline-block";
    } else {
      playBtn.style.display = "none";
      stopBtn.style.display = "none";
    }
  }

  // ---------------- ОТКРЫТИЕ ВОПРОСА ----------------

  function openQuestion(category, value, cell) {
    currentQuestion = questions[category][value];
    currentCell = cell;

    document.getElementById("question-category").textContent = category;
    document.getElementById("question-value").textContent = value;

    renderContent(currentQuestion.question, "question-text", "play-music-question", "stop-music-question");
    stopAudio();
    stopVideo(answerVideo, answerVideoWrapper);
    setupVideo(currentQuestion.question, questionVideo, questionVideoWrapper);

    showScreen(questionScreen);
  }

  // ---------------- ДОСКА ----------------

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

  // ---------------- ОТВЕТ ----------------

  document.getElementById("show-answer").onclick = () => {
    if (!currentQuestion) return;

    renderContent(currentQuestion.answer, "answer-text", "play-music-answer", "stop-music-answer");

    stopAudio();
    stopVideo(questionVideo, questionVideoWrapper);
    setupVideo(currentQuestion.answer, answerVideo, answerVideoWrapper);

    showScreen(answerScreen);
  };

  // ---------------- НАЗАД ----------------

  document.getElementById("back-to-board").onclick = () => {
    if (currentCell) {
      currentCell.classList.add("used");
      currentCell.onclick = null;
    }

    stopAudio();
    stopVideo(questionVideo, questionVideoWrapper);
    stopVideo(answerVideo, answerVideoWrapper);

    showScreen(boardScreen);
  };

  // ---------------- КНОПКИ МУЗЫКИ ----------------

  document.getElementById("play-music-question").onclick = () => {
    if (currentQuestion?.question?.audio) playAudio(currentQuestion.question.audio);
  };

  document.getElementById("play-music-answer").onclick = () => {
    if (currentQuestion?.answer?.audio) playAudio(currentQuestion.answer.audio);
  };

  document.getElementById("stop-music-question").onclick = stopAudio;
  document.getElementById("stop-music-answer").onclick = stopAudio;

});
