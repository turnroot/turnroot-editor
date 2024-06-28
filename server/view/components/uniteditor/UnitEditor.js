import { w2layout } from '../../lib/w2ui.es6.min.js'
import unitEditorBasicFields from './tabs/basic.js'
import unitEditorLeft from './left.js'
import unitEditorTop from './top.js'
import unitEditorBottom from './bottom.js'
import getAllUnits from './functions/getAllUnits.js'

let layout = new w2layout({
    name: 'UnitEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: unitEditorTop, style: 'overflow-y: hidden;'},
        { type: 'main', content: 'main', html: unitEditorBasicFields},
        { type: 'left', size: 200, resizable: true, content: 'left', html: unitEditorLeft},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: unitEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

layout.on('render', async function(event){
    window.allUnits = await getAllUnits()
    localStorage.setItem('allUnits', JSON.stringify(window.allUnits))
})

export default layout