const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

import getAllUnits from '../../../uniteditor/functions/units/getAllUnits.js'

const updateCurrentObjectRecord = async (n) => {
    window.currentObject = n
    if (!window.currentObject || window.currentObject === undefined) {
        console.log('no object to update')
        return
    }
    console.log('updating current object record ', n.id)

    window.objectEditorBasicFields.record.name = window.currentObject.name
    window.objectEditorBasicFields.record.subtype = window.currentObject.subtype
    window.objectEditorBasicFields.record.flavorText = window.currentObject.flavorText

    window.objectEditorUsageFields.record.hasUses = window.currentObject.hasUses
    window.objectEditorUsageFields.record.maxUses = window.currentObject.maxUses

    window.objectEditorUsageFields.record.minAptitude = window.currentObject.minAptitude
    window.objectEditorUsageFields.record.weaponType = window.currentObject.weaponType
    window.objectEditorUsageFields.record.magicType = window.currentObject.magicType
    window.objectEditorUsageFields.record.scope = window.currentObject.scope
    window.objectEditorUsageFields.record.replenishUsesAfterBattleAmount = window.currentObject.replenishUsesAfterBattleAmount

    window.objectEditorUsageFields.record.lowerRange = window.currentObject.lowerRange
    window.objectEditorUsageFields.record.upperRange = window.currentObject.upperRange
    window.objectEditorUsageFields.record.rangeAdjustedByStat = window.currentObject.rangeAdjustedByStat
    window.objectEditorUsageFields.record.rangeAdjustedByStatName = window.currentObject.rangeAdjustedByStatName
    window.objectEditorUsageFields.record.rangeAdjustedByDivisor = window.currentObject.rangeAdjustedByDivisor

    window.objectEditorValueFields.record.buyable = window.currentObject.buyable
    window.objectEditorValueFields.record.sellable = window.currentObject.sellable
    window.objectEditorValueFields.record.buyPrice = window.currentObject.buyPrice
    window.objectEditorValueFields.record.sellPrice = window.currentObject.sellPrice

    window.objectEditorValueFields.record.sellPriceDeductedPerUse = window.currentObject.sellPriceDeductedPerUse

    window.objectEditorForgeRepairFields.record.forgeable = window.currentObject.forgeable
    window.objectEditorForgeRepairFields.record.repairable = window.currentObject.repairable
    window.objectEditorForgeRepairFields.record.repairPricePerUse = window.currentObject.repairPricePerUse
    window.objectEditorForgeRepairFields.record.repairNeedsItems = window.currentObject.repairNeedsItems
    window.objectEditorForgeRepairFields.record.repairItem = window.currentObject.repairItem
    window.objectEditorForgeRepairFields.record.repairItemAmountPerUse = window.currentObject.repairItemAmountPerUse

    if (window.currentObject.subtype === 'Gift') {
        window.objectEditorValueFields.hide('sellPriceDeductedPerUse')
        let allUnits = window.allUnits ? window.allUnits : await getAllUnits().then(units => {window.allUnits = units; return units})
        window.objectEditorGiftFields.get('belongsTo').options.items = allUnits.map(unit => unit.name + ' (' + unit.id + ')')
        window.objectEditorGiftFields.get('unitsHate').options.items = allUnits.map(unit => unit.name + ' (' + unit.id + ')')
        window.objectEditorGiftFields.get('unitsLove').options.items = allUnits.map(unit => unit.name + ' (' + unit.id + ')')


    } else {
        window.objectEditorValueFields.show('sellPriceDeductedPerUse')
    }

    if (window.currentObject.subtype === 'Weapon') {
        window.objectEditorForgeRepairFields.get('repairItem').options.items = window.allObjects.objectConsumables.map(consumable => consumable.name + ' (' + consumable.id + ')')
        window.objectEditorUsageFields.hide('magicType')
        window.objectEditorUsageFields.hide('magicTypeDescription')
        window.objectEditorUsageFields.show('weaponType')
        window.objectEditorUsageFields.show('weaponTypeDescription')
        window.objectEditorUsageFields.show('hasUses')
        window.objectEditorUsageFields.show('minAptitude')
        window.objectEditorUsageFields.hide('scope')
        window.objectEditorUsageFields.show('replenishUsesAfterBattleAmount')
        window.objectEditorUsageFields.hide('scopeDescription')
        window.objectEditorUsageFields.show('replenishUsesAfterBattleAmountDescription')
        window.objectEditorUsageFields.show('lowerRange')
        window.objectEditorUsageFields.show('upperRange')
        window.objectEditorUsageFields.show('rangeAdjustedByDivisor')
        window.objectEditorUsageFields.show('rangeAdjustedByStatName')
        window.objectEditorUsageFields.show('rangeAdjustedByStat')
        if (window.objectEditorUsageFields.record.hasUses) {
            window.objectEditorUsageFields.show('maxUses')
        } else {
            window.objectEditorUsageFields.hide('maxUses')
        }
        window.objectEditorUsageFields.record.minAptitude = window.currentObject.minAptitude
        window.objectEditorUsageFields.record.weaponType = c(window.currentObject.weaponType)
        window.objectEditorUsageFields.get('weaponType').options.items = window.globalWeaponsTypes[0].types.map(type => type.name)
    } else if (window.currentObject.subtype === 'Magic') {
        window.objectEditorUsageFields.hide('weaponType')
        window.objectEditorUsageFields.show('magicType')
        window.objectEditorUsageFields.show('hasUses')
        window.objectEditorUsageFields.show('minAptitude')
        window.objectEditorUsageFields.hide('scope')
        window.objectEditorUsageFields.show('replenishUsesAfterBattleAmount')
        window.objectEditorUsageFields.hide('scopeDescription')
        window.objectEditorUsageFields.show('replenishUsesAfterBattleAmountDescription')
        window.objectEditorUsageFields.show('lowerRange')
        window.objectEditorUsageFields.show('upperRange')
        window.objectEditorUsageFields.show('rangeAdjustedByDivisor')
        window.objectEditorUsageFields.show('rangeAdjustedByStatName')
        window.objectEditorUsageFields.show('rangeAdjustedByStat')
        if (window.objectEditorUsageFields.record.hasUses) {
            window.objectEditorUsageFields.show('maxUses')
        } else {
            window.objectEditorUsageFields.hide('maxUses')
        }
        window.objectEditorUsageFields.hide('weaponTypeDescription')
        window.objectEditorUsageFields.show('magicTypeDescription')
        window.objectEditorUsageFields.record.minAptitude = window.currentObject.minAptitude
        window.objectEditorUsageFields.record.magicType = c(window.currentObject.magicType)
        window.objectEditorUsageFields.get('magicType').options.items = window.globalMagicTypes[0].types.map(type => type.name)
    } else {
        window.objectEditorUsageFields.hide('weaponType')
        window.objectEditorUsageFields.hide('magicType')
        window.objectEditorUsageFields.hide('weaponTypeDescription')
        window.objectEditorUsageFields.hide('magicTypeDescription')
        window.objectEditorUsageFields.hide('minAptitude')
        window.objectEditorUsageFields.show('scope')
        window.objectEditorUsageFields.show('scopeDescription')
        window.objectEditorUsageFields.hide('lowerRange')
        window.objectEditorUsageFields.hide('upperRange')
        window.objectEditorUsageFields.hide('rangeAdjustedByDivisor')
        window.objectEditorUsageFields.hide('rangeAdjustedByStatName')
        window.objectEditorUsageFields.hide('rangeAdjustedByStat')
        if (window.objectEditorUsageFields.record.hasUses) {
            window.objectEditorUsageFields.show('replenishUsesAfterBattleAmount')
            window.objectEditorUsageFields.show('replenishUsesAfterBattleAmountDescription')
        } else {
            window.objectEditorUsageFields.hide('replenishUsesAfterBattleAmount')
            window.objectEditorUsageFields.hide('replenishUsesAfterBattleAmountDescription')
        }
    }

    if (window.currentObject.subtype === 'Consumable') {
        window.objectEditorUsageFields.hide('hasUses')
        window.objectEditorUsageFields.record['hasUses'] = true
        window.objectEditorUsageFields.show('maxUses')
        window.objectEditorUsageFields.show('consumableEffectsHeading')
        window.objectEditorUsageFields.show('consumableEffectAffectWhat')
        window.objectEditorUsageFields.show('consumableEffectAffectScope')
    } else {
        window.objectEditorUsageFields.hide('consumableEffectsHeading')
        window.objectEditorUsageFields.hide('consumableEffectAffectWhat')
        window.objectEditorUsageFields.hide('consumableEffectAffectScope')
        window.objectEditorUsageFields.hide('consumableEffectDuration')
    }

    if (window.currentObject.rangeAdjustedByStat) {
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

    if (!window.weaponsCanBeForged){
        window.objectEditorForgeRepairFields.hide('forgeable')
    }

    if (!window.consumablesCanBeRepaired){
        window.objectEditorForgeRepairFields.hide('repairable')
        window.objectEditorForgeRepairFields.hide('repairPricePerUse')
        window.objectEditorForgeRepairFields.hide('repairNeedsItems')
        window.objectEditorForgeRepairFields.hide('repairItem')
        window.objectEditorForgeRepairFields.hide('repairItemAmountPerUse')
    }

    window.objectEditorBasicFields.refresh()
}

export default updateCurrentObjectRecord