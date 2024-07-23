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

    window.objectEditorBasicFields.record.name = window.currentObject.name
    window.objectEditorBasicFields.record.subtype = window.currentObject.subtype
    window.objectEditorBasicFields.record.flavorText = window.currentObject.flavorText
    
    window.objectEditorValueFields.record.buyable = window.currentObject.buyable
    window.objectEditorValueFields.record.sellable = window.currentObject.sellable
    window.objectEditorValueFields.record.buyPrice = window.currentObject.buyPrice
    window.objectEditorValueFields.record.sellPrice = window.currentObject.sellPrice

    window.objectEditorValueFields.record.sellPriceDeductedPerUse = window.currentObject.sellPriceDeductedPerUse

    if (window.currentObject.subtype === 'Gift') {window.objectEditorValueFields.hide('sellPriceDeductedPerUse')} else {window.objectEditorValueFields.show('sellPriceDeductedPerUse')}

    if (window.currentObject.subtype === 'Weapon'){
        window.objectEditorUsageFields.hide('magicType')
        window.objectEditorUsageFields.hide('magicTypeDescription')
        window.objectEditorUsageFields.show('weaponType')
        window.objectEditorUsageFields.show('weaponTypeDescription')
        window.objectEditorUsageFields.record.minAptitude = window.currentObject.minAptitude
        window.objectEditorUsageFields.record.weaponType = c(window.currentObject.weaponType)
        window.objectEditorUsageFields.get('weaponType').options.items = window.globalWeaponsTypes[0].types.map(type => type.name)
    } else if (window.currentObject.subtype === 'Magic'){
        window.objectEditorUsageFields.hide('weaponType')
        window.objectEditorUsageFields.show('magicType')
        window.objectEditorUsageFields.hide('weaponTypeDescription')
        window.objectEditorUsageFields.show('magicTypeDescription')
        window.objectEditorUsageFields.record.minAptitude = window.currentObject.minAptitude
        window.objectEditorUsageFields.record.magicType = c(window.currentObject.magicType)
        window.objectEditorUsageFields.get('magicType').options.items = window.globalMagicTypes[0].types.map(type => type.name)
    }


    window.objectEditorBasicFields.refresh()
}

export default updateCurrentObjectRecord