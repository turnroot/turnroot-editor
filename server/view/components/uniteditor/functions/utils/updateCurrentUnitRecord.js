const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

import handleEvent from '../handleBasic.js'

const updateCurrentUnitRecord = (n) => {
    window.unitEditorBasicFields.record['fullName'] = n.fullName
    window.unitEditorBasicFields.record['title'] = n.title
    window.unitEditorBasicFields.record['name'] = n.name
    window.unitEditorBasicFields.record['id'] = n.id
    window.unitEditorBasicFields.record['subtype'] = c(n.which)

    handleEvent(window.unitEditorBasicFields, {detail: {field: 'subtype', value: {current: c(n.which)}}}, true)
    
    window.unitEditorBasicFields.refresh()
}

export default updateCurrentUnitRecord