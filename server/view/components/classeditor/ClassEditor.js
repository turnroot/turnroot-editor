import { w2layout } from '../../lib/w2ui.es6.min.js'

let layout = new w2layout({
    name: 'ClassEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: '<div style="padding: 10px;">Top</div>'},
        { type: 'main', content: 'main', html: '<div style="padding: 10px;">Main Class Editor</div>'},
    ]
})

export default layout