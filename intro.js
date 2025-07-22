document.addEventListener("DOMContentLoaded", () => {
  // Kolla om intro redan har visats
  if (sessionStorage.getItem("introPlayed")) return;

  // Spela ljud
  const glitchAudio = new Audio("sounds/glitch.mp3");
  glitchAudio.volume = 0.4;
  glitchAudio.play().catch(() => {});

  // Skapa intro-element
  const introScreen = document.createElement("div");
  introScreen.id = "intro-screen";
  introScreen.innerHTML = `<div id="intro-text"></div>`;
  document.body.appendChild(introScreen);

  const messages = [
    "Initializing...",
    "Loading assets...",
    "Establishing connection...",
    "Welcome to Zypheriq Studio."
  ];

  const introText = document.getElementById("intro-text");
  let index = 0;

  function typeLine(lineIndex) {
    if (lineIndex >= messages.length) {
      setTimeout(() => {
        introScreen.classList.add("fade-out");
        setTimeout(() => {
          introScreen.remove();
          document.body.classList.remove("no-scroll");
        }, 1000);
      }, 1000);
      return;
    }

    let charIndex = 0;
    const currentLine = messages[lineIndex];
    const lineElem = document.createElement("p");
    introText.appendChild(lineElem);

    function typeChar() {
      if (charIndex < currentLine.length) {
        lineElem.textContent += currentLine.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 40);
      } else {
        setTimeout(() => typeLine(lineIndex + 1), 500);
      }
    }

    typeChar();
  }

  document.body.classList.add("no-scroll");
  sessionStorage.setItem("introPlayed", "true"); // Spara att intro har spelats
  typeLine(0);
});