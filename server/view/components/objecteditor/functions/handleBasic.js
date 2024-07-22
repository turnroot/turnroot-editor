import {
    w2alert, w2ui
} from '../../../lib/w2ui.es6.min.js'

import {updateQueue} from '../../../functions/edits/queue.js'

import {
    subtypeWeaponRecord,
    subtypeConsumableRecord,
    subtypeEquipableRecord,
    subtypeGiftRecord
} from '../records/subtypeRecords.js'

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current

    if (field === 'subtype') {
        switch (value) {
            case 'Weapon':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                form.record = {
                    ...form.record,
                    ...subtypeWeaponRecord
                }
                break
            case 'Consumable':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                form.record = {
                    ...form.record,
                    ...subtypeConsumableRecord
                }
                break
            case 'Equipable':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                form.record = {
                    ...form.record,
                    ...subtypeEquipableRecord
                }
                break
            case 'Gift':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-gift')
                form.record = {
                    ...form.record,
                    ...subtypeGiftRecord
                }
                break
        }
        
    }

    updateQueue('Object', 'updateObject', form.record)
}

export default handleEvent