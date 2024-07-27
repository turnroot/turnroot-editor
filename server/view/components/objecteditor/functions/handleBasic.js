const handleEvent = (form, event, automated = false) => {
    let field = event.detail.field
    let value = event.detail.value.current

    window.currentObject[field] = value
    form.record[field] = value
        
    form.refresh()
    window.updateQueue('Object', 'updateSubtype', form.record)
}


export default handleEvent