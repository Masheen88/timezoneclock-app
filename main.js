import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// Construct __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 400, // Initial width
    height: 300, // Initial height
    frame: false, // This removes the default window frame
    resizable: true, // Makes the window resizable
    transparent: true, // Makes the background transparent
    alwaysOnTop: true, // Keeps the window on top of others
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // Enable context isolation
      nodeIntegration: false, // Disable nodeIntegration
    },
  });

  win.loadFile("dist/index.html"); // Load the built React app

  // Resize the window to fit content after it finishes loading
  win.webContents.on("did-finish-load", () => {
    win.webContents
      .executeJavaScript(
        `
      new Promise((resolve) => {
        const height = document.body.scrollHeight;
        const width = document.body.scrollWidth;
        resolve({ width, height });
      });
    `
      )
      .then((size) => {
        const { width, height } = size;
        win.setContentSize(width, height);
      });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
