import {
    w2toolbar,
    w2prompt,
    w2alert,
    w2confirm
} from '../../lib/w2ui.es6.min.js'

import createNewObject from './functions/objects/createNewObject.js'
import deleteObject from './functions/objects/deleteObject.js'
import getAllObjects from './functions/objects/getAllObjects.js'
window.ObjectEditorCreateNewObject = createNewObject
window.ObjectEditorDeleteObject = deleteObject

import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

let nodes = []

let toolbar = new w2toolbar({
    name: 'ObjectEditorTopMenu',
    tooltip: 'bottom',
    items: [
        {type: 'button',
        id: 'new-object',
        text: 'New object',
        class: "w2ui-btn accent",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },
        {type: 'spacer'},
        {type: 'button',
        id: 'delete-object',
        text: 'Delete object',
        class: 'w2ui-btn slider1',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        },
    ]
})

toolbar.on('click', function async(event) {
    event.done(async() => {
        
        if (event.detail.item.id === 'new-object') {
            w2prompt({
                title: 'Create new object',
                label: 'Enter the name of your object. This name will be used to identify the object in the editor. It doesn\'t have to be unique.',
            }).ok(async(event) => {
                
                if (event.detail.value === ''){
                    event.preventDefault()
                } else {
                    getAllObjects().then(allObjects => {
                        window.allObjects = allObjects
                        window.flattenedAllObjects = allObjects.objectWeapons.concat(allObjects.objectConsumables).concat(allObjects.objectEquipables).concat(allObjects.objectGifts)
                    })
                    
                    await window.ObjectEditorCreateNewObject('weapon', event.detail.value).then(n => {
                        window.ObjectEditor.html('main', window.objectEditorBasicFields)
                        window.allObjects.objectWeapons.push(n)
                        window.currentObject = n
                        
                        updateCurrentObjectRecord(n)

                        window.flattenedAllObjects.forEach(object => {
                            nodes.push({id:  object.id, text: object.name + ' ' + object.id})
                        })
                        nodes.forEach(node => {
                            if (node.id === n.id){
                                node.selected = true
                            }
                        })
                        window.allObjectsNodes = nodes
                        window.ObjectEditorLeftSidebar.remove()
                        window.ObjectEditorLeftSidebar.nodes = window.allObjectsNodes
                        window.ObjectEditor.refresh()
                        window.ObjectEditorLeftSidebar.refresh()
                        
                        return w2alert('New object created')
                    }).catch(e => {
                        console.error(e)
                    })
                }
            })
        }
        else if (event.detail.item.id === 'delete-object'){
            if (window.allObjects.length === 0){
                return w2alert('No objects to delete')
            }
            let object = window.currentObject
            w2confirm({
                title: 'Delete object',
                body: `Are you sure you want to delete ${object.name}?`,
                width: 300,
                height:200,
            }).yes(async() => {
                updateCurrentObjectRecord(window.currentObject)
                await window.ObjectEditorDeleteObject(object.id).then(() => {
                    let index = window.allObjects.findIndex(u => u.id === object.id)
                    window.allObjects.splice(index, 1)
                    window.ObjectEditorLeftSidebar.remove()
                    window.ObjectEditorLeftSidebar.nodes = window.allObjects.map(unit => ({id: unit.id, text: unit.name + ' ' + unit.id}))
                    window.ObjectEditorLeftSidebar.refresh()
                    window.currentObject = window.allObjects[0]
                    window.ObjectEditor.html('main', window.objectEditorBasicFields)
                    return w2alert('Object deleted')
                }).catch(e => {
                    return w2alert('Error deleting object')
                })
            })
        }
    })

})

export default toolbar