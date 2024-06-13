import { w2layout } from '/lib/w2ui.es6.min.js'

let layout = new w2layout({
    name: 'EditorWindow',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: '<div style="padding: 10px;">Top</div>'},
        { type: 'main', content: 'main', html: '<div style="padding: 10px;">Main</div>'},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: '<div style="padding: 10px;">Bottom</div>'},
        { type: 'left', size: 200, resizable: true, content: 'left', html: '<div style="padding: 10px;">Left</div>'},
        { type: 'right', size: 200, resizable: true, content: 'right', html: '<div style="padding: 10px;">Right</div>'},
        { type: 'preview', size: 200, resizable: true, content: 'preview', html: '<div style="padding: 10px;">Preview</div>'},
    ]
})

export default layout