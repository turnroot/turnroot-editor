const updateCurrentIconRecord = async(n) => {
    window.currentIcon = n
    if (!window.currentIcon || window.currentIcon === undefined){
        console.log('no icon to update')
        return
    }
    console.log('updating current icon record ', n.id)
    window.iconEditorEditor.refresh()
}

export default updateCurrentIconRecord