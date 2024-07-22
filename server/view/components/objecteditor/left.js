import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'
import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

let sidebar = new w2sidebar({
    name: 'ObjectEditorLeft',
    flatButton: false,
    nodes: [
        {id: 'weapons', text: 'Weapons', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'consumables', text: 'Consumables', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'equipables', text: 'Equipables', expanded: true, group: true, groupShowHide: true, nodes: []},
        {id: 'gifts', text: 'Gifts', expanded: true, group: true, groupShowHide: true, nodes: []},
    ]  
})

window.ObjectEditorLeftSidebar = sidebar

sidebar.on('click', function(event) {
    event.done(() => {
        let node = sidebar.get(event.target)
        window.currentObject = window.flattenedAllObjects.find(object => object.id === node.id)
        w2ui['object-editor-bottom-toolbar'].click('object-editor-bottom-toolbar-basic')
        updateCurrentObjectRecord(window.currentObject)
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