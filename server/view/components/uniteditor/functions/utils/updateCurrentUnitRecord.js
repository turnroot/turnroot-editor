const updateCurrentUnitRecord = (n) => {

    window.unitEditorBasicFields.record['fullName'] = n.fullName
    window.unitEditorBasicFields.record['title'] = n.title
    window.unitEditorBasicFields.record['name'] = n.name
    window.unitEditorBasicFields.record['id'] = n.id
    
    window.unitEditorBasicFields.refresh()
}

export default updateCurrentUnitRecord