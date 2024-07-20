import { w2ui, w2form } from "../../../lib/w2ui.es6.min.js"
import objectEditorBasicFields from '../tabs/basic.js'
import updateCurrentObjectRecord from '../functions/utils/updateCurrentObjectRecord.js'

const handleBottom = (event, toolbar) => {
    updateCurrentObjectRecord(window.currentObject)

    let objectEditor = w2ui['ObjectEditor']
    
    if (event.detail.item.id === 'object-editor-bottom-toolbar-basic'){
        objectEditor.html('main', objectEditorBasicFields)
        window.ObjectEditorActiveTab = 'basic'
    }
}

export default handleBottom