import {
    w2form
} from '../../lib/w2ui.es6.min.js'

import handleEvent from './functions/handleEvent.js'

let config = {
    name: 'icon-editor-editor',
    record: {
        
    },
    fields: [
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.iconEditorEditor = form

form.updateGlobals()

export default form