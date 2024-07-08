const defaults = {
    'unitsCanHaveChildren': true,
    'useExperienceSublevels': false,
    'useExperienceAptitudes': true,
    'unitEditorAvatarDefaultHairColor': 'rgb(39, 31, 86)',
    'unitEditorAvatarDefaultEyeColor': 'rgb(34, 132, 181)',
    'combatCombatArts': false,
    'combatCombatArtLimit': 3,
    'combatWeaponTriangle': true,
    'combatTriangleTypes': ["Sword", "Lance", "Axe", "Bow", "Gauntlet", "Dagger"],
    'combatNeutralTypes': [],
    'combatTriangleMapping': {},
    'combatExpandedWeaponTriangle': false,
    'combatWeaponTriangleAdvantage': 20,
    'combatWeaponTriangleDisadvantage': -20,
    'combatMagicTriangle': false,
    'combatMagicTriangleAdvantage': 20,
    'combatMagicTriangleDisadvantage': -20,
    'combatMagicTriangleTypes': [],
    'combatNeutralMagicTypes': [],
    'combatMagicTriangleMapping': {},
    'combatBattalions': true,
    'combatBattalionLimit': 1,
    'combatBattalionEndurance': true,
    'combatPairUp': false,
    'combatAdjutants': true,
    'combatAdjutantHeal': true,
    'combatAdjutantGuard': true,
    'combatAdjutantAttack': true,
    'aptitudeGoals': false,
    'statsUseExtraStatWeight': false,
    'statsExtraStatWeightAffectsMovement': false,
    'statsUseExtraStatLuck': true,
    'combatSeparateCritAvoid': false,
    'statsUseExtraStatAuthority': false,
    'statsUseExtraStatCharm': true,
    'statsAptitudesUseRiding': true,
    'statsAptitudesUseFlying': true,
    'statsAptitudesUseAuthority': false,
    'statsAptitudesUseArmor': false,
    'globalWeaponsTypes': {
        types: [
            {
                name: 'Sword',
                icon: '',
                id: 'sword',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Lance',
                icon: '',
                id: 'lance',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Axe',
                icon: '',
                id: 'axe',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Bow',
                icon: '',
                id: 'bow',
                magic: false,
                ranges: [1, 2, 3, 4],
                defaultRange: 2
            },
            {
                name: 'Gauntlet',
                icon: '',
                id: 'gauntlet',
                magic: false,
                ranges: [1],
                defaultRange: 1
            },
            {
                name: 'Dagger',
                icon: '',
                id: 'dagger',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            }
        ]
    },
}

export default defaults
