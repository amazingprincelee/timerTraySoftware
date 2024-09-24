const {Tray, app, Menu} = require('electron')

//there is a platform specific issue with tray on windows
//https://github.com/electron/electron/issues/1736

class TimerTray extends Tray {

    constructor(iconPath, mainWindow){
        super(iconPath)
        
        this.mainWindow = mainWindow

        this.setToolTip('Timer app')
        this.on('click', this.onClick.bind(this))
        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(event, bounds){
        
        const {x, y} = bounds;

        const {height, width} = this.mainWindow.getBounds();

        if(this.mainWindow.isVisible()){
          this.mainWindow.hide()
        }else{
          
            const yPosition = process.platform === 'darwin' ? y : y - height

            this.mainWindow.setBounds({
                x: Math.round(x - (width / 2)),
                y: yPosition,
                height,
                width
            })
            this.mainWindow.show()
        }
    }

    onRightClick(){
        const menuConfig = Menu.buildFromTemplate([ 
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]) 

        this.popUpContextMenu(menuConfig)
    }

}


module.exports = TimerTray