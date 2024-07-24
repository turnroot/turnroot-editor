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
            html: {
                html: '<h2 style = "top:1rem;">Uses</h2>',
                column:0,
            }
        },
        {
            type: 'checkbox',
            field: 'hasUses',
            checked: true,
            html: {
                label: 'Has uses (durability)',
                class: 'emphasized-field',
                column: 0,
            }
        },
        {
            type: 'number',
            field: 'maxUses',
            html: {
                label: 'Max uses (durability)',
                column: 0,
            }
        },
        {
            type: 'html',
            html: {
                html: '<h2 style = "top:1rem;">Types</h2>',
                column:1,
            }
        },
        {
            field: 'minAptitude',
            type: 'select',
            options: {
                items: ['E', 'D', 'C', 'B', 'A', 'S']
            },
            html: {
                label: 'Minimum Aptitude',
                attr: 'style="width: 100%;"',
                column: 1,
            },
        },
        {
            type: 'html',
            field: 'minAptitudeDescription',
            html: {
                class: 'no-label',
                html: `<small>A unit must have this level or higher of aptitude with the weapon type to use this weapon.</small>`,
                column: 1,
            }
        },
        {
            field: 'weaponType',
            type: 'select',
            options: {items: window.globalWeaponsTypes[0].types.map(type => type.name)},
            html: {
                label: 'Weapon Type',
                column: 1,
            }
        },
        {
            field: 'magicType',
            type: 'select',
            hidden: true,
            options: {items: window.globalMagicTypes[0].types.map(type => type.name)},
            html: {
                label: 'Magic Type',
                column: 1,
            }
        },
        {
            type: 'html',
            field: 'weaponTypeDescription',
            html: {
                class: 'no-label',
                html: `<small>The type of weapon this item is.<sup aria-label="You can set weapon types in the Project editor." data-balloon-pos="up"><highlight>What if the types are wrong?</highlight></sup></small>`,
                column: 1,
            }
        },
        {
            type: 'html',
            field: 'magicTypeDescription',
            html: {
                class: 'no-label',
                html: `<small>The type of magic this item is.<sup aria-label="You can set magic types in the Project editor." data-balloon-pos="up"><highlight>What if the types are wrong?</highlight></sup></small>`,
                column: 1,
            }
        },
        {
            type: 'html',
            html: {
                html: '<h2 style = "top:1rem;">Specifics</h2>',
                column: 0,
            }
        },
        {
            field: 'scope',
            type: 'select',
            options: {items: ['combat', 'map', 'both']},
            html: {
                label: 'Scope',
                class: 'full-width',
                column: 0,
                attr: 'style="width: 100%;"',
            }
        },
        {
            type: 'html',
            field: 'scopeDescription',
            html: {
                html: '<small>Some items can be used in or out of combat, some can be used in one or the other. If you\'re unsure, leave it at \'both\'.</small>',
                column: 0,
            }
        },
        {
            field: 'replenishUsesAfterBattleAmount',
            type: 'select',
            options: {items: ['none', 'full', 'half', 'quarter']},
            html: {
                label: 'Replenish uses after battle',
                column: 0,
            }
        },
        {
            type: 'html',
            field: 'replenishUsesAfterBattleAmountDescription',
            html: {
                class: 'no-label',
                html: '<small>If applicable, you can set an item to regenerate uses after battle. None is standard behavior- uses are not regenerated. Full regenerates the item to full max uses. Half/quarter regenerates half/quarter the used uses per battle.<sup data-balloon-length="large" data-balloon-pos="bottom" aria-label = "I.e., a weapon with 20 uses that lost 8 durability during battle (12/20) would regenerate 4 durability (16/20) with half or 2 (14/20) with quarter."><highlight>?</highlight></sup></small>',
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

window.objectEditorUsageFields = form

form.updateGlobals()

export default form