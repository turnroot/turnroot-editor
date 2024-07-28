import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'

let config = {
    name: 'object-editor-forgerepair-fields',
    record: {
        forgeable: true,
        repairable: true,
        repairPricePerUse: 10,
        repairNeedsItems: true,
        repairItem: '',
        repairItemAmountPerUse: 1
    },
    fields: [
        {
            type: 'html',
            html: {
                html: '<h2>Repair</h2>',
                column:0,
            }
        },
        {
            type: 'html',
            html: {
                html: '<h2>Forge</h2>',
                column:1,
            }
        },
        {
            type: 'checkbox',
            field: 'forgeable',
            checked: true,
            html: {
                label: 'Can be forged',
                class: 'emphasized-field',
                column: 1,
            }
        },
        {
            type: 'checkbox',
            field: 'repairable',
            checked: true,
            html: {
                label: 'Can be repaired',
                class: 'emphasized-field',
                column: 0,
            }
        },
        {
            type: 'number',
            field: 'repairPricePerUse',
            html: {
                label: 'Repair cost per use',
                column: 0,
            }
        },
        {
            type: 'checkbox',
            field: 'repairNeedsItems',
            html: {
                label: 'Requires item (%attach3%)<sup aria-label = "The item must be a Consumable object. If no Consumable objects exist, you will not have any items to choose from." data-balloon-pos = "bottom"><highlight>?</highlight></sup> to repair',
                column: 0,
            }
        },
        {
            type: 'select',
            field: 'repairItem',
            options: {items: []},
            html: {
                label: '',
                class: 'no-label',
                anchor: '%attach3%',
                column: 0,
            }
        },
        {
            type: 'number',
            field: 'repairItemAmountPerUse',
            html: {
                label: 'Number of item required to repair per use',
                column: 0,
            }
        }
    
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleTab(form, event)
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorForgeRepairFields = form

form.updateGlobals()

export default form