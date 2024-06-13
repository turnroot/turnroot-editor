import { w2layout } from '../../lib/w2ui.es6.min.js'

let layout = new w2layout({
    name: 'GameEditor',
    panels: [
        { type: 'main', content: 'main', html: '<div style="padding: 10px;">Main Project Editor</div>'},
        { type: 'left', size: 200, resizable: true, content: 'left', html: '<div style="padding: 10px;">Left</div>'},
    ]
})

export default layout