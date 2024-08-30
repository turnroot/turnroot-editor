const handleTab = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value.current

    window.currentObject[field] = value
    form.record[field] = value

    if (field === 'upperRange'){
        if (value < window.currentObject.lowerRange){
            w2alert('Upper range must be greater than lower range')
            window.currentObject.upperRange = window.currentObject.lowerRange
            window.objectEditorUsageFields.record.upperRange = window.currentObject.lowerRange
            window.objectEditorUsageFields.refresh()
        }
    } else if (field === 'lostItem'){
        if (value){
            window.objectEditorGiftFields.show('belongsTo')
        } else {
            window.objectEditorGiftields.hide('belongsTo')
        }
    } else if (field === 'unitsLove') {
        if (value === window.currentObject.unitsHate){
            w2alert('Units that love this gift cannot also hate it')
            window.currentObject.unitsLove = null
            window.objectEditorGiftFields.record.unitsLove = event.detail.value.previous
            window.objectEditorGiftFields.refresh()
        }
    } else if (field === 'consumableEffectAffectScope') {
        let what = form.get('consumableEffectAffectWhat')
        if (value === 'an object'){
            what.options.items = ['repairing an item', 'forging an item']
            form.hide('consumableEffectStatWhich')
            form.hide('consumableEffectStatAmount')
            form.hide('consumableEffectDuration')
        } else if (value === 'the unit'){
            what.options.items = ['increasing stats', 'decreasing stats', 'changing class', 'adding a status', 'removing a status', 'healing', 'warping', 'summoning a unit']
        }
        else if (value === 'the battlefield'){
            what.options.items = ['changing the battlefield map', 'opening a door', 'opening a chest', 'changing visibilty', 'triggering a game event', 'changing the weather']
            form.hide('consumableEffectStatWhich')
            form.hide('consumableEffectStatAmount')
        }
        else if (value === 'all units'){
            what.options.items = ['increasing stats', 'decreasing stats', 'adding a status', 'removing a status', 'healing']
        }
        else if (value === 'the world map'){
            what.options.items = ['changing the world map', 'triggering a game event']
            form.hide('consumableEffectStatWhich')
            form.hide('consumableEffectStatAmount')
            form.hide('consumableEffectDuration')
        }
        window.objectEditorUsageFields.refresh()
    } else if (field === "consumableEffectAffectWhat"){
        console.log(value)
        let permanents = [
            'repairing an item',
            'forging an item',
            'opening a door',
            'opening a chest',
            'changing the battlefield map',
            'changing the world map',
            'triggering a game event'
        ]

        let isPermanent = permanents.includes(value)

        if (isPermanent) {
            form.hide('consumableEffectDuration')
            form.record.consumableEffectDuration = "permanent"
        } else {
            form.show('consumableEffectDuration')
        }

        if (value === 'increasing stats' || value === 'decreasing stats'){
            form.show('consumableEffectStatWhich')
            form.show('consumableEffectStatAmount')
        } else {
            form.hide('consumableEffectStatWhich')
            form.hide('consumableEffectStatAmount')
        }

        window.objectEditorUsageFields.refresh()
        
    } else if (field === "consumableEffectStatAmount"){
        if (value < 0){
            w2alert('Stat amount must be greater than 0')
            window.currentObject.consumableEffectStatAmount = 1
            window.objectEditorUsageFields.record.consumableEffectStatAmount = 1
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