// Define colors object
const colors = {
  red: { light: "#ffcccc", dark: "#cc0000" },
  yellow: { light: "#ffffcc", dark: "#cccc00" },
  green: { light: "#ccffcc", dark: "#00cc00" },
  blue: { light: "#ccccff", dark: "#0000cc" },
  purple: { light: "#ffccff", dark: "#cc00cc" },
  brown: { light: "#d2b48c", dark: "#8b4513" },
  black: { light: "#c0c0c0", dark: "#808080" },
  pink: { light: "#DE3163", dark: "#FFB6C1" },
};

// Define light and dark colors
const lightColor = "#f2f2f2";
const darkColor = "#333";

// Load settings from local storage
const loadSettings = () => {
  const savedBoardColor = localStorage.getItem("boardColor");
  const savedVolume = localStorage.getItem("volume");

  // Set board color
  if (savedBoardColor) {
    const color = colors[savedBoardColor];
    document.documentElement.style.setProperty("--light-color", color.light);
    document.documentElement.style.setProperty("--dark-color", color.dark);
  } else {
    document.documentElement.style.setProperty("--light-color", lightColor);
    document.documentElement.style.setProperty("--dark-color", darkColor);
  }



  // Set volume
  if (savedVolume) {
    document.querySelector("audio").volume = savedVolume;
  } else {
    document.querySelector("audio").volume = 1.0;
  }
};

// Show menu
const showMenu = () => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="container">
      <div class="box">
        <h1 onclick="showCredits()">Chess</h1>
        <img onclick="showCredits()" class="logo" src="./lib/imgs/appIcon/chess.png" alt="logo" />
        <div class="container">
          <div class="menu" onclick="showSelectLevel('aivsplayer')">
            <img src="./lib/imgs/menuIcon/versusAI.png" alt="aivsplayer">
            <div>Player Vs AI</div>
          </div>
          <div class="menu" onclick="startGame('playervsplayer')">
            <img src="./lib/imgs/menuIcon/versusPlayer.png" alt="playerVsplayer">
            <div>Player Vs Player</div>
          </div>
          <div class="menu" onclick="showSettings()">
            <img src="./lib/imgs/menuIcon/settings.png" alt="settings">
            <div>Settings</div>
          </div>
          <div class="menu" onclick="window.close();">
            <img src="./lib/imgs/menuIcon/exit.png" alt="exit">
            <div>Exit</div>
          </div>
        </div>
        <div id="version">
          <p>Version 0.0.5</p>
        </div>
      </div>
    </div>
  `;
};

// Show select level
const showSelectLevel = (mode) => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="box">
      <h1>Select Level</h1>
      <div class="container">
        <div class="menu" onclick="startGame('${mode}', 1)">
          <div>Very Easy</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 2)">
          <div>Easy</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 3)">
          <div>Normal</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 4)">
          <div>Hard</div>
        </div>
        <div class="menu" onclick="showMenu()">
          <div>Back</div>
        </div>
      </div>
    </div>
  `;
};

// Show settings
const showSettings = () => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="box">
      <h1>Settings</h1>
      <div class="color-container">
        <label for="boardColor">Change Board Color:</label>
        <select id="boardColor">
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="brown">Brown</option>
          <option value="black">Black</option>
          <option value="pink">Pink</option>
        </select>
      </div>
      <div class="slider-container">
        <label for="volume">Change Volume:</label>
        <input type="range" id="volume" class="slider" min="0" max="1" step="0.1" value="0.5">
      </div>

      <div class="menu" onclick="showMenu()">
        <div>Back</div>
      </div>
    </div>
  `;

  const volumeSlider = document.querySelector("#volume");
  const boardColorSelect = document.querySelector("#boardColor");
  const audio = document.querySelector("audio");

  // Set saved settings
  volumeSlider.value = localStorage.getItem("volume") || 0.5;
  boardColorSelect.value = localStorage.getItem("boardColor") || "black";

  // Add event listeners to settings
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    localStorage.setItem("volume", volumeSlider.value);
  });

  boardColorSelect.addEventListener("change", () => {
    const color = colors[boardColorSelect.value];
    document.documentElement.style.setProperty("--light-color", color.light);
    document.documentElement.style.setProperty("--dark-color", color.dark);
    localStorage.setItem("boardColor", boardColorSelect.value);
  });

  boardColorSelect.dispatchEvent(new Event("change"));
};

// Set background
const background = document.querySelector('.background');
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  background.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
});

// Load settings on window load
window.addEventListener("load", loadSettings);

// Show credits
function showCredits() {
  $(".credits").fadeIn();
  $(".credits").removeClass("hidden");

  $(".credits").css("position", "absolute");
  $(".credits").css("z-index", "999");

  const width = $(".credits").width();
  const height = $(".credits").height();
  const left = $(window).width() / 2 - width / 2;
  const top = $(window).height() / 2 - height / 2;

  $(".credits").css("left", left + "px");
  $(".credits").css("top", top + "px");
}

// Add audio effects to menu
let hoverAudio = new Audio("./lib/audio/hover-menu.mp3");
$(document).on("mouseenter", ".menu", function () {
  hoverAudio.pause();
  hoverAudio.currentTime = 0;
  hoverAudio.play();
});

let clickAudio = new Audio("./lib/audio/click-menu.mp3");
$(document).on("click", ".menu", function () {
  clickAudio.pause();
  clickAudio.currentTime = 0;
  clickAudio.play();
});