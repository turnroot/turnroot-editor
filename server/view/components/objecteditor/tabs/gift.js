import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'

let config = {
    name: 'object-editor-gift-fields',
    record: {
        giftRank: '',
        lostItem: false,
        belongsTo: '',
    },
    fields: [
        {
            type: 'html',
            html: {
                html: '<h2>Gift</h2><br/><p>How valuable is this as a gift?</p>'
            }
        },
        {
            type: 'radio',
            field: 'giftRank',
            options: {
                items: ['★', '★★', '★★★', '★★★★', '★★★★★']
            },
            html: {
                label: 'Gift Rank',
                attr: 'style="width: 100%;"'
            }
        },
        {
            type: 'checkbox',
            field: 'lostItem',
            checked: false,
            html: {
                label: 'Lost item'
            }
        },
        {
            type: 'select',
            options: {items: []},
            field: 'belongsTo',
            hidden: true,
            html: {
                label: 'Belongs to'
            }
        },
        {
            type: 'select',
            options: {items: [], multiple: true}, 
            field: 'unitsHate',
            html: {
                label: 'Units that hate this gift'
            }
        },
        {
            type: 'select',
            options: {items: [], multiple: true},
            field: 'unitsLove',
            html: {
                label: 'Units that love this gift'
            }
        },
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleTab(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorGiftFields = form

form.updateGlobals()

export default form