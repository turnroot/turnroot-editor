import { w2toolbar } from "../../lib/w2ui.es6.min.js"
import handleBottom from './functions/handleBottom.js'

let config = [
    {type: 'radio', group: '1', id: 'object-editor-bottom-toolbar-basic', text: 'Basic Info', class: 'panel-tabs', checked: true},
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

export default toolbar