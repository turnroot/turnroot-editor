const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

const updateCurrentObjectRecord = async(n) => {
    window.currentObject = n
    if (!window.currentObject || window.currentObject === undefined){
        console.log('no object to update')
        return
    }
    console.log('updating current object record ', n.id)

    
    window.objectEditorBasicFields.refresh()
}

export default updateCurrentObjectRecord