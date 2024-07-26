const updateCurrentIconRecord = async(n) => {
    window.currentIcon = n
    if (!window.currentIcon || window.currentIcon === undefined){
        console.log('no object to update')
        return
    }
    console.log('updating current object record ', n.id)
    window.iconEditorEditor.refresh()
}

export default updateCurrentIconRecord