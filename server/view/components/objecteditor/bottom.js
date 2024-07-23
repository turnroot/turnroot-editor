import { w2toolbar } from "../../lib/w2ui.es6.min.js"
import handleBottom from './functions/handleBottom.js'

let config = [
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-basic', text: 'Basic Info', class: 'panel-tabs', checked: true},
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-usage', text: 'Details', class: 'panel-tabs'},
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-value', text: 'Value', class: 'panel-tabs'},
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-forgerepair', text: 'Forge/Repair', class: 'panel-tabs'},
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-gift', text: 'Gift', class: 'panel-tabs', hidden: true},
]

let toolbar = new w2toolbar({
    name: 'object-editor-bottom-toolbar',
    items:  config,
})

toolbar.on('click', function (event) {
    event.done(() => {
        handleBottom(event, toolbar)
    })
})

window.ObjectEditorBottomToolbar = toolbar

export default toolbar