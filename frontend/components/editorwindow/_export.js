import EditorWindowSidebar from './EditorWindowSidebar'
import EditorWindowTopMenu from './EditorWindowTopMenu'
import EditorWindowStatusBar from './EditorWindowStatusBar'
import {w2layout} from '../lib/w2ui.es6.min.js'

let config = {
    layout: {
        name: 'EditorWindowLayout',
        padding: 0,
        panels: [
            {type: 'top', size: 32, resizable: false, content: 'top'},
            {type: 'bottom', size: 32, resizable: false, content: 'bottom'},
            { type: 'left', size: '15%', resizable: false, minSize: '36' },
            { type: 'main', overflow: 'hidden' }
        ]
    }
}

let layout = new w2layout(config.layout)
let sidebar = EditorWindowSidebar
let topmenu = EditorWindowTopMenu
let statusbar = EditorWindowStatusBar

const init = (layout) => {
    // expects <div id="main"></div> in the HTML
    layout.render('#main')
    layout.html('left', sidebar)
    layout.html('top', topmenu)
    layout.html('bottom', statusbar)
}

export default init(layout)
