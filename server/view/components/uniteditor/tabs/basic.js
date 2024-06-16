import {
    w2form,
    w2alert,
    query,
    w2ui
} from '../../../lib/w2ui.es6.min.js'


let form = new w2form({
    name: 'unit-editor-basic-fields',
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
                column: 0,
            }
        },
        {
            field: 'left.pronouns',
            type: 'select',
            html: {
                label: 'Pronouns',
                attr: '',
                column: 0,
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
                column: 0,
            },
            options: {
                items: ['Avatar', 'NPC', 'Friend', 'Enemy']
            }
        },
        {
            type: 'textarea',
            field: 'notes',
            html: {
                label: 'Notes',
                attr: '',
                column: 1,
            }
        },
    ],
})

export default form