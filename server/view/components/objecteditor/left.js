import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'
import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

let sidebar = new w2sidebar({
    name: 'ObjectEditorLeft',
    flatButton: false,
    nodes: [
        {id: 'weapons', text: 'Weapons', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'magic', text: 'Magic', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'consumables', text: 'Consumables', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'equipables', text: 'Equipables', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'gifts', text: 'Gifts', expanded: true, group: true, groupShowHide: true, nodes: []},
    ]  
})

window.ObjectEditorLeftSidebar = sidebar

sidebar.on('click', function(event) {
    event.done(() => {
        let node = sidebar.get(event.target)
        window.currentObject = window.allObjects.all.find(object => object.id === node.id)
        console.log('current object', window.currentObject, window.allObjects)
        w2ui['object-editor-bottom-toolbar'].click('object-editor-bottom-toolbar-basic')
        updateCurrentObjectRecord(window.currentObject)
        switch (window.currentObject.subtype) {
            case 'Consumable':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                break

            case 'Equipable':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                break

            case 'Gift':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-gift')
                break

            case 'Weapon':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
                break

            case 'Magic':
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-basic')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-usage')
                window.ObjectEditorBottomToolbar.show('object-editor-bottom-toolbar-value')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-forgerepair')
                window.ObjectEditorBottomToolbar.hide('object-editor-bottom-toolbar-gift')
        }
    
        window.objectEditorBasicFields.record.id = window.currentObject.id
        node.selected = true
        sidebar.nodes.forEach(n => {
            if (n.id !== node.id){
                n.selected = false
            }
        })
        sidebar.refresh()
        
    })
})

export default sidebar