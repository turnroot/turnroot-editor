import {
    w2toolbar,
    w2prompt,
    w2alert,
    w2confirm
} from '../../lib/w2ui.es6.min.js'

import createNewIcon from './functions/icons/createNewIcon.js'
import deleteIcon from './functions/icons/deleteIcon.js'
window.IconEditorCreateNewIcon = createNewIcon
window.IconEditorDeleteIcon = deleteIcon

import updateCurrentIconRecord from './functions/utils/updateCurrentIconRecord.js'

let toolbar = new w2toolbar({
    name: 'IconEditorTopMenu',
    tooltip: 'bottom',
    items: [{
            type: 'button',
            id: 'new-icon',
            text: 'New icon',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },
        {
            type: 'button',
            id: 'search-icon',
            text: 'Choose icon',
            class: 'w2ui-btn',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>`
        },
        {
            type: 'spacer'
        },
        {
            type: 'button',
            id: 'delete-icon',
            text: 'Delete icon',
            class: 'w2ui-btn slider1',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        },
    ]
})

toolbar.on('click', function async (event) {
    event.done(async () => {

        if (event.detail.item.id === 'new-icon') {

            await window.IconEditorCreateNewIcon().then(n => {
                window.IconEditor.html('main', window.iconEditorEditor)
                window.allIcons.push(n)
                window.currentIcon = n

                updateCurrentIconRecord(n)

                return w2alert('New icon created')
            }).catch(e => {
                console.error(e)
            })
        } else if (event.detail.item.id === 'search-icon') {
            console.log(event)
            if (window.IconPicker) {
                window.IconPicker.coords = {x: event.detail.originalEvent.clientX, y: event.detail.originalEvent.clientY}
                window.IconPicker.show()
                window.currentIcon = await window.IconPicker.icon()
                updateCurrentIconRecord(window.currentIcon)
                window.IconEditor.refresh()
            } else {
                return w2alert('Error loading IconPicker')
            }
            
        } else if (event.detail.item.id === 'delete-icon') {
            if (window.allIcons.length === 0) {
                return w2alert('No icons to delete')
            }
            let icon = window.currentIcon
            w2confirm({
                title: 'Delete icon',
                body: `Are you sure you want to delete ${icon.name}?`,
                width: 300,
                height: 200,
            }).yes(async () => {
                updateCurrentIconRecord(window.currentIcon)
                await window.IconEditorDeleteIcon(icon.id).then(() => {
                    return w2alert('Icon deleted')
                }).catch(e => {
                    return w2alert('Error deleting icon')
                })
            })
        }
    })

})

export default toolbar