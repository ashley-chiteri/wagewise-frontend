import { app, BrowserWindow,} from 'electron';
//import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//import fs from 'fs';

//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let mainWindow: BrowserWindow | null

/**
 * Create the main application window.
 */
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1200,
    height: 800,
    show: false, // Prevent flashing on startup
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      //webSecurity: false, // Disable in dev, enable in production
    },
  });

  mainWindow.maximize();

  // Test active push message to Renderer-process.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

  // Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainWindow = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.whenReady().then(createMainWindow)

// /**
//  * Initialize the application.
//  */
// const initializeApp = () => {
//   console.log('✅ App is ready');
//   createMainWindow();

//   if (!isDev) {
//     console.log('🔄 Checking for updates...');
//     autoUpdater.setFeedURL({
//       provider: 'github',
//       owner: 'ashley-chiteri',
//       repo: 'wagewise-frontend',
//     });
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// };

// /**
//  * Handle auto-updater events.
//  */
// const setupAutoUpdater = () => {
//   autoUpdater.on('update-available', () => {
//     console.log('⬆️ Update available');
//     if (mainWindow) {
//       dialog.showMessageBox(mainWindow, {
//         type: 'info',
//         title: 'Update Available',
//         message: 'A new version of Wagewise is available. It will be downloaded in the background.',
//         buttons: ['OK'],
//       });
//     }
//   });

//   autoUpdater.on('update-downloaded', () => {
//     console.log('⬇️ Update downloaded');
//     if (mainWindow) {
//       dialog.showMessageBox(mainWindow, {
//         type: 'info',
//         title: 'Update Ready',
//         message: 'The update has been downloaded. Restart Wagewise to apply the update.',
//         buttons: ['Restart Now', 'Later'],
//       }).then((result) => {
//         if (result.response === 0) autoUpdater.quitAndInstall();
//       });
//     }
//   });

//   autoUpdater.on('error', (error) => {
//     console.error('❌ Update Error:', error);
//   });
// };

// // ✅ Initialize the app
// app.whenReady().then(initializeApp);

// // ✅ Quit the app when all windows are closed (except on macOS)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// // ✅ Recreate the window if the app is activated (macOS)
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
// });

// // ✅ Set up auto-updater (only in production)
// if (!isDev) {
//   setupAutoUpdater();
// }
