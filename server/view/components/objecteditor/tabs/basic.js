import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleBasic.js'

let config = {
    name: 'object-editor-basic-fields',
    record: {
        subtype: 'Weapon',
    },
    fields: [{
            type: 'radio',
            field: 'subtype',
            html: {
                label: 'Subtype',
            },
            options: {
                items: ['Weapon', 'Consumable', 'Equipable', 'Gift']
            }
        },
        {
            type: 'html',
            html: {
                html: `<details><summary>What is each type?</summary>
                <h4>Weapon</h4>
                <p>Weapons are objects units use during combat to Attack. The most self-explanatory item type.</p>
                <h4>Consumable</h4>
                <p>Consumables are objects that can be Used once or a certain number of times, then disappear. They can be used during combat or outside of combat. This includes objects like healing potions, cooking ingredients, class change seals, edible stat growth items, etc.</p>
                <h4>Equipable</h4>
                <p>Equipables are objects that can be Equipped to a unit to provide stat boosts, skills, or other effects. This includes objects like shields, magic staffs, rings, etc. Equipables do not have uses and are not actively Used- they provide passive benefits.</p>
                <h4>Gift</h4>
                <p>Gifts are objects that can be given to other units. This includes objects like flowers, food, lost items, etc. <highlight>Note:</highlight> if you've disabled gift options globally in your game settings, you cannot make an object a gift.</p>
                </details>`
            }
        },
        {
            type: 'html',
            html: {
                html: '<hr style = "margin-top:.5rem;margin-bottom:.5rem;"/>'
            }
        },
        {
            type: 'text',
            id: 'name',
            html: {
                label: 'Name'
            }
        },
        {
            type: 'text',
            id: 'flavorText',
            html: {
                label: 'Flavor Text'
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