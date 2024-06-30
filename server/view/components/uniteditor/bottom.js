import { w2toolbar } from "../../lib/w2ui.es6.min.js"
import handleBottom from './functions/handleBottom.js'

let config = [
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-basic', text: 'Basic Info', class: 'panel-tabs', checked: true},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-subtype', text: 'Subtype', class: 'panel-tabs'},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-behavior', text: 'Behavior', class: 'panel-tabs', hidden: true},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-relationship', text: 'Relationships', class: 'panel-tabs', hidden: false},
]

let toolbar = new w2toolbar({
    name: 'unit-editor-bottom-toolbar',
    items:  config,
})

toolbar.on('click', function (event) {
    event.done(() => {
        handleBottom(event, toolbar)
    })
})

export default toolbar