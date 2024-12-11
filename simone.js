const { app, BrowserWindow } = require("electron");
const path = require("path");
const robot = require("@jitsi/robotjs");

let overlayWindow;
let lastMousePosition = robot.getMousePos();
let timer;

const interval = 60000; // 60 secondi

function createOverlay() {
    overlayWindow = new BrowserWindow({
        width: 300,
        height: 200,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        x: 100,
        y: 100,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    overlayWindow.loadFile(path.join(__dirname, "overlay.html"));
    overlayWindow.setIgnoreMouseEvents(true);
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
    console.log("Simone.js Mouse Mover v.10.");
    console.log("Script started! Timer set to 60 seconds. Press CTRL+C to stop.");
    createOverlay();

    setInterval(checkMouseActivity, 1000);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
