import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleTab from '../functions/handleTab.js'

let config = {
    name: 'object-editor-usage-fields',
    record: {
        'consumableEffectStatAmount': 0,
    },
    fields: [
        {
            type: 'html',
            html: {
                html: '<h2>Uses</h2>',
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
                html: '<h2>Types</h2>',
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
                html: '<h2>Specifics</h2>',
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
                class: 'no-label',
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
                html: '<small>If applicable, you can set an item to regenerate uses after battle. None is standard behavior- uses are not regenerated. Full regenerates the item to full max uses. Half/quarter regenerates half/quarter the used uses per battle.<sup data-balloon-length="large" data-balloon-pos="bottom" aria-label = "I.e., a weapon with 20 uses that lost 8 durability during battle (12/20) would regenerate 4 durability (16/20) with half or 2 (14/20) with quarter. If you wanted magic to regenerate fully after each battle, you\'d set Full for your magic objects."><highlight>?</highlight></sup></small>',
                column: 0,
            }
        },
        {
            type: 'html',
            field: 'combatHeading',
            html: {
                html: '<h2>Combat</h2>',
                class: 'no-label',
            }
        },
        {
            field: 'rangeAdjustedByStat',
            type: 'checkbox',
            html: {
                label: 'Range set by a stat<sup aria-label="For example, if you want your long-distance Heal magic to have a range of Mag/4, you would turn this on." data-balloon-pos="right" data-ballooon-size="large"><highlight>?</highlight></sup>',
                class: 'emphasized-field',
                column:0,
            }
        },
        {
            field: 'rangeAdjustedByStatName',
            type: 'select',
            options: {items: ['Magic', 'Strength', 'Defense', 'Speed', 'Resistance', 'HP']},
            hidden: true,
            html: {
                label: ' Which stat? ',
                column:0,

            }
        },
        {
            field: 'rangeAdjustedByDivisor',
            type: 'select',
            hidden: true,
            options: {items: [1,2,3,4,5]},
            html: {
                label: 'Upper range is stat divided by ',
                column:0,
            }
        },
        {
            type: 'select',
            options: {
                items: [1,2]
            },
            field: 'lowerRange',
            html: {
                label: 'Range: from ',
                text: '%attach1%',
                column:0,
            }
        },
        {
            type: 'select',
            options: {
                items: [1,2,3,4,5,6,7,8,9,10]
            },
            field: 'upperRange',
            html: {
                anchor: '%attach1%',
                label: 'to ',
                column:0,
            }
        },
        {
            type: 'html',
            field: 'effectsHeader',
            html: {
                html: '<h2>Effects</h2>',
                class: 'no-label',
                column: 1,
            }
        },
        {
            type: 'html',
            field: 'consumableEffectsHeading',
            hidden: true,
            html: {
                html: `<h3>Consumable Effect</h3>
                <p>
                This item will affect %attach4% by %attach5% %attach6% 
                </p>`,
                class: 'no-label',
                column: 1,
            }
        },
        {
            field: 'consumableEffectAffectScope',
            type: 'select',
            hidden: true,
            options: {items: ['an object', 'the unit', 'the battlefield', 'all units', 'the world map']},
            html: {
                label: '',
                anchor: '%attach4%',
                class: 'no-label',
            }
        },
        {
            field: 'consumableEffectAffectWhat',
            type: 'select',
            hidden: true,
            options: {items: []},
            html: {
                label: '',
                anchor: '%attach5%',
                class: 'no-label',
            }
        },
        {
            field: 'consumableEffectDuration',
            type: 'select',
            hidden: true,
            options: {
                items: [
                    'permanently',
                    'once on use',
                    'for the rest of the turn',
                    'for the rest of the battle',
                    'for two turns',
                    'for three turns',
                    'for four turns',
                    'for five turns',
                    'for six turns',
                    'for seven turns',
                    'for eight turns',
                    'for nine turns',
                    'for ten turns',
                ]
            },
            html: {
                label: '',
                anchor: '%attach6%',
                class: 'no-label',
            }
        },
        {
            field: 'consumableEffectDetails',
            type: 'html',
            html: {
                html: `<h3>Effect Details</h3>`,
                class: 'no-label',
                column: 1,
                label: '',
            }
        },
        {
            field: "consumableEffectStatWhich",
            type: 'enum',
            hidden: true,
            html: {
                label: 'Which stats?',
                column: 1,
            },
            options: {
                items: []
            }
        },
        {
            field: 'consumableEffectStatAmount',
            type: 'number',
            hidden: true,
            html: {
                label: 'How much?',
                column: 1,
                attr: 'min="0"',
            },
        }


    ]
}

let form = new w2form(config)

form.on('change', (event) => {
    handleTab(form, event)
})

form.on('render:after', (event) => {
    if (window.currentObject.subtype !== "Consumable"){
        form.hide('consumableEffectStatWhich')
        form.hide('consumableEffectStatAmount')
        form.hide('consumableEffectDuration')
        form.hide('consumableEffectAffectWhat')
        form.hide('consumableEffectDetails')
        form.hide('consumableEffectsHeading')
    }
})

form.updateGlobals = () => {
    form.refresh()
}

window.objectEditorUsageFields = form

form.updateGlobals()

export default form