import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleAvatar.js'
import hairColorsHtml from '../functions/colors/hairColors.js'
import eyeColorsHtml from '../functions/colors/eyeColors.js'

import globalExperiences from '../functions/globals/getGlobalExperiences.js'

let config = {
    name: 'unit-editor-avatar-fields',
    record: {},
    fields: [{
            type: 'html',
            html: {
                html: '<div><h2>Uniques</h2><small>Set classes, items, and skills only this unit (or their children, if inheritance is on), can have. Personal skills and classes are set here.</br></br>If there are no classes, items, or skills available to select, you can create them by clicking Skills, Items, or Classes on the left sidebar.</small></div>'
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique skills</h3>',
            }
        },
        {
            field: 'unique-skills',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique classes</h3>',
            }
        },
        {
            field: 'unique-classes',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique items</h3>',
            }
        },
        {
            field: 'unique-items',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h2>Base aptitudes</h2>',
                column: 0
            }
        },
        {
            type: 'html',
            html: {
                html: '<div><h2>Appearance</h2><small>Set the options that the player will have to customize their avatar\'s appearance. Right-click to set the default. Click to delete.</small></div>',
                column: 1
            }
        },
        {
            type: 'html',
            html: {
                html: `<div><h3>Hair colors</h3><small>Default: <span style = "width:2remheight:1rembackground-color:${window.unitEditorAvatarDefaultHairColor}display:inline-blockborder-radius:.25rem"</small></div>`,
                column: 1
            }
        },
        {
            type: 'html',
            field: 'hair-colors',
            html: {
                class: 'no-label',
                attr: 'style="width:12rem"',
                column: 1,
                html: hairColorsHtml,
            },
        },
        {
            type: 'html',
            html: {
                html: `<div><h3>Eye colors</h3><small>Default: <span style = "width:2remheight:1rembackground-color:${window.unitEditorAvatarDefaultEyeColor}display:inline-blockborder-radius:.25rem"</small></div>`,
                column: 1
            }
        },
        {
            type: 'html',
            field: 'eye-colors',
            html: {
                class: 'no-label',
                attr: 'style="width:12rem"',
                column: 1,
                html: eyeColorsHtml,
            },
        },
    ],
}

config.fields.push({
    type: 'html',
    html: {
        html: window.useExperienceAptitudes ? '<small>Set this unit\'s starting aptitudes, as well as their affinity for them (positive, negative, or neutral).</br>A positive affinity means this unit will learn it faster, a negative means slower.</small>' : '<small>Set this unit\'s starting aptitudes.</small>',
        column: 0
    }
})

globalExperiences.forEach((experience, index) => {
    experience.field = 'avatar-base-aptitudes-' + experience.field.toLowerCase()
    experience.html.group = experience.field
    experience.html.class = 'group-flex'
    config.fields.push(
        experience
    )
    config.fields.push({
        type: 'radio',
        field: experience.field + 'starting-affinity',
        options: {
            items: ['None', '-', '+']
        },
        html: {
            column: 0
        }
    })
    config.record[experience.field] = 'E'
    config.record[experience.field + 'starting-affinity'] = 'None'
})

let form = new w2form(config)

form.updateGlobals = () => {
    let toHide
    if (!window.useExperienceAptitudes) {
        toHide = form.fields.filter(field => field.field?.includes('affinity'))
        toHide.forEach(field => field.html.hidden = true)
    } else {
        toHide = form.fields.filter(field => field.field?.includes('affinity'))
        toHide.forEach(field => field.html.hidden = false)
    }
    if (!window.useExperienceSublevels){
        globalExperiences.forEach((experience, index) => {
            if (experience.options){
                experience.options.items = ['E', 'D', 'C', 'B', 'A', 'S']
                let existingFormField = form.fields.filter(field => field.field?.includes(experience.field.toLowerCase()))[0]
                existingFormField = form.get(existingFormField.field)
                existingFormField.options.items = ['E', 'D', 'C', 'B', 'A', 'S']
            }
        })
    } else {
        globalExperiences.forEach((experience, index) => {
            if (experience.options){
                experience.options.items = ['E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S']
                let existingFormField = form.fields.filter(field => field.field?.includes(experience.field.toLowerCase()))[0]
                existingFormField = form.get(existingFormField.field)
                existingFormField.options.items = ['E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S']
            }
        })
    }
    form.refresh()
}

window.UnitEditorAvatarFields = form

form.updateGlobals()

form.on('change', function (event) {
    handleEvent(event, form)
})

export default form