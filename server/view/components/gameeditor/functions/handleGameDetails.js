import { updateFormGlobals } from "../../../lib/globals.js"
import { updateQueue } from "../../../functions/edits/queue.js"

const handleGameDetails = (event, form) => {
    console.log(event)
    window[event.detail.field] = event.detail.value.current
    updateFormGlobals()
    updateQueue('gameDetails', 'update', form.record)
}

export default handleGameDetails