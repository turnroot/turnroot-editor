import { w2layout } from '../../lib/w2ui.es6.min.js'
import unitEditorBasicFields from './tabs/basic.js'
import unitEditorLeft from './left.js'
import unitEditorTop from './top.js'

let layout = new w2layout({
    name: 'UnitEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: unitEditorTop},
        { type: 'main', content: 'main', html: unitEditorBasicFields},
        { type: 'left', size: 200, resizable: true, content: 'left', html: unitEditorLeft},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: '<div style="padding: 10px;">Bottom</div>'},
    ]
})

layout.html('main', )


export default layout