import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'
import { subtypeWeaponRecord } from '../records/subtypeRecords.js'
import commonRecord from '../records/commonRecord.js'

let config = {
    name: 'object-editor-value-fields',
    record: {
        buyable: true,
        sellable: true,
        buyPrice: 100,
        sellPrice: 75,
        sellPriceDeductedPerUse: 2

    },
    fields: [
        {
            type: 'html',
            html: {
                html: '<h2>Buy/Sell</h2>'
            }
        },
        {
            type: 'checkbox',
            field: 'buyable',
            checked: true,
            class: 'emphasized-field',
            html: {
                label: 'Can be bought'
            }
        },
        {
            type: 'checkbox',
            field: 'sellable',
            checked: true,
            class: 'emphasized-field',
            html: {
                label: 'Can be sold'
            }
        },
        {
            type: 'number',
            field: 'buyPrice',
            html: {
                label: 'Buy price'
            }
        },
        {
            type: 'number',
            field: 'sellPrice',
            html: {
                label: 'Sell price (un-used)'
            }
        },
        {
            type: 'number',
            field: 'sellPriceDeductedPerUse',
            html: {
                label: 'Sell price deducted per use'
            }
        },
        {
            type: 'html',
            html: {
                html: '<small>When a player sells this item, it will sell for: <code> un-used sell price - (sell price deducted per use X uses)</code>, or, if that value is less than 0, it will sell for 0.</small>'
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

window.objectEditorValueFields = form

form.updateGlobals()

export default form