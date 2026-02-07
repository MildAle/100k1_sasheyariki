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
        question: {
          text: "В репертуаре Саши и Ярика есть много одинаковых ролей...\nЧто это за роль?"
        },
        answer: {
          text: "Ромео",
          image: "pics/answer1_100.png"
        }
      },
      200: {
        question: {
          text: "Расставьте исполнения мюзикла «Тетрадь смерти» в хронологическом порядке",
          image: "pics/question1_200.png"
        },
        answer: {
          image: "pics/answer1_200.png"
        }
      },
      300: {
        question: {
          text: "Недавно среди персонажей Ярика появился тот...\nЧто это за персонажи?"
        },
        answer: {
          image: "pics/answer1_300.png"
        }
      },
      400: {
        question: {
          text: "По признанию Саши, он поёт эту арию именно в ТАКОЙ версии.\nЧто за версия?"
        },
        answer: {
          video: "video/answer1_400.mp4"
        }
      },
      500: {
        question: {
          text: "Их роднит ремесло, которым они зарабатывают на жизнь.\nЧто это?"
        },
        answer: {
          image: "pics/answer1_500.png"
        }
      }
    },

    "Угадай мелодию": {
      100: {
        question: { text: "Запустите мелодию", audio: "music/question2_100.mp3" },
        answer: { audio: "music/answer2_100.mp3" }
      },
      200: {
        question: { text: "Запустите мелодию", audio: "music/question2_200.mp3" },
        answer: { audio: "music/answer2_200.mp3" }
      },
      300: {
        question: { text: "Запустите мелодию", audio: "music/question2_300.mp3" },
        answer: { audio: "music/answer2_300.mp3" }
      },
      400: {
        question: { text: "Запустите мелодию", audio: "music/question2_400.mp3" },
        answer: { audio: "music/answer2_400.mp3" }
      },
      500: {
        question: { text: "Запустите мелодию", audio: "music/question2_500.mp3" },
        answer: { video: "video/answer2_500.mp4" }
      }
    },

    "Нет слов, одни эмодзи": {
      100: {
        question: {
          hints: ["pics/question3_100_0.PNG", "pics/question3_100_1.png", "pics/question3_100_2.png"]
        },
        answer: {
          text: "Томас Кинг и Джош Кросс из Детективной саги​",
          image: "pics/answer3_100.png"
        }
      },
      200: {
        question: {
          hints: ["pics/question3_200_0.PNG", "pics/question3_200_1.png", "pics/question3_200_2.png"]
        },
        answer: {
          text: "Саша и Ярик (наше всё)​​",
          image: "pics/answer3_200.png"
        }
      },
      300: {
        question: {
          hints: ["pics/question3_300_0.PNG", "pics/question3_300_1.png", "pics/question3_300_2.png"]
        },
        answer: {
          text: "Бродяга и Брут из мюзикла «Икар»​​​",
          image: "pics/answer3_300.png"
        }
      },
      400: {
        question: {
          hints: ["pics/question3_400_0.PNG", "pics/question3_400_1.png", "pics/question3_400_2.png"]
        },
        answer: {
          text: "L и Лайт из мюзикла «Тетрадь смерти»​​​​",
          image: "pics/answer3_400.png"
        }
      },
      500: {
        question: {
          hints: ["pics/question3_500_0.PNG", "pics/question3_500_1.png", "pics/question3_500_2.png"]
        },
        answer: {
          text: "Бенедетто и Альбер из мюзикла «Монте Кристо»​​",
          image: "pics/answer3_500.png"
        }
      }
    },

    "В прямом эфире": {
      100: {
        question: { text: "Саша: Нахрен! Я не пущу его! Не-е-ет! Нет, нет, пожалуйста! Блять! Простите за мат. Можно я сматерюсь? Ну это пиздец.​\nЯрик: *смеётся*\nПочему Саша так отчаянно не хотел пускать Ярика на стрим?​" },
        answer: { text: "Ярик пришёл на стрим в образе тёмного эльфа (дроу)​", image: "pics/answer4_100.png" }
      },
      200: {
        question: { text: "Во время исполнения «Куклы колдуна» на стриме зародилась кулинарная адаптация песни:​\nЯрик: А это всё _________!​\nСаша: Дай их мне!​\nЯрик: Возьми один! Другой лишь мне!​\nСаша: Укушу я этот ____ и не подавлюсь!​\n\nЧто за блюдо послужило вдохновением?​" },
        answer: { text: "А это всё блины, блины с творожком!​", image: "pics/answer4_200.png" }
      },
      300: {
        question: { text: "Саша: А на всякий случай где взять пьесу?​\nЯрик: О-о-о, давай по памяти! Давай!​\n\nКакую песню они исполнили после этого диалога?​" },
        answer: { text: "Дуэт «Середина» из мюзикла «Икар» (в котором Саша безбожно и мемно переврал слова)​​", image: "pics/answer4_300.png" }
      },
      400: {
        question: { text: "Ярик: Ты – мой гость, я тебе наложу (еды).​\nСаша: Блин, он с каждым словом закапывает нас всё глубже.​\nЯрик: Не, если ты хочешь равноправия в наших отношениях, то я тебя накормлю и отвезу до вокзала – на переднем сиденье, ты понял?\nДорога к ______ – это вот то, что ты сегодня сюда приехал. Ладно, все хорошие шутки ​на канале Гумбы, все шутки за 300 сегодня здесь.​\n\nК кому же вела Сашу дорога приключений? Это создание упоминалось в припеве одной популярной арии в его исполнении и требовало некоторой… Разборчивости.​" },
        answer: { text: "Ярик заработал ачивку «Дорога к богине». Саша видимо тоже.​", image: "pics/answer4_400.png" }
      },
      500: {
        question: { text: "Саша: А! Ещё из музыкальных групп я очень люблю La GazettE! Прям да, прям вообще. Я мечтаю взять вас и спеть что-то вроде «Filth in the beauty» на концерте! Можно Даню взять на гроул например, тебя – _______... Шутка, шутка, подожди, мне нужно найти ручку, Ярик, очень много зомби, не отвлекайся! *коварный хехек*\nЯрик: Где много зомби? Я вообще не вижу ни одного.\n\n​Куда же Саша вознамерился взять Ярика ​(и потом старательно перевёл его внимание на другие вещи)?​​" },
        answer: { text: "На женский вокал. Но хорошо смеётся тот, кто смеётся последний.​​", image: "pics/answer4_500.png" }
      }
    },

    "Чёрный квадрат": {
      100: {
        question: { image: "pics/question5_100.png" },
        answer: { text: "Ярик в ушках", image: "pics/answer5_100.png" }
      },
      200: {
        question: { image: "pics/question5_200.png" },
        answer: { text: "В продуктовой корзинке Саши энное количество килограмм отменного Ярика​", image: "pics/answer5_200.png" }
      },
      300: {
        question: { image: "pics/question5_300.png" },
        answer: { text: "Неприличный жест в адрес «хозяина» Казьмина​", image: "pics/answer5_300.png" }
      },
      400: {
        question: { image: "pics/question5_400.png" },
        answer: { text: "Саша пытается подложить Ярику пачку сгущёнки​", image: "pics/answer5_400.png" }
      },
      500: {
        question: { image: "pics/question5_500.png" },
        answer: { text: "Ошейник с поводком (Бродяга не одобряет)​", image: "pics/answer5_500.png" }
      }
    },

    "Эй, подруга, что с лицом?": {
      100: {
        question: { image: "pics/question6_100.png" },
        answer: { text: "Просто смотрит на Ярика на его первом сольном концерте", image: "pics/answer6_100.png" }
      },
      200: {
        question: { image: "pics/question6_200.png" },
        answer: { text: "Подкат Саши на песне «Океан и три реки»​​", image: "pics/answer6_200.png" }
      },
      300: {
        question: { image: "pics/question6_300.png" },
        answer: { text: "Лапки Ярика на песне «Прыгну со скалы»​​", image: "pics/answer6_300.png" }
      },
      400: {
        question: { image: "pics/question6_400.png" },
        answer: { text: "Сашина переделка арии Ленского «Olga will you weep for me»​​", image: "pics/answer6_400.png" }
      },
      500: {
        question: { image: "pics/question6_500.png", text: "Кот в мешке!\nНазвание данной рубрики «Эй, подруга, что с лицом?» является строчкой известной песни из двухтысячных. \nЧто это за песня?​\nБонусный вопрос: на каком концерте её исполняли Саша и Ярик?​", audio: "music/question6_500.mp3" },
        answer: { text: "Песня группы «Звери» – «Рома, извини». Первый Сашин сольный концерт.​​", video: "video/answer6_500.mp4" }
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
  let currentHintIndex = 0;


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

    playIcon.style.display = "block";

    video.onplay = () => playIcon.style.display = "none";
    video.onpause = () => playIcon.style.display = "block";

    container.onclick = () => {
      video.paused ? video.play() : video.pause();
    };
  }

  // ---------------- ЭКРАНЫ ----------------

  function showScreen(screen) {
    [boardScreen, questionScreen, answerScreen].forEach(s =>
      s.classList.remove("active")
    );
    screen.classList.add("active");
  }
  // ---------------- ПОДСКАЗКИ ----------------
  function renderHint(container, hints) {
    container.innerHTML = "";

    const img = document.createElement("img");
    img.src = hints[currentHintIndex];
    container.appendChild(img);

    if (currentHintIndex < hints.length - 1) {
      const btn = document.createElement("button");
      btn.textContent = "Показать следующую подсказку";
      btn.onclick = () => {
        currentHintIndex++;
        renderHint(container, hints);
      };
      container.appendChild(btn);
    }
  }


  // ---------------- РЕНДЕР ----------------

  function renderContent(data, containerId, playBtnId, stopBtnId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (data.hints) {
      currentHintIndex = 0;
      renderHint(container, data.hints);
      return;
    }


    if (data.text) {
      const div = document.createElement("div");
      div.textContent = data.text;
      container.appendChild(div);
    }

    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      container.appendChild(img);
    }

    const playBtn = document.getElementById(playBtnId);
    const stopBtn = document.getElementById(stopBtnId);

    if (data.audio) {
      playBtn.style.display = stopBtn.style.display = "inline-block";
    } else {
      playBtn.style.display = stopBtn.style.display = "none";
    }
  }

  // ---------------- ВОПРОС ----------------

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

  // ---------------- ОТВЕТ ----------------

  function showAnswer() {
    renderContent(currentQuestion.answer, "answer-text", "play-music-answer", "stop-music-answer");

    stopAudio();
    stopVideo(questionVideo, questionVideoWrapper);
    setupVideo(currentQuestion.answer, answerVideo, answerVideoWrapper);

    showScreen(answerScreen);
  }

  document.getElementById("show-answer").onclick = showAnswer;

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

  // ---------------- НАЗАД ----------------

  document.getElementById("back-to-board").onclick = () => {
    currentCell?.classList.add("used");
    currentCell.onclick = null;

    stopAudio();
    stopVideo(questionVideo, questionVideoWrapper);
    stopVideo(answerVideo, answerVideoWrapper);

    showScreen(boardScreen);
  };

  // ---------------- КНОПКИ МУЗЫКИ ----------------

  document.getElementById("play-music-question").onclick = () => {
    playAudio(currentQuestion?.question?.audio);
  };

  document.getElementById("play-music-answer").onclick = () => {
    playAudio(currentQuestion?.answer?.audio);
  };

  document.getElementById("stop-music-question").onclick = stopAudio;
  document.getElementById("stop-music-answer").onclick = stopAudio;

  // ---------------- HELP POPUP ----------------

  const helpImages = [
    "pics/help1.png",
    "pics/help2.png"
  ];

  let helpIndex = 0;

  const helpPopup = document.getElementById("help-popup");
  const helpImage = document.getElementById("help-image");
  const helpPrev = document.getElementById("help-prev");
  const helpNext = document.getElementById("help-next");

  function updateHelpView() {
    helpImage.src = helpImages[helpIndex];

    // первая картинка — только вперёд
    if (helpIndex === 0) {
      helpPrev.style.display = "none";
      helpNext.style.display = "block";
    }
    // последняя картинка — только назад
    else if (helpIndex === helpImages.length - 1) {
      helpPrev.style.display = "block";
      helpNext.style.display = "none";
    }
  }

  document.getElementById("help-button").onclick = () => {
    helpIndex = 0;
    updateHelpView();
    helpPopup.classList.remove("hidden");
  };

  helpNext.onclick = () => {
    if (helpIndex < helpImages.length - 1) {
      helpIndex++;
      updateHelpView();
    }
  };

  helpPrev.onclick = () => {
    if (helpIndex > 0) {
      helpIndex--;
      updateHelpView();
    }
  };

  document.getElementById("close-popup").onclick = () => {
    helpPopup.classList.add("hidden");
  };




});
