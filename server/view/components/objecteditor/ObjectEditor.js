import { w2layout } from '../../lib/w2ui.es6.min.js'
import objectEditorBasicFields from './tabs/basic.js'
import objectEditorLeft from './left.js'
import objectEditorTop from './top.js'
import objectEditorBottom from './bottom.js'
import getAllObjects from './functions/objects/getAllObjects.js'
import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

let layout = new w2layout({
    name: 'ObjectEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: objectEditorTop, style: 'overflow-y: hidden;'},
        { type: 'main', content: 'main', html: objectEditorBasicFields},
        { type: 'left', size: 200, resizable: true, content: 'left', html: objectEditorLeft},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: objectEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

layout.on('render', async function(event){
    layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>Loading objects...</h2></div>')

        window.allObjects = await getAllObjects()
        window.flattenedAllObjects = window.allObjects.objectWeapons.concat(window.allObjects.objectConsumables).concat(window.allObjects.objectEquipables).concat(window.allObjects.objectGifts)

    if (window.flattenedAllObjects.length > 0){
        window.currentObject = window.flattenedAllObjects[0]
        updateCurrentObjectRecord(window.currentObject)
        layout.html('main', objectEditorBasicFields)

        if (window.allObjects.objectWeapons.length > 0){

        objectEditorLeft.nodes[0].nodes = window.allObjects.objectWeapons.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        objectEditorLeft.nodes[0].nodes[0].selected = true
        }

        if (window.allObjects.objectConsumables.length > 0){
        objectEditorLeft.nodes[1].nodes = window.allObjects.objectConsumables.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }
        if (window.allObjects.objectEquipables.length > 0){
        objectEditorLeft.nodes[2].nodes = window.allObjects.objectEquipables.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }
        if (window.allObjects.objectGifts.length > 0){
        objectEditorLeft.nodes[3].nodes = window.allObjects.objectGifts.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }

        objectEditorLeft.refresh()
        window.ObjectEditorActiveTab = 'basic'
    } else {
        layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>No objects</h2><p>Create a new object to get started</p><img src = "http://localhost:26068/style/img/nu.png" style="position: fixed;width: 256px;left: 17%;top: 33%;"></div>')
    }
})

export default layout