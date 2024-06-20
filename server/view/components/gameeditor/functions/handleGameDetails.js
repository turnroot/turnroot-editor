import {w2ui} from "../../../lib/w2ui.es6.min.js"
import { updateFormGlobals } from "../../../lib/globals.js"

const handleGlobals = (event, form) => {
    window[event.detail.field] = event.detail.value.current
    updateFormGlobals()
}

export default handleGlobals