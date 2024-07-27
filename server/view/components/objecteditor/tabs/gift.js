import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'

let config = {
    name: 'object-editor-gift-fields',
    record: {
    },
    fields: [
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleTab(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorGiftFields = form

form.updateGlobals()

export default form