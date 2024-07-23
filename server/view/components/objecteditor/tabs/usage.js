import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'
import { subtypeWeaponRecord } from '../records/subtypeRecords.js'
import commonRecord from '../records/commonRecord.js'

let config = {
    name: 'object-editor-usage-fields',
    record: {
    },
    fields: [
        {
            type: 'html',
            html: {html: '<h2>Details</h2>'}
        },
        {
            field: 'minAptitude',
            type: 'select',
            options: {
                items: ['E', 'D', 'C', 'B', 'A', 'S']
            },
            html: {
                label: 'Minimum Aptitude',
                attr: 'style="width: 100%;"'
            },
        },
        {
            type: 'html',
            field: 'minAptitudeDescription',
            html: {
                class: 'no-label',
                html: `<small>A unit must have this level or higher of aptitude with the weapon type to use this weapon.</small>`
            }
        },
        {
            field: 'weaponType',
            type: 'select',
            options: {items: window.globalWeaponsTypes[0].types.map(type => type.name)},
            html: {
                label: 'Weapon Type',
            }
        },
        {
            field: 'magicType',
            type: 'select',
            hidden: true,
            options: {items: window.globalMagicTypes[0].types.map(type => type.name)},
            html: {
                label: 'Magic Type',
            }
        },
        {
            type: 'html',
            field: 'weaponTypeDescription',
            html: {
                class: 'no-label',
                html: `<small>The type of weapon this item is.<sup aria-label="You can set weapon types in the Project editor." data-balloon-pos="up"><highlight>What if the types are wrong?</highlight></sup></small>`
            }
        },
        {
            type: 'html',
            field: 'magicTypeDescription',
            html: {
                class: 'no-label',
                html: `<small>The type of magic this item is.<sup aria-label="You can set magic types in the Project editor." data-balloon-pos="up"><highlight>What if the types are wrong?</highlight></sup></small>`
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

window.objectEditorUsageFields = form

form.updateGlobals()

export default form