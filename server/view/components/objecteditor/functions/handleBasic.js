const handleEvent = (form, event, automated = false) => {
    let field = event.detail.field
    let value = event.detail.value.current

    window.currentObject[field] = value
    form.record[field] = value

    if (field === 'subtype') {

        switch (value) {
            case 'Consumable':
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
                
        }
    }
    form.refresh()
    window.updateQueue('Object', 'updateSubtype', form.record)
}


export default handleEvent