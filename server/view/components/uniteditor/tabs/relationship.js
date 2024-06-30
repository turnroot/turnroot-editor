import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleRelationship.js'

let config = {
    name: 'unit-editor-relationship-fields',
    record: {},
    fields: [
        {
            field: '',
            type: 'html',
            html: {
                html: '<h2>Relationships</h2>',
                column: 0,
            }
        },
        
    ]
}

let form = new w2form(config)

form.updateGlobals = () => {
    window.turnrootEditorLogs.push(`${new Date()}||info||Updating relationship form globals`)
    form.refresh()
}

form.updateGlobals()

form.on('change', function(event) {
    handleEvent(event, form)
})

export default form