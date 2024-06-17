import defaults from './defaults.js'

const booleans = ['unitsCanHaveChildren', 'useExperienceSublevels', 'useExperienceAptitudes', 'combatCombatArts', 'combatWeaponTriangle', 'combatExpandedWeaponTriangle', 'combatMagicTriangle', 'combatBattalions', 'combatBattalionEndurance', 'combatPairUp', 'combatAdjutants', 'combatAdjutantHeal', 'combatAdjutantGuard', 'combatAdjutantAttack', 'statsUseExtraStatWeight', 'statsExtraStatWeightAffectsMovement', 'statsUseExtraStatLuck', 'combatSeparateCritAvoid', 'statsUseExtraStatAuthority', 'statsUseExtraStatCharm', 'statsAptitudesUseRiding', 'statsAptitudesUseFlying', 'statsAptitudesUseAuthority', 'statsAptitudesUseArmor']
const integers = ['combatCombatArtLimit', 'combatWeaponTriangleAdvantage', 'combatWeaponTriangleDisadvantage', 'combatMagicTriangleAdvantage', 'combatMagicTriangleDisadvantage', 'combatBattalionLimit']
const strings = ['unitEditorAvatarDefaultHairColor']
const json = ['combatTriangleMapping', 'combatMagicTriangleMapping', 'globalWeaponsTypes']
const lists = ['combatTriangleTypes', 'combatNeutralTypes', 'combatMagicTriangleTypes', 'combatNeutralMagicTypes']

booleans.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            return localStorage.getItem(property) === 'true'
        },
        set: function(value) {
            localStorage.setItem(property, value)
        }
    })

    if (!localStorage.getItem(property)) {
        window[property] = defaults[property]
    }
})

integers.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            const value = localStorage.getItem(property)
            return value ? parseInt(value, 10) : null
        },
        set: function(value) {
            localStorage.setItem(property, value)
        }
    })

    if (!localStorage.getItem(property)) {
        window[property] = defaults[property]
    }
})

strings.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            return localStorage.getItem(property)
        },
        set: function(value) {
            localStorage.setItem(property, value)
        }
    })

    if (!localStorage.getItem(property)) {
        window[property] = defaults[property]
    }
})

json.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            return JSON.parse(localStorage.getItem(property))
        },
        set: function(value) {
            localStorage.setItem(property, JSON.stringify(value))
        }
    })

    if (!localStorage.getItem(property)) {
        window[property] = defaults[property]
    }
})

lists.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            return localStorage.getItem(property).split(',')
        },
        set: function(value) {
            localStorage.setItem(property, value.join(','))
        }
    })

    if (!localStorage.getItem(property)) {
        window[property] = defaults[property]
    }
})