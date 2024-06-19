import { w2layout, w2toolbar } from '../../../lib/w2ui.es6.min.js'
import behaviorSliders from './behavior/sliders.js'
import handleBottom from './behavior/handleBottom.js'

let config = [
    {type: 'radio', group: '1', id: 'unit-editor-behavior-container-bottom-toolbar-sliders', text: 'Sliders', class: 'panel-tabs', checked: true},
    {type: 'radio', group: '1', id: 'unit-editor-behavior-container-bottom-toolbar-tiles', text: 'Tiles', class: 'panel-tabs'},
]

let toolbar = new w2toolbar({
    name: 'unit-editor-behavior-container-bottom-toolbar',
    items:  config,
})

toolbar.on('click', function (event) {
    event.done(() => {
        handleBottom(event, toolbar)
    })
})

let unitEditorBehaviorContainer = new w2layout({
    name: 'unit-editor-behavior-container',
    panels: [
        { type: 'main', content: 'main', html: behaviorSliders, style: 'overflow-x: hidden'},
        {type: 'bottom', size: 30, resizable: false, content: 'bottom', style: 'overflow-y: hidden;', html: toolbar}
    ]
})



export default unitEditorBehaviorContainer