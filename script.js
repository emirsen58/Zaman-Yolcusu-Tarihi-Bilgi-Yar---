const eras = [
  {
    title: "🏺 Antik Mısır",
    type: "quiz",
    question: "Mısır piramitlerini kimler inşa etti?",
    options: ["Uzaylılar", "Firavun işçileri", "Romalılar", "Hititler"],
    answer: 1
  },
  {
    title: "🦕 Taş Devri",
    type: "reflex",
    description: "Dinozor saldırısından kaçmak için hemen bas!",
    timeout: 1500
  },
  {
    title: "🤖 Gelecek 2100",
    type: "memory",
    sequence: ["🔴", "🟢", "🔵", "🟡"]
  },
  {
    title: "⚔️ Orta Çağ",
    type: "quiz",
    question: "Orta Çağ'da şövalyelerin ana görevi neydi?",
    options: ["Ticaret yapmak", "Savaşmak ve korumak", "Tarım yapmak", "Sanat yapmak"],
    answer: 1
  },
  {
    title: "🧩 Bulmaca Zamanı",
    type: "puzzle",
    description: "Doğru sırayla sayıları tıkla: 1, 2, 3, 4",
    sequence: [1, 2, 3, 4]
  },
  {
    title: "🌍 Rönesans",
    type: "quiz",
    question: "Rönesans dönemi hangi yüzyılda başladı?",
    options: ["14. yüzyıl", "15. yüzyıl", "16. yüzyıl", "17. yüzyıl"],
    answer: 1
  },
  {
    title: "🚀 Uzay Çağı",
    type: "quiz",
    question: "İlk insanlı uzay uçuşu hangi yıl gerçekleşti?",
    options: ["1957", "1961", "1969", "1972"],
    answer: 1
  },
  {
    title: "🏛️ Antik Yunan",
    type: "quiz",
    question: "Antik Yunan'da demokrasi hangi şehir devletinde doğdu?",
    options: ["Atina", "Sparta", "Korint", "Delphi"],
    answer: 0
  },
  {
    title: "⚡ Sanayi Devrimi",
    type: "quiz",
    question: "Sanayi Devrimi hangi ülkede başladı?",
    options: ["Fransa", "İngiltere", "Almanya", "ABD"],
    answer: 1
  },
  {
    title: "🛡️ Vikingler",
    type: "quiz",
    question: "Vikingler hangi bölgeden geliyordu?",
    options: ["İskandinavya", "Alpler", "Pirene Dağları", "Kafkaslar"],
    answer: 0
  },
  {
    title: "🕰️ Sanat Tarihi",
    type: "quiz",
    question: "Mona Lisa tablosu hangi sanatçıya aittir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    answer: 1
  },
  {
    title: "🌌 Kozmoloji",
    type: "quiz",
    question: "Evrenin genişlediğini kim keşfetti?",
    options: ["Albert Einstein", "Edwin Hubble", "Isaac Newton", "Galileo Galilei"],
    answer: 1
  },
  {
    title: "🏰 Orta Çağ Şövalyeleri",
    type: "quiz",
    question: "Şövalyelerin kullandığı zırhın adı nedir?",
    options: ["Kalkan", "Miğfer", "Zırh", "Kılıç"],
    answer: 2
  }
];

let currentEra = 0;
let score = 0;
let username = '';
let reflexTimeout;
let showTime;

function startGame() {
  const inputName = document.getElementById("username").value.trim();
  if (!inputName) {
    alert("Lütfen isminizi girin.");
    return;
  }
  username = inputName;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  currentEra = 0;
  score = 0;
  showEra();
}

