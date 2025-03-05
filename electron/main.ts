import { app, BrowserWindow, dialog} from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { autoUpdater } from "electron-updater";
import path from 'node:path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let mainWindow: BrowserWindow | null = null;

// Create the main application window
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1200,
    height: 800,
    show: true, // Show the main window immediately
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false, // Keep security best practices
      contextIsolation: true,
      //webSecurity: false,
    },
  });

  // Maximize the window
  mainWindow.maximize();

  // Show the window once it's ready
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });

  // Test active push message to Renderer-process.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// App lifecycle
app.whenReady().then(() => {
  // Create the main window
  createMainWindow();

   // ✅ Check for updates when the app starts
   autoUpdater.checkForUpdatesAndNotify();
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create the main window if the app is activated and no windows are open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// ✅ Auto-Updater Events
autoUpdater.on('update-available', () => {
  if (mainWindow) {
    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Update Available",
      message: "A new version of Wagewise is available. It will be downloaded in the background.",
      buttons: ["OK"]
    });
  }
});

autoUpdater.on('update-downloaded', () => {
  if (mainWindow) {
    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Update Ready",
      message: "The update has been downloaded. Restart Wagewise to apply the update.",
      buttons: ["Restart Now", "Later"]
    }).then(result => {
      if (result.response === 0) { // Restart Now
        autoUpdater.quitAndInstall();
      }
    });
  }
});

autoUpdater.on('error', (error) => {
  console.error("Update Error:", error);
});