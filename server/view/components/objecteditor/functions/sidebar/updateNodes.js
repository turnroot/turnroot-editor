const updateNodes = () => {
    if (window.allObjects.objectWeapons.length > 0){

        window.ObjectEditorLeftSidebar.nodes[0].nodes = window.allObjects.objectWeapons.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        window.ObjectEditorLeftSidebar.nodes[0].nodes[0].selected = true
        }

        if (window.allObjects.objectConsumables.length > 0){
            window.ObjectEditorLeftSidebar.nodes[1].nodes = window.allObjects.objectConsumables.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }
        if (window.allObjects.objectEquipables.length > 0){
            window.ObjectEditorLeftSidebar.nodes[2].nodes = window.allObjects.objectEquipables.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }
        if (window.allObjects.objectGifts.length > 0){
            window.ObjectEditorLeftSidebar.nodes[3].nodes = window.allObjects.objectGifts.map(object => ({id: object.id, text: object.name + ' ' + object.id}))
        }

        window.ObjectEditorLeftSidebar.render()
        window.ObjectEditorActiveTab = 'basic'
}

export default updateNodes