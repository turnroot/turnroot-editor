import Globals from '../tabs/globals.js'
import gameDetails from '../tabs/gameDetails.js'

import { w2ui } from "../../../lib/w2ui.es6.min.js"

const handleBottom = (event, toolbar) => {
    window.turnrootEditorLogs.push(`${new Date()}||info||GameEditor bottom toolbar button clicked: ${event.detail.item.id}`)
    let gameEditor = w2ui['GameEditor']
    if (event.detail.item.id === 'game-editor-bottom-toolbar-game-details'){
        gameEditor.html('main', gameDetails)
    }
    else if (event.detail.item.id === 'game-editor-bottom-toolbar-game-settings'){
        gameEditor.html('main', Globals)
    }
}

export default handleBottom