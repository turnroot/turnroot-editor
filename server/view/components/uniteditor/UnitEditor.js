import { w2layout } from './lib/w2ui.es6.min.js'

let layout = new w2layout({
    name: 'UnitEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: '<div style="padding: 10px;">Top</div>'},
        { type: 'main', content: 'main', html: ''},
        { type: 'left', size: 200, resizable: true, content: 'left', html: '<div style="padding: 10px;">Left</div>'},
    ]
})


export default layout