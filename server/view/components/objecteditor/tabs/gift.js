import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleGift.js'
import { subtypeWeaponRecord } from '../records/subtypeRecords.js'
import commonRecord from '../records/commonRecord.js'

let config = {
    name: 'object-editor-gift-fields',
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

window.objectEditorGiftFields = form

form.updateGlobals()

export default form