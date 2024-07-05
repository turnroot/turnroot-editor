import {w2ui, w2alert} from "../../../lib/w2ui.es6.min.js"
import { updateFormGlobals } from "../../../lib/globals.js"

const handleGlobals = (event, form) => {
    if (event.detail.field === 'combatAdjutants' && event.detail.value.current === true && form.record.combatPairUp === true){
        w2alert('You cannot have combat adjutants and pair up. Pair up has been disabled.')
        form.record.combatPairUp = false
        form.refresh()
    } else if (event.detail.field === 'combatPairUp' && event.detail.value.current === true && form.record.combatAdjutants === true){
        w2alert('You cannot have combat adjutants and pair up. Combat adjutants have been disabled.')
        form.record.combatAdjutants = false
        form.refresh()
    }
    window[event.detail.field] = event.detail.value.current
    updateFormGlobals()
}

export default handleGlobals