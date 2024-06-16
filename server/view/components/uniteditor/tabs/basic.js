import {
    w2form,
    w2layout,
    w2alert,
    query,
    w2ui
} from '../../../lib/w2ui.es6.min.js'

let layout = new w2layout({
    name: 'unitEditorBasicFields',
    panels: [
        {
            type: 'left',
            size: '50%',
            resizable: true,
            style: 'border-right: 1px solid color-mix(in srgb, var(--window-background-alt) 20%, var(--list-background));',
        },
        {
            type: 'main',
            size: '50%',
            resizable: true,
        }
    ]
})

let left = new w2form({
    name: 'unit-editor-basic-fields-left',
    record: {
        left: {
            name: 'New Unit',
            pronouns: 'they/them/their/theirs',
            subtype: 'Avatar',
        }
    },
    fields: [{
            field: 'left.name',
            type: 'text',
            html: {
                label: 'Unit name',
                attr: '',
            }
        },
        {
            field: 'left.pronouns',
            type: 'select',
            html: {
                label: 'Pronouns',
                attr: '',
            },
            options: {
                items: ['he/him/his/his', 'she/her/her/hers', 'they/them/their/theirs']
            }
        },
        {
            field: 'left.subtype',
            type: 'radio',
            html: {
                label: 'Subtype',
                attr: '',
            },
            options: {
                items: ['Avatar', 'NPC', 'Friend', 'Enemy']
            }
        }
    ],
    actions: {
        Reset() {
            this.clear()
        },
        Save() {}
    }
})

layout.html('left', left)

export default layout