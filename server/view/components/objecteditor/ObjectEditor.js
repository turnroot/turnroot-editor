import {
    w2layout
} from '../../lib/w2ui.es6.min.js'
import objectEditorBasicFields from './tabs/basic.js'
import objectEditorLeft from './left.js'
import objectEditorTop from './top.js'
import objectEditorBottom from './bottom.js'
import getAllObjects from './functions/objects/getAllObjects.js'
import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

import setNodes from './functions/sidebar/setNodes.js'

let layout = new w2layout({
    name: 'ObjectEditor',
    panels: [{
            type: 'top',
            size: 30,
            resizable: false,
            content: 'top',
            html: objectEditorTop,
            style: 'overflow-y: hidden;'
        },
        {
            type: 'main',
            content: 'main',
            html: objectEditorBasicFields
        },
        {
            type: 'left',
            size: 200,
            resizable: true,
            content: 'left',
            html: objectEditorLeft
        },
        {
            type: 'bottom',
            size: 30,
            resizable: false,
            content: 'bottom',
            html: objectEditorBottom,
            style: 'overflow-y: hidden;'
        },
    ]
})

layout.on('render', async function (event) {
    layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>Loading objects...</h2></div>')

    window.allObjects = await getAllObjects()

    if (window.allObjects.all.length > 0) {
        window.currentObject = window.allObjects.all[0]
        updateCurrentObjectRecord(window.currentObject)
        layout.html('main', objectEditorBasicFields)
        objectEditorBasicFields.record.id = window.currentObject.id

        setNodes(objectEditorLeft)

        let trys = [objectEditorLeft.nodes[0], objectEditorLeft.nodes[1], objectEditorLeft.nodes[2], objectEditorLeft.nodes[3]]
        let s = false
        trys.forEach(node => {
            if (node.nodes[0] && !s) {
                node.nodes[0].selected = true
                s = true
            }
        })

        try {
            objectEditorLeft.render()
            objectEditorLeft.nodes[0].nodes[0].click()
        } catch (e) {
            console.log(e)
        }
        window.ObjectEditorActiveTab = 'basic'

    } else {
        layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>No objects</h2><p>Create a new object to get started</p><img src = "http://localhost:26068/style/img/nu.png" style="position: fixed;width: 256px;left: 17%;top: 33%;"></div>')
    }
})

export default layout