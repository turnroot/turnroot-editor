const setNodes = (objectEditorLeft) => {
    console.log('updating sidebar', objectEditorLeft)
    try{
    objectEditorLeft.remove()
    objectEditorLeft.nodes = [{
            id: 'weapons',
            text: 'Weapons',
            expanded: true,
            group: true,
            groupShowHide: true,
            nodes: window.allObjects.objectWeapons.map(object => {
                return {
                    id: object.id,
                    text: object.name + ' (' + object.id + ')'
                }
            })
        },
        {
            id: 'magic',
            text: 'Magic',
            expanded: true,
            group: true,
            groupShowHide: true,
            nodes: window.allObjects.objectMagic.map(object => {
                return {
                    id: object.id,
                    text: object.name + ' (' + object.id + ')'
                }
            })
        },
        {
            id: 'consumables',
            text: 'Consumables',
            expanded: true,
            group: true,
            groupShowHide: true,
            nodes: window.allObjects.objectConsumables.map(object => {
                return {
                    id: object.id,
                    text: object.name + ' (' + object.id + ')'
                }
            })
        },
        {
            id: 'equipables',
            text: 'Equipables',
            expanded: true,
            group: true,
            groupShowHide: true,
            nodes: window.allObjects.objectEquipables.map(object => {
                return {
                    id: object.id,
                    text: object.name + ' (' + object.id + ')'
                }
            })
        },
        {
            id: 'gifts',
            text: 'Gifts',
            expanded: true,
            group: true,
            groupShowHide: true,
            nodes: window.allObjects.objectGifts.map(object => {
                return {
                    id: object.id,
                    text: object.name + ' (' + object.id + ')'
                }
            })
        },
    ]
    console.log(objectEditorLeft.nodes)} 
    catch(e){
        console.error(e)
    }
}

export default setNodes