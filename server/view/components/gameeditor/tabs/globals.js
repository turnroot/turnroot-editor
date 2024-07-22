import { w2form } from "../../../lib/w2ui.es6.min.js"
import weaponTypesPopup from '../functions/modals/weaponTypes.js'
import weaponTrianglesPopup from '../functions/modals/weaponTriangles.js'
import magicTypesPopup from '../functions/modals/magicTypes.js'

let config = {
    name: 'game-editor-global-fields',
    record: {},
    fields: [
        {
            type: 'html',
            html: {
                html: '<h3 style = "margin-top:2rem;padding-top:.5rem;">General</h3>',
            }
        }
    ]
}

import handleGlobals from '../functions/handleGlobals.js'

import { booleans, integers, strings, json, lists, misc } from "../../../lib/globals.js"
import labels from "../../../lib/globalsLabels.js"
import tooltips from "../../../lib/tooltips.js"

config.fields.push({
    field: 'UseWeatherOnLevels',
    type: 'checkbox',
    attr:'style="width:100%"',
    html: {
        text: tooltips['UseWeatherOnLevels'] ? labels["UseWeatherOnLevels"] + '<sup><highlight class="tooltip" aria-label="' + tooltips["UseWeatherOnLevels"] + '" data-balloon-pos="up">?</highlight></sup>' : labels["UseWeatherOnLevels"],
        class: 'no-label',
        style: 'width:100%;',
        column: 0
    }
})
config.record["UseWeatherOnLevels"] = window["UseWeatherOnLevels"]

let booleansHeadingsAfter = {
    useExperienceAptitudes: 'Combat',
    combatAdjutantAttack: "Unit stats",
    statsUseExtraStatCharm: 'Aptitudes'
}

let integersHeadingsAfter = {
    combatBattalionLimit: 'Avatar defaults',
}

let stringsHeadingsAfter = {
    unitEditorAvatarDefaultHairStyle: 'Weapons'
}

booleans.forEach(property => {

    config.fields.push({
        field: property,
        type: 'checkbox',
        attr:'style="width:100%"',
        html: {
            text: tooltips[property] ? labels[property] + '<sup><highlight class="tooltip" aria-label="' + tooltips[property] + '" data-balloon-pos="up">?</highlight></sup>' : labels[property],
            class: 'no-label',
            style: 'width:100%;',
            column: 0
        }
    })
    config.record[property] = window[property]
    if (booleansHeadingsAfter[property]) {
        config.fields.push(
            {
                type: 'html',
                html: {
                    html: `<h3 style = "margin-top:2rem;padding-top:.5rem;">${booleansHeadingsAfter[property]}</h3>`,
                    class: 'no-label',
                    column: 0
                }
            }
        )
    }
})

config.fields.push({
    type: 'html',
    html: {
        html: '<h3 style = "margin-top:2rem;padding-top:.5rem;">Combat</h3>',
        class: 'no-label',
        column: 1
    }

})

integers.forEach(property => {
    config.fields.push({
        field: property,
        type: 'int',
        html: {
            text: tooltips[property] ? labels[property] + '<sup><highlight class="tooltip" aria-label="' + tooltips[property] + '" data-balloon-pos="up">?</highlight></sup>' : labels[property],
            class: 'no-label',
            column: 1,
        }
    })
    config.record[property] = window[property]
    if (integersHeadingsAfter[property]) {
        config.fields.push(
            {
                type: 'html',
                html: {
                    html: `<h3 style = "margin-top:2rem;padding-top:.5rem;">${integersHeadingsAfter[property]}</h3>`,
                    class: 'no-label',
                    column: 1
                }
            }
        )
    }
})

strings.forEach(property => {
    config.fields.push({
        field: property,
        type: 'text',
        html: {
            text: tooltips[property] ? labels[property] + '<sup><highlight class="tooltip" aria-label="' + tooltips[property] + '" data-balloon-pos="up">?</highlight></sup>' : labels[property],
            class: 'no-label',
            column: 1
        }
    })
    config.record[property] = window[property]
    if (stringsHeadingsAfter[property]) {
        config.fields.push(
            {
                type: 'html',
                html: {
                    html: `<h3 style = "margin-top:2rem;padding-top:.5rem;">${stringsHeadingsAfter[property]}</h3>`,
                    class: 'no-label',
                    column: 1
                }
            }
        )
    }
})

config.fields.push({
    type: 'html',
    html: {
        html: '<button class="w2ui-btn accent big" onclick="window.GameEditorWeaponTypesPopup()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-swords"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>Weapon types</button>',
        column: 1
    }
})

config.fields.push({
    type: 'html',
    html: {
        html: '<button class="w2ui-btn accent big" onclick="window.GameEditorMagicTypesPopup()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>Magic types</button>',
        column: 1
    }
})

config.fields.push({
    field: 'weaponTrianglesButton',
    type: 'html',
    html: {
        html: '<button class="w2ui-btn accent big" onclick="window.GameEditorWeaponTrianglesPopup()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>Weapon/magic triangles</button>',
        class: 'no-label',
        column: 1
    },
    hidden: false
})


let form = new w2form(config)

window.GameEditorGlobalFields = form

form.on('change', function(event) {
    handleGlobals(event, form)
})

export default form