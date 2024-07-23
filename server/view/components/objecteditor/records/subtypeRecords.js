let subtypeWeaponRecord = {
    hasUses: false,
    minAptitude: 'E',
    weaponType: 'sword',
    uses: -1,
    replenishUsesAfterBattleAmount: 'none',
    sellPrice: 0,
    buyPrice: 0,
    sellable: true,
    buyable: true,
    repairable: false,
    repairPricePerUse: 0,
    repairNeedsItems: false,
    repairItem: null,
    forgeable: false,
    forgeInto: [],
    forgePrices: [],
    forgeNeedsItems: false,
    forgeItems: [],
    lowerRange: 0,
    upperRange: 0,
    rangeAdjustedByStat: false,
    rangeAdjustedByStatName: '',
    rangeAdjustedByDivisor: 1,
    effectsAtStartOfTurn: {},
    effectsAtStartOfCombat: {},
    effectsAfterCombat: {},
    otherEffects: {}
}

let subtypeConsumableRecord = {
    uses: 1,
    sellPrice: 0,
    buyPrice: 0,
    sellable: true,
    buyable: true,
    statEffects: {},
    otherEffects: {}
}

let subtypeEquipableRecord = {
    sellPrice: 0,
    buyPrice: 0,
    sellable: true,
    buyable: true,
    repairable: false,
    repairPricePerUse: 0,
    repairNeedsItems: false,
    repairItem: null,
    forgeable: false,
    forgeInto: [],
    forgePrices: [],
    forgeNeedsItems: false,
    forgeItems: [],
    statEffects: {},
    otherEffects: {}
}

let subtypeGiftRecord = {
    sellPrice: 0,
    buyPrice: 0,
    sellable: true,
    buyable: true,
    giftRank: 1
}

export {
    subtypeWeaponRecord,
    subtypeConsumableRecord,
    subtypeEquipableRecord,
    subtypeGiftRecord
}