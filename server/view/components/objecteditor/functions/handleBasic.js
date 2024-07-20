import {
    w2alert, w2ui
} from '../../../lib/w2ui.es6.min.js'

import {updateQueue} from '../../../functions/edits/queue.js'

const mapRange = function (value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value

    updateQueue('Object', 'updateObject', form.record)
}

export default handleEvent