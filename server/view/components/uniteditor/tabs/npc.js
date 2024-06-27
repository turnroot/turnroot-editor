import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleNPC.js'

let config = {
    name: 'unit-editor-npc-fields',
    record: {},
    fields: []
}

let form = new w2form(config)

form.updateGlobals = () => {
    window.turnrootEditorLogs.push(`${new Date()}||info||Updating NPC form globals`)
    form.refresh()
}

form.updateGlobals()

form.on('change', function(event) {
    handleEvent(event, form)
})

export default form