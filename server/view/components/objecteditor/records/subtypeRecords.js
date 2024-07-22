let subtypeWeaponRecord = {
    name: 'New Weapon',
    hasUses: false,
    uses: -1,
    replenishUsesAfterBattleAmount: 'none',
    flavorText: 'A consumable item',
    scope: 'both',
    icon: '',
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
    name: 'New Consumable',
    uses: 1,
    flavorText: 'A consumable item',
    scope: 'both',
    icon: '',
    sellPrice: 0,
    buyPrice: 0,
    sellable: true,
    buyable: true,
    statEffects: {},
    otherEffects: {}
}

let subtypeEquipableRecord = {
    name: 'New Equipable',
    flavorText: 'An equipable item',
    icon: '',
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
    name: 'New Gift Item',
    flavorText: 'A gift item',
    icon: '',
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