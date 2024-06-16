import { w2layout } from '../../lib/w2ui.es6.min.js'
import unitEditorBasicFields from './tabs/basic.js'

let layout = new w2layout({
    name: 'UnitEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: '<div style="padding: 10px;">Top</div>'},
        { type: 'main', content: 'main', html: unitEditorBasicFields},
        { type: 'left', size: 200, resizable: true, content: 'left', html: '<div style="padding: 10px;">Left</div>'},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: '<div style="padding: 10px;">Bottom</div>'},
    ]
})


export default layout