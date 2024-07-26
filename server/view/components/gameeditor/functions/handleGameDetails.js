import { updateFormGlobals } from "../../../lib/globals.js"

const handleGameDetails = (event, form) => {
    console.log(event)
    window[event.detail.field] = event.detail.value.current
    updateFormGlobals()
    window.updateQueue('gameDetails', 'update', form.record)
}

export default handleGameDetails