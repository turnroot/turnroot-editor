import {
    w2toolbar,
    w2ui
} from '../../lib/w2ui.es6.min.js'

let toolbar = new w2toolbar({
    name: 'UnitEditorTopMenu',
    tooltip: 'bottom',
    items: [
        {type: 'button',
        id: 'new-unit',
        text: 'New unit',
        class: "w2ui-btn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },
        {type: 'button',
        id: 'unit-checklist',
        text: 'Unit checklist',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>',
        },
        {type: 'spacer'},
        {type: 'button',
        id: 'delete-unit',
        text: 'Delete unit',
        class: 'w2ui-btn slider1',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        },
    ]
})

toolbar.on('click', function (event) {
    event.done(() => {
        window.turnrootEditorLogs.push(`${new Date()}||info||Unit toolbar button clicked: ${JSON.stringify(event.target)}`)
    })

})

export default toolbar