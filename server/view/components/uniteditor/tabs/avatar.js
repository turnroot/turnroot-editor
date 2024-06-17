import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleAvatar.js'

let config = {
    name: 'unit-editor-avatar-fields',
    record: {},
    fields: []
}

let form = new w2form(config)

form.on('change', function(event) {
    handleEvent(event, form)
})

export default form