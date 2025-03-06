import { app, BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

// ✅ Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ Main process started');
console.log('__dirname:', __dirname);

let mainWindow: BrowserWindow | null = null;

const isDev = !app.isPackaged;
const appPath = isDev ? __dirname : process.resourcesPath;
const rendererDist = isDev
  ? path.join(__dirname, '..', 'dist') // Dev mode
  : path.join(appPath, 'dist'); // Production mode

console.log('📂 App path:', appPath);
console.log('📂 Renderer dist path:', rendererDist);

/**
 * Create the main application window.
 */
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(appPath, 'public', 'electron-vite.svg'),
    width: 1200,
    height: 800,
    show: false, // Prevent flashing on startup
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: !isDev, // Disable in dev, enable in production
    },
  });

  mainWindow.maximize();

  // ✅ Load correct index.html
  const indexPath = `file://${path.join(rendererDist, 'index.html')}`;
  console.log('🔎 Attempting to load:', indexPath);

  if (fs.existsSync(path.join(rendererDist, 'index.html'))) {
    console.log('✅ index.html found, loading...');
    mainWindow.loadURL(indexPath).catch((err) => {
      console.error('❌ Failed to load index.html:', err);
      dialog.showErrorBox('Startup Error', 'Wagewise failed to load. Please reinstall the application.');
      app.quit();
    });
  } else {
    console.error('❌ index.html NOT found:', indexPath);
    dialog.showErrorBox('Startup Error', 'Wagewise failed to load. Please reinstall the application.');
    app.quit();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

/**
 * Initialize the application.
 */
const initializeApp = () => {
  console.log('✅ App is ready');
  createMainWindow();

  if (!isDev) {
    console.log('🔄 Checking for updates...');
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'ashley-chiteri',
      repo: 'wagewise-frontend',
    });
    autoUpdater.checkForUpdatesAndNotify();
  }
};

/**
 * Handle auto-updater events.
 */
const setupAutoUpdater = () => {
  autoUpdater.on('update-available', () => {
    console.log('⬆️ Update available');
    if (mainWindow) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Update Available',
        message: 'A new version of Wagewise is available. It will be downloaded in the background.',
        buttons: ['OK'],
      });
    }
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('⬇️ Update downloaded');
    if (mainWindow) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Update Ready',
        message: 'The update has been downloaded. Restart Wagewise to apply the update.',
        buttons: ['Restart Now', 'Later'],
      }).then((result) => {
        if (result.response === 0) autoUpdater.quitAndInstall();
      });
    }
  });

  autoUpdater.on('error', (error) => {
    console.error('❌ Update Error:', error);
  });
};

// ✅ Initialize the app
app.whenReady().then(initializeApp);

// ✅ Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ✅ Recreate the window if the app is activated (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

// ✅ Set up auto-updater (only in production)
if (!isDev) {
  setupAutoUpdater();
}
