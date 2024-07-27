import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleBasic.js'

let config = {
    name: 'object-editor-basic-fields',
    record: {
        subtype: 'Weapon',
        id: '',
    },
    fields: [
        {
            type: 'html',
            html: {
                html: '<hr style = "margin-top:.5rem;margin-bottom:.5rem;"/>'
            }
        },
        {
            type: 'text',
            field: 'name',
            html: {
                label: 'Name'
            }
        },
        {
            type: 'text',
            field: 'flavorText',
            html: {
                label: 'Flavor Text'
            }
        },
        {
            type: 'html',
            html: {
                html: `<button id = "IconPicker-button" onclick = "window.showObjectEditorBasicFieldsIconPicker(event)" class = "w2ui-btn" style = "width:100%;margin-top:1rem;">Select Icon</button>
                <script>
                    window.showObjectEditorBasicFieldsIconPicker = async (event) => {
                        window.IconPicker.coords = {x: event.clientX, y: event.clientY - 200}
                        window.IconPicker.show()
                        let result = await window.IconPicker.icon()
                        window.objectEditorBasicFields.record.icon = result
                        let iconButton = document.getElementById('IconPicker-button')
                        iconButton.innerText = 'Icon Selected: ' + result.name
                        return result
                    }
                </script>
                `
            }
        }
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorBasicFields = form

form.updateGlobals()

export default form