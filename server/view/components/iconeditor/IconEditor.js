import { w2layout } from '../../lib/w2ui.es6.min.js'
import iconEditorEditor from './editor.js'
import iconEditorTop from './top.js'
import updateCurrentIconRecord from './functions/utils/updateCurrentIconRecord.js'
import getAllIcons from '../../functions/gets/getAllIcons.js'

import getImagesIconComponents from '../../functions/gets/getImagesIconComponents.js'
import getDefaultImagesIconComponents from '../../functions/gets/getDefaultImagesIconComponents.js'

let layout = new w2layout({
    name: 'IconEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: iconEditorTop, style: 'overflow-y: hidden;'},
        { type: 'main', content: 'main', html: iconEditorEditor},
    ]
})

layout.on('render', async function(event){
    layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>Loading icons...</h2></div>')

    window.ImagesIconComponents = await getImagesIconComponents()
    window.DefaultImagesIconComponents = await getDefaultImagesIconComponents()
    window.ImageIconComponentPicker.icons = window.ImagesIconComponents.concat(window.DefaultImagesIconComponents)
console.log(window.ImageIconComponentPicker.icons)

        window.allIcons = await getAllIcons()

    if (window.allIcons.length > 0){
        window.currentIcon = window.allIcons[0]
        updateCurrentIconRecord(window.currentIcon)
        layout.html('main', iconEditorEditor)
    } else {
        layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>No icons</h2><p>Create a new icon to get started</p><img src = "http://localhost:26068/style/img/nu.png" style="position: fixed;width: 256px;left: 17%;top: 33%;"></div>')
    }
})

export default layout