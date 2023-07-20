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

const lightColor = "#f2f2f2";
const darkColor = "#333";

const loadSettings = () => {
  const savedBoardColor = localStorage.getItem("boardColor");
  const savedDarkMode = localStorage.getItem("darkMode");
  const savedVolume = localStorage.getItem("volume");

  if (savedBoardColor) {
    const color = colors[savedBoardColor];
    document.documentElement.style.setProperty("--light-color", color.light);
    document.documentElement.style.setProperty("--dark-color", color.dark);
  } else {
    document.documentElement.style.setProperty("--light-color", "#f2f2f2");
    document.documentElement.style.setProperty("--dark-color", "#333");
  }

  if (savedDarkMode) {
    document.body.style.backgroundColor =
      savedDarkMode === "true" ? darkColor : lightColor;
  } else {
    document.body.style.backgroundColor = lightColor;
  }

  if (savedVolume) {
    document.querySelector("audio").volume = savedVolume;
  } else {
    document.querySelector("audio").volume = 1.0;
  }
};

const showMenu = () => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="box">
      <h1 onclick="showCredits()">Chess</h1>
      <img onclick="showCredits()" class="logo" src="./lib/imgs/appIcon/chess.png" alt="logo" />
      <div class="container">
        <div class="menu" onclick="startGame('aivsplayer')">
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
        <div class="menu" onclick="window.close()">
          <img src="./lib/imgs/menuIcon/exit.png" alt="exit">
          <div>Exit</div>
        </div>
      </div>
      <div id="version">
        <p>Version 0.0.5</p>
      </div>
    </div>

    `;
};

const showSelectLevel = (mode) => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="box">
      <h1>Select Level</h1>
      <div class="container">
        <div class="menu" onclick="startGame('${mode}', 1)">
          <div>Level 1</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 2)">
          <div>Level 2</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 3)">
          <div>Level 3</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 4)">
          <div>Level 4</div>
        </div>
        <div class="menu" onclick="startGame('${mode}', 5)">
          <div>Level 5</div>
        </div>
        <div class="menu" onclick="showMenu()">
          <div>Back</div>
        </div>
      </div>
    </div>
    `;
    console.log(mode);
};

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
        <div class="toggle-container">
          <label for="darkMode">Dark Mode:</label>
          <input type="checkbox" id="darkMode" class="toggle">
        </div>
        <div class="menu" onclick="showMenu()">
          <div>Back</div>
        </div>
      </div>
    `;

  const darkModeToggle = document.querySelector("#darkMode");
  const volumeSlider = document.querySelector("#volume");
  const boardColorSelect = document.querySelector("#boardColor");
  const audio = document.querySelector("audio");

  darkModeToggle.checked = localStorage.getItem("darkMode") === "true";
  volumeSlider.value = localStorage.getItem("volume") || 0.5;
  boardColorSelect.value = localStorage.getItem("boardColor") || "black";

  darkModeToggle.addEventListener("change", () => {
    document.body.style.backgroundColor = darkModeToggle.checked
      ? darkColor
      : lightColor;
    localStorage.setItem("darkMode", darkModeToggle.checked);
  });

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

const audio = document.querySelector("audio");

window.addEventListener("load", loadSettings);
