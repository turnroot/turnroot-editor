import { w2ui, w2form } from "../../../lib/w2ui.es6.min.js"
import objectEditorBasicFields from '../tabs/basic.js'
import objectEditorUsageFields from '../tabs/usage.js'
import objectEditorValueFields from '../tabs/value.js'
import objectEditorForgeRepairFields from '../tabs/forgerepair.js'
import objectEditorGiftFields from '../tabs/gift.js'
import updateCurrentObjectRecord from '../functions/utils/updateCurrentObjectRecord.js'

const handleBottom = (event, toolbar) => {
    updateCurrentObjectRecord(window.currentObject)

    let objectEditor = w2ui['ObjectEditor']
    
    if (event.detail.item.id === 'object-editor-bottom-toolbar-basic'){
        objectEditor.html('main', objectEditorBasicFields)
        window.ObjectEditorActiveTab = 'basic'
    } else if (event.detail.item.id === 'object-editor-bottom-toolbar-usage'){
        objectEditor.html('main', objectEditorUsageFields)
        window.ObjectEditorActiveTab = 'usage'
    } else if (event.detail.item.id === 'object-editor-bottom-toolbar-value'){
        objectEditor.html('main', objectEditorValueFields)
        window.ObjectEditorActiveTab = 'value'
    } else if (event.detail.item.id === 'object-editor-bottom-toolbar-forgerepair'){
        objectEditor.html('main', objectEditorForgeRepairFields)
        window.ObjectEditorActiveTab = 'forgerepair'
    } else if (event.detail.item.id === 'object-editor-bottom-toolbar-gift'){
        objectEditor.html('main', objectEditorGiftFields)
        window.ObjectEditorActiveTab = 'gift'
    }
}

export default handleBottom