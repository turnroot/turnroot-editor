import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleBasic.js'

import {
    subtypeWeaponRecord,
    subtypeConsumableRecord,
    subtypeEquipableRecord,
    subtypeGiftRecord
} from '../records/subtypeRecords.js'

let config = {
    name: 'object-editor-basic-fields',
    record: {
        subtype: 'weapon',
    },
    fields: [
    ],
}

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorBasicFields = form

form.updateGlobals()

export default form