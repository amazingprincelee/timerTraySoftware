const {BrowserWindow} = require('electron')


class MainWindow extends BrowserWindow {
    constructor(){
        super( {
                width:300,
                height:500,
                frame:false,
                resizable:false,
                show: false
            })


            this.on('blur', this.onBlur.bind(this))

            
    }

    onBlur(){
        this.hide()
    }
    
}


module.exports = MainWindow