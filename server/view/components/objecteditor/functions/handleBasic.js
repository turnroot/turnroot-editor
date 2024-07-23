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

import commonRecord from '../records/commonRecord.js'

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current

    if (field === 'subtype') {
        if (value != event.detail.value.previous) {
            form.message({
                body: '<div class="w2ui-centered">Do you want to change the type? Data loss may occur if you\'ve already filled in data for a different type.</div>',
                actions: {
                    Yes() {
                        switch (value) {
                            case 'Consumable':
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                                form.record = {
                                    ...commonRecord,
                                    ...subtypeConsumableRecord,
                                    id: form.record.id,
                                    subtype: 'Consumable',
                                    oldSubtype: event.detail.value.previous
                                }
                                if (window.allObjects.objectWeapons.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectWeapons = window.allObjects.objectWeapons.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectEquipables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectEquipables = window.allObjects.objectEquipables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectGifts.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectGifts = window.allObjects.objectGifts.filter(object => object.id !== form.record.id)
                                }
                                window.allObjects.objectConsumables.push(form.record)
                                break

                            case 'Equipable':
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                                form.record = {
                                    ...commonRecord,
                                    ...subtypeEquipableRecord,
                                    id: form.record.id,
                                    subtype: 'Equipable',
                                    oldSubtype: event.detail.value.previous
                                }
                                if (window.allObjects.objectWeapons.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectWeapons = window.allObjects.objectWeapons.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectConsumables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectConsumables = window.allObjects.objectConsumables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectGifts.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectGifts = window.allObjects.objectGifts.filter(object => object.id !== form.record.id)
                                }
                                window.allObjects.objectEquipables.push(form.record)
                                break

                            case 'Gift':
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-usage')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-gift')
                                form.record = {
                                    ...commonRecord,
                                    ...subtypeGiftRecord,
                                    id: form.record.id,
                                    subtype: 'Gift',
                                    oldSubtype: event.detail.value.previous
                                }
                                if (window.allObjects.objectWeapons.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectWeapons = window.allObjects.objectWeapons.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectConsumables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectConsumables = window.allObjects.objectConsumables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectEquipables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectEquipables = window.allObjects.objectEquipables.filter(object => object.id !== form.record.id)
                                }
                                window.allObjects.objectGifts.push(form.record)
                                break

                            case 'Weapon':
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-forgerepair')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                                form.record = {
                                    ...commonRecord,
                                    ...subtypeWeaponRecord,
                                    id: form.record.id,
                                    subtype: 'Weapon',
                                    oldSubtype: event.detail.value.previous
                                }
                                if (window.allObjects.objectConsumables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectConsumables = window.allObjects.objectConsumables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectEquipables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectEquipables = window.allObjects.objectEquipables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectGifts.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectGifts = window.allObjects.objectGifts.filter(object => object.id !== form.record.id)
                                }
                                window.allObjects.objectWeapons.push(form.record)
                                break
                            case 'Magic':
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                                form.record = {
                                    ...commonRecord,
                                    ...subtypeWeaponRecord,
                                    id: form.record.id,
                                    subtype: 'Magic',
                                    oldSubtype: event.detail.value.previous
                                }
                                if (window.allObjects.objectConsumables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectConsumables = window.allObjects.objectConsumables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectEquipables.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectEquipables = window.allObjects.objectEquipables.filter(object => object.id !== form.record.id)
                                }
                                if (window.allObjects.objectGifts.find(object => object.id === form.record.id)) {
                                    window.allObjects.objectGifts = window.allObjects.objectGifts.filter(object => object.id !== form.record.id)
                                }
                                window.allObjects.objectWeapons.push(form.record)
                                break
                        }
                        form.unlock()
                        form.message()
                        form.refresh()
                        updateQueue('Object', 'updateSubtype', form.record)
                    },
                    No() {
                        form.setValue('subtype', event.detail.value.previous)
                        form.record['subtype'] = event.detail.value.previous
                        form.unlock()
                        form.message()
                        form.refresh()
                    }
                }
            })
        }        
    }
}

export default handleEvent