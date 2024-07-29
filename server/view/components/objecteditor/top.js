import {
    w2toolbar,
    w2prompt,
    w2alert,
    w2popup,
    w2confirm
} from '../../lib/w2ui.es6.min.js'

import createNewObject from './functions/objects/createNewObject.js'
import deleteObject from './functions/objects/deleteObject.js'
import getAllObjects from './functions/objects/getAllObjects.js'
window.ObjectEditorCreateNewObject = createNewObject
window.ObjectEditorDeleteObject = deleteObject

import updateCurrentObjectRecord from './functions/utils/updateCurrentObjectRecord.js'

import setNodes from './functions/sidebar/setNodes.js'

let nodes = []

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

let toolbar = new w2toolbar({
    name: 'ObjectEditorTopMenu',
    tooltip: 'bottom',
    items: [{
            type: 'button',
            id: 'new-object-weapon',
            text: 'New Weapon',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },

        {
            type: 'button',
            id: 'new-object-magic',
            text: 'New Magic',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },

        {
            type: 'button',
            id: 'new-object-equipable',
            text: 'New Equipable',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },

        {
            type: 'button',
            id: 'new-object-gift',
            text: 'New Gift',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },

        {
            type: 'button',
            id: 'new-object-consumable',
            text: 'New Consumable',
            class: "w2ui-btn accent",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },
        {
            type: 'label',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
            id: 'types-help',
            tooltip: 'Click to read about the different object types',
        },

        {type: 'spacer'},

        {
            type: 'button',
            id: 'delete-object',
            text: 'Delete object',
            class: 'w2ui-btn slider1',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        },
    ]
})

toolbar.on('click', function async (event) {
    event.done(async () => {

        if (event.detail.item.id === 'types-help') {
            w2popup.open({
                title: 'Object types',
                body: `<div style = "overflow-y:auto;height:100%;">
                <h4 style = "margin-top:.5rem">Weapon</h4>
                <p>Weapons are objects units use during combat to Attack. The most self-explanatory item type.</p>
                <h4 style = "margin-top:.5rem">Magic</h4>
                <p>Magic objects are used during combat to Heal, Attack, Assist, or Warp. Even if your game has a skill-based magic system, where magic does not have a set number of uses, it's still considered an object.</p>
                <h4 style = "margin-top:.5rem">Consumable</h4>
                <p>Consumables are objects that can be Used once or a certain number of times, then disappear. They can be used during combat or outside of combat. This includes objects like healing potions, cooking ingredients, forging items, class change seals, edible stat growth items, etc.</p>
                <h4 style = "margin-top:.5rem">Equipable</h4>
                <p>Equipables are objects that can be Equipped to a unit to provide stat boosts, skills, or other effects. This includes objects like shields, magic staffs, rings, etc. Equipables do not have uses and are not actively Used- they provide passive benefits.</p>
                <h4 style = "margin-top:.5rem">Gift</h4>
                <p>Gifts are objects that can be given to other units. This includes objects like flowers, food, lost items, etc. <highlight>Note:</highlight> if you've disabled gift options globally in your game settings, you cannot make an object a gift.</p>
                </div>
                `,
                width:'700',
                height:'600',
                actions: ['Ok']
            }).ok(() => {
                w2popup.close()
            })
        } else if (event.detail.item.id === 'delete-object') {
            if (window.allObjects.length === 0) {
                return w2alert('No objects to delete')
            }
            let object = window.currentObject
            w2confirm({
                title: 'Delete object',
                body: `Are you sure you want to delete ${object.name}?`,
                width: 300,
                height: 200,
            }).yes(async () => {
                updateCurrentObjectRecord(window.currentObject)
                if (window.currentObject.subtype === 'Weapon') {
                    window.allObjects.objectWeapons = window.allObjects.objectWeapons.filter(o => o.id !== object.id)
                } else if (window.currentObject.subtype === 'Consumable') {
                    window.allObjects.objectConsumables = window.allObjects.objectConsumables.filter(o => o.id !== object.id)
                } else if (window.currentObject.subtype === 'Equipable') {
                    window.allObjects.objectEquipables = window.allObjects.objectEquipables.filter(o => o.id !== object.id)
                } else if (window.currentObject.subtype === 'Gift') {
                    window.allObjects.objectGifts = window.allObjects.objectGifts.filter(o => o.id !== object.id)
                }
                window.allObjects.all = window.allObjects.all.filter(o => o.id !== object.id)

                setNodes(window.ObjectEditorLeftSidebar)
                window.ObjectEditor.refresh()
                window.ObjectEditorLeftSidebar.refresh()

                await window.ObjectEditorDeleteObject(object.id).catch(e => {
                    return w2alert('Error deleting object')
                })
            })
        } else {
            let s = c(event.detail.item.id.split('-')[2])
            console.log(s)
            w2prompt({
                title: 'Create new object',
                label: 'Enter the name of your object. This name will be used to identify the object in the editor. It doesn\'t have to be unique.',
            }).ok(async (event) => {

                if (event.detail.value === '') {
                    event.preventDefault()
                } else {
                    getAllObjects().then(allObjects => {
                        window.allObjects = allObjects
                    })

                    await window.ObjectEditorCreateNewObject(event.detail.value, s).then(n => {
                        window.ObjectEditor.html('main', window.objectEditorBasicFields)
                        if (n.subtype === 'Weapon') {
                            window.allObjects.objectWeapons.push(n)
                        } else if (n.subtype === 'Consumable') {
                            window.allObjects.objectConsumables.push(n)
                        } else if (n.subtype === 'Equipable') {
                            window.allObjects.objectEquipables.push(n)
                        } else if (n.subtype === 'Gift') {
                            window.allObjects.objectGifts.push(n)
                        } else if (n.subtype === 'Magic') {
                            window.allObjects.objectMagic.push(n)
                        }
                        window.allObjects.all.push(n)
                        window.currentObject = n

                        updateCurrentObjectRecord(n)

                        setNodes(window.ObjectEditorLeftSidebar)

                        window.ObjectEditor.refresh()
                        window.ObjectEditorLeftSidebar.refresh()

                        return w2alert('New object created')
                    }).catch(e => {
                        console.error(e)
                    })
                }
            })
        }
    })

})

export default toolbar