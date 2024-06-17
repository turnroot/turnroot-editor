import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleBasic.js'

import globalStats from '../functions/globals/getGlobalStats.js'

let config = {
    name: 'unit-editor-basic-fields',
    record: {
        name: 'New Unit',
        pronouns: 'they/them/their/theirs',
        subtype: 'Avatar',
        notes: '',
        age: 18,
        orientation: 'straight',
        canSSupport: true,
        canHaveChildren: true,
        height: 168,
        birthdayDay: 1,
        birthdayMonth: 1,
        shortBio: '',
        useAccentColors: false,
    },
    fields: [{
            field: '',
            type: 'html',
            html: {
                html: '<h2>Basic Info</h2>',
                column: 0,
            }
        },
        {
            field: 'name',
            type: 'text',
            html: {
                label: 'Unit name',
                attr: '',
                column: 0,
            }
        },
        {
            field: 'pronouns',
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
            field: 'subtype',
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
            field: 'age',
            type: 'int',
            options: {
                min: 0
            },
            html: {
                label: 'Age',
                column: 0,
            }
        },
        {
            field: 'orientation',
            type: 'select',
            html: {
                label: 'Orientation',
                attr: '',
                column: 0,
            },
            options: {
                items: [
                    'straight',
                    'gay/lesbian',
                    'bisexual',
                    'pansexual',
                    'asexual',
                ]
            }
        },
        {
            field: 'canSSupport',
            type: 'checkbox',
            disabled: false,
            html: {
                label: 'Can S-Support',
                column: 0,
            }
        },
        {
            field: "canHaveChildren",
            type: 'checkbox',
            html: {
                label: 'Can have children',
                column: 0,
            }
        },
        {
            field: 'height',
            type: 'int',
            options: {
                min: 32,
                max: 214
            },
            html: {
                label: 'Height (cm)',
                column: 0,
            }
        },
        {
            field: 'base-stats-header',
            type: 'html',
            html: {
                class: 'no-label',
                html: '<h2>Base Stats</h2>',
                column: 1,
            }
        },
        {
            field: 'birthdayDay',
            type: 'int',
            options: {
                min: 1,
                max: 31
            },
            html: {
                label: 'Birthday Day',
                column: 0,
            }
        },
        {
            field: 'birthdayMonth',
            type: 'int',
            options: {
                min: 1,
                max: 12
            },
            html: {
                label: 'Birthday Month',
                column: 0,
            }
        },
    ],
}

globalStats.forEach((stat, index) => {
    config.fields.push({
            field: stat.field,
            type: 'int',
            options: {
                min: 0
            },
            html: {
                label: stat.html.label,
                attr: 'style="width:2rem"',
                column: 1,
            }
        }),
        config.record[stat.field] = 0
})

config.fields.push({
    type: 'html',
    field: 'growth-rates',
    class: 'no-label',
    html: {
        class: 'no-label',
        html: "<button class='w2ui-btn'>Growth Rates</button>",
        column: 1,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'textarea',
    field: 'notes',
    html: {
        label: 'Notes',
        attr: '',
        column: 2,
    },
})

config.fields.push({
    type: 'html',
    html: {
        html: "<em><small>Notes are just for you, they're not added to your game</small></em>",
        column: 2,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'textarea',
    field: 'shortBio',
    html: {
        label: 'Short Bio',
        attr: '',
        column: 2,
    },
})

config.fields.push({
    type: 'html',
    html: {
        html: "<em><small>Color class sprites with unique unit colors</small></em>",
        column: 2,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'checkbox',
    field: 'useAccentColors',
    html: {
        label: 'Use accent colors',
        attr: '',
        column: 2,
    }
})

config.fields.push({
    type: 'html',
    field: 'unit-accent-color-1',
    hidden: true,
    html: {
        label: 'Accent color 1',
        attr: '',
        column: 2,
        html: '<input type="color" value="#000000">',
    },
})

config.fields.push({
    type: 'html',
    field: 'unit-accent-color-2',
    hidden: true,
    html: {

        label: 'Accent color 2',
        attr: '',
        column: 2,
        html: '<input type="color" value="#000000">',
    },
})

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.updateGlobals = () => {
    if (!window.unitsCanHaveChildren) {
        form.fields.find(field => field.field === 'canHaveChildren').hidden = true
    } else {
        form.fields.find(field => field.field === 'canHaveChildren').hidden = false
    }
}

form.updateGlobals()

export default form