import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleUsage.js'
import { subtypeWeaponRecord } from '../records/subtypeRecords.js'
import commonRecord from '../records/commonRecord.js'

let config = {
    name: 'object-editor-usage-fields',
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

window.objectEditorUsageFields = form

form.updateGlobals()

export default form