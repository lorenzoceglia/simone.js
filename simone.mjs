import path from "node:path";
import robot from "@jitsi/robotjs";
import { BrowserWindow, app } from "electron";

/**
 * Contains the browser window
 * @see https://www.electronjs.org/docs/latest/api/browser-window
 * @type {BrowserWindow}
 */
let overlayWindow;
let lastMousePosition = robot.getMousePos();
/**
 * @type {ReturnType<typeof setTimeout>}
 */
let timer;

const interval = 1000 * 60; // 60 secondi

function createOverlay() {
  overlayWindow = new BrowserWindow({
    width: 230,
    height: 250,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: 200,
    y: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  overlayWindow.loadFile(path.join(process.cwd(), "overlay.html"));
  overlayWindow.setResizable(false);
}

function moveMouseRandomly() {
  const screenSize = robot.getScreenSize();
  const x = Math.floor(Math.random() * screenSize.width);
  const y = Math.floor(Math.random() * screenSize.height);

  robot.moveMouse(x, y);
  console.log(`Mouse automatically moved to: (${x}, ${y})`);
}

function checkMouseActivity() {
  const currentMousePosition = robot.getMousePos();

  if (
    currentMousePosition.x !== lastMousePosition.x ||
    currentMousePosition.y !== lastMousePosition.y
  ) {
    console.log("Mouse movement detected! Timer reset.");
    lastMousePosition = currentMousePosition;

    if (timer) clearTimeout(timer);
    timer = setTimeout(moveMouseRandomly, interval);
  }
}

app.on("ready", () => {
  console.log("Simone.js Mouse Mover v.1.1");
  console.log(
    `Script started! Timer set to ${
      interval / 1000
    } seconds. Press CTRL+C to stop.`
  );
  createOverlay();

  setInterval(checkMouseActivity, 1000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
