import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleEnemy.js'

let config = {
    name: 'unit-editor-enemy-fields',
    record: {},
    fields: [
        {
            type: 'html',
            html: {
                html: '<div><h2>Uniques</h2><small>Set classes, items, and skills only this unit can have. Personal skills and classes are set here.</br></br>If there are no classes, items, or skills available to select, you can create them by clicking Skills, Items, or Classes on the left sidebar.</small></div>'
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique skills</h3>',
            }
        },
        {
            field: 'enemy-unique-skills',
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
            field: 'enemy-unique-classes',
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
            field: 'enemy-unique-items',
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
        }
    ]
}

let form = new w2form(config)

form.updateGlobals = () => {
    window.turnrootEditorLogs.push(`${new Date()}||info||Updating Enemy form globals`)
    form.refresh()
}

form.updateGlobals()

form.on('change', function (event) {
    handleEvent(event, form)
})

export default form