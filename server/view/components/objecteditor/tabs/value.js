import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'

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
                label: 'Can be bought',
                text: '%attach2%'
            }
        },
        {
            type: 'checkbox',
            field: 'sellable',
            checked: true,
            class: 'emphasized-field',
            html: {
                label: ' Can be sold ',
                anchor: '%attach2%'
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
                label: 'Sell price'
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
            field: 'sellPriceUseExplanation',
            html: {
                html: '<small>When a player sells this item, it will sell for: <code>sell price - (sell price deducted per use X uses)</code>, or, if that value is less than 1, it will sell for 1.</small>'
            }
        },
        {
            type: 'html',
            field: 'sellPriceDemo',
            html: {
                class: 'no-label',
                html: `<h3>Test sell price</h3><div id = "sellPriceDemo">
                <input type = "range" id = "sellPriceDemoSlider">
                <p id = "sellPriceDemoUses">Uses remaining: 0</p>
                <p>Sell price: 0</p>
                <small><em>You must move the slider to update the above values</em></small>
                </div>`
            }
        }
    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleTab(form, event)
})

form.on('render:after', (event) => {
    if (window.currentObject.subtype !== 'Gift' && window.currentObject.subtype !== 'Equipable'){
        form.show('sellPriceDemo')
        form.show('sellPriceDeductedPerUse')
        form.show('sellPriceUseExplanation')

        if (!window.currentObject.maxUses) {window.currentObject.maxUses = 25}
        let sellPriceDemo = document.getElementById('sellPriceDemo')
        console.log(sellPriceDemo)
        let sellPriceDemoSlider = sellPriceDemo.querySelector('#sellPriceDemoSlider')
        sellPriceDemoSlider.min = 0
        sellPriceDemoSlider.max = window.currentObject.maxUses
        sellPriceDemoSlider.value = window.currentObject.maxUses
        sellPriceDemoSlider.step = 1
        sellPriceDemoSlider.oninput = () => {
            sellPriceDemo.querySelector('#sellPriceDemoUses').innerText = 'Uses remaining: ' + sellPriceDemoSlider.value
            let sellPrice = (window.currentObject.sellPrice - (window.currentObject.sellPriceDeductedPerUse * (window.currentObject.maxUses - sellPriceDemoSlider.value))) < 1 ? 1 : (window.currentObject.sellPrice - (window.currentObject.sellPriceDeductedPerUse * (window.currentObject.maxUses - sellPriceDemoSlider.value)))
            sellPriceDemo.querySelector('p:last-of-type').innerText = 'Sell price: ' + sellPrice
        }
    } else {
        form.hide('sellPriceDemo')
        form.hide('sellPriceDeductedPerUse')
        form.hide('sellPriceUseExplanation')
    }
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorValueFields = form

form.updateGlobals()

export default form