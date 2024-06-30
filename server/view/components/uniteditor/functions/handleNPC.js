import {
    w2alert
} from '../../../lib/w2ui.es6.min.js'

const handleEvent = (event, form) => {
    let field = event.detail.field
    let value = event.detail.value

    window.turnrootEditorLogs.push(`${new Date()}||info||Friend field ${field} requested change to ${value.current}`)
}

export default handleEvent