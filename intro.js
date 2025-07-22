document.addEventListener("DOMContentLoaded", () => {
  // Skippa om intro redan körts
  if (sessionStorage.getItem("introPlayed")) return;

  // Lägg till canvas + textcontainer + mute-knapp
  const canvas = document.createElement("canvas");
  canvas.id = "matrix";
  document.body.appendChild(canvas);

  const term = document.createElement("div");
  term.id = "terminal";
  document.body.appendChild(term);

  const muteBtn = document.createElement("button");
  muteBtn.id = "muteBtn";
  muteBtn.textContent = "🔇";
  document.body.appendChild(muteBtn);

  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const chars = "アかサたナはマヤラワ0123456789ABCDEF";
  const fontSize = 16;
  const cols = Math.floor(w / fontSize);
  const drops = Array(cols).fill(0);

  function draw() {
    ctx.fillStyle = "rgba(10,10,10,0.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, i) => {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);
      if (y * fontSize > h && Math.random() > 0.975) drops[i] = 0;
      else drops[i]++;
    });
    requestAnimationFrame(draw);
  }
  draw();

  const messages = [
    "Initializing secure uplink...",
    "Breaching firewall...",
    "Bypassing encryption...",
    "Access granted.",
  ];
  const termTxt = document.getElementById("terminal");
  let mI = 0, cI = 0;

  const glitchAudio = new Audio("sounds/hack-glitch.mp3");
  glitchAudio.volume = 0.5;
  glitchAudio.loop = true;
  glitchAudio.play().catch(() => {});

  muteBtn.onclick = () => {
    glitchAudio.muted = !glitchAudio.muted;
    muteBtn.textContent = glitchAudio.muted ? "🔇" : "🔊";
  };

  function typeLine() {
    if (mI >= messages.length) {
      endIntro();
      return;
    }
    const line = messages[mI];
    if (cI < line.length) {
      termTxt.textContent += line.charAt(cI);
      cI++;
      setTimeout(typeLine, 40);
    } else {
      termTxt.appendChild(document.createElement("br"));
      mI++; cI = 0;
      setTimeout(typeLine, 600);
    }
  }

  function endIntro() {
    glitchAudio.pause();
    setTimeout(() => {
      document.body.removeChild(canvas);
      document.body.removeChild(term);
      document.body.removeChild(muteBtn);
      document.body.classList.remove("no-scroll");
    }, 800);
    sessionStorage.setItem("introPlayed", "true");
  }

  document.body.classList.add("no-scroll");
  typeLine();
});