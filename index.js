const path = require('path')
const {app, ipcMain} = require('electron')
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')

let mainWindow;
let tray;

app.on('ready', ()=>{
    // hide the dock on macOS to avoid error on window
    if (process.platform === 'darwin') {
        app.dock.hide();
    }

    mainWindow = new MainWindow()
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
    

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate@2x.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    tray = new TimerTray(iconPath, mainWindow)  
})

ipcMain.on('update-timer', (event, timeLeft)=>{
    if (process.platform === 'darwin') {
        tray.setTitle(timeLeft);  //on macOS
    } else {
        tray.setToolTip(timeLeft);  //other platforms
    }
})