function showEra() {
  const era = eras[currentEra];
  const title = document.getElementById("eraTitle");
  const area = document.getElementById("questionArea");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextButton");

  title.textContent = "⏳ " + era.title;
  area.innerHTML = "";
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  document.body.classList.add("fade");
  setTimeout(() => {
    document.body.classList.remove("fade");
  }, 300);

  if (era.type === "quiz") {
    const q = document.createElement("p");
    q.textContent = era.question;
    area.appendChild(q);
    era.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        if (i === era.answer) {
          score += 10;
          feedback.textContent = "✅ Doğru!";
          nextBtn.classList.remove("hidden");
        } else {
          feedback.textContent = "❌ Yanlış! Oyun bitti.";
          endGame();
        }
      };
      area.appendChild(btn);
    });
  }

  else if (era.type === "reflex") {
    const msg = document.createElement("p");
    msg.textContent = "Hazırlan...";
    area.appendChild(msg);

    setTimeout(() => {
      msg.textContent = era.description;
      const btn = document.createElement("button");
      btn.textContent = "Kaç!";
      showTime = Date.now();
      btn.onclick = () => {
        const reaction = Date.now() - showTime;
        if (reaction <= era.timeout) {
          feedback.textContent = `⚡ Hızlı tepki! (${reaction}ms)`;
          score += 10;
        } else {
          feedback.textContent = `😵 Çok yavaş! (${reaction}ms)`;
        }
        nextBtn.classList.remove("hidden");
      };
      area.appendChild(btn);
    }, Math.random() * 2000 + 1000);
  }

  else if (era.type === "memory") {
    const seq = era.sequence;
    const show = document.createElement("div");
    area.appendChild(show);

    let index = 0;
    const interval = setInterval(() => {
      show.textContent = seq[index];
      index++;
      if (index >= seq.length) {
        clearInterval(interval);
        show.textContent = "Şimdi sırayla tıkla:";
        const inputArea = document.createElement("div");
        inputArea.id = "memoryInputs";
        area.appendChild(inputArea);
        let userSeq = [];
        seq.forEach(emoji => {
          const btn = document.createElement("button");
          btn.textContent = emoji;
          btn.onclick = () => {
            userSeq.push(emoji);
            if (userSeq.length === seq.length) {
              const correct = seq.every((e, i) => e === userSeq[i]);
              if (correct) {
                feedback.textContent = "🧠 Harika hafıza!";
                score += 10;
              } else {
                feedback.textContent = "😓 Yanlış sırayla yaptın.";
              }
              nextBtn.classList.remove("hidden");
            }
          };
          inputArea.appendChild(btn);
        });
      }
    }, 800);
  }

  else if (era.type === "puzzle") {
    const seq = era.sequence;
    const inputArea = document.createElement("div");
    inputArea.id = "puzzleInputs";
    area.appendChild(inputArea);
    let userSeq = [];
    seq.forEach(num => {
      const btn = document.createElement("button");
      btn.textContent = num;
      btn.onclick = () => {
        userSeq.push(num);
        if (userSeq.length === seq.length) {
          const correct = seq.every((e, i) => e === userSeq[i]);
          if (correct) {
            feedback.textContent = "🎉 Doğru sırayla tıkladın!";
            score += 10;
          } else {
            feedback.textContent = "😓 Yanlış sırayla tıkladın.";
          }
          nextBtn.classList.remove("hidden");
        }
      };
      inputArea.appendChild(btn);
    });
  }
}

function nextStage() {
  currentEra++;
  if (currentEra < eras.length) {
    showEra();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById("game").innerHTML = `
    <h2>🎉 Oyun Bitti!</h2>
    <p>${username}, Skorun: ${score}</p>
    <button onclick="restart()">🔁 Tekrar Oyna</button>
  `;
  const high = localStorage.getItem("highScore") || 0;
  if (score > high) {
    localStorage.setItem("highScore", score);
    alert("🔥 Yeni rekor!");
  }
  document.getElementById("highScore").textContent = Math.max(score, high);
}

function restart() {
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  const high = localStorage.getItem("highScore") || 0;
  document.getElementById("highScore").textContent = high;
});
