const handleTab = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current
    let subtype = window.objectEditorBasicFields.record.subtype

    window.currentObject[field] = value
    form.record[field] = value

    if (field === 'upperRange'){
        if (value < window.currentObject.lowerRange){
            w2alert('Upper range must be greater than lower range')
            window.currentObject.upperRange = window.currentObject.lowerRange
            window.objectEditorUsageFields.record.upperRange = window.currentObject.lowerRange
            window.objectEditorUsageFields.refresh()
        }
    } else if (field === 'lowerRange'){
        if (value > window.currentObject.upperRange){
            w2alert('Lower range must be less than upper range')
            window.currentObject.lowerRange = window.currentObject.upperRange
            window.objectEditorUsageFields.record.lowerRange = window.currentObject.upperRange
            window.objectEditorUsageFields.refresh()
        }
    } else if (field === 'rangeAdjustedByStat'){
        if (value){
            window.objectEditorUsageFields.show('rangeAdjustedByStatName')
            window.objectEditorUsageFields.show('rangeAdjustedByDivisor')
            window.objectEditorUsageFields.hide('lowerRange')
            window.objectEditorUsageFields.hide('upperRange')
        } else {
            window.objectEditorUsageFields.hide('rangeAdjustedByStatName')
            window.objectEditorUsageFields.hide('rangeAdjustedByDivisor')
            window.objectEditorUsageFields.show('lowerRange')
            window.objectEditorUsageFields.show('upperRange')
        }
    }

    window.updateQueue('Object', 'updateObject', window.currentObject)
}

export default handleTab