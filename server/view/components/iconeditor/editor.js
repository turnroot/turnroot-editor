import {
    w2form
} from '../../lib/w2ui.es6.min.js'

import handleEvent from './functions/handleEvent.js'

let config = {
    name: 'icon-editor-editor',
    record: {
        icon: '',
    },
    fields: [
        {type: 'select', field: 'icon', options: {items: []}, html: {label: 'Icon'}},
        {type: 'html',
            field: 'iconEditorHtml',
            html: {
                class: 'no-label',
                html: `<div>Icon Editor</div>`
        }}
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.on('render', () => {
    form.get('icon').options.items = window.allIcons
})

form.updateGlobals = () => {
    form.refresh()
}

window.iconEditorEditor = form

form.updateGlobals()

export default form