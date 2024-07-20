import defaults from './defaults.js'

import {w2ui} from './w2ui.es6.min.js'

const booleans = ['unitsCanHaveChildren', 'useExperienceSublevels', 'useExperienceAptitudes', 'combatCombatArts', 'combatWeaponTriangle', 'combatExpandedWeaponTriangle', 'combatMagicTriangle', 'combatBattalions', 'combatBattalionEndurance', 'combatPairUp', 'combatAdjutants', 'combatAdjutantHeal', 'combatAdjutantGuard', 'combatAdjutantAttack', 'aptitudeGoals', 'statsUseExtraStatWeight', 'statsExtraStatWeightAffectsMovement', 'statsUseExtraStatLuck', 'combatSeparateCritAvoid', 'statsUseExtraStatAuthority', 'statsUseExtraStatCharm', 'statsAptitudesUseRiding', 'statsAptitudesUseFlying', 'statsAptitudesUseAuthority', 'statsAptitudesUseArmor']

const integers = ['combatCombatArtLimit', 'combatWeaponTriangleAdvantage', 'combatWeaponTriangleDisadvantage', 'combatMagicTriangleAdvantage', 'combatMagicTriangleDisadvantage', 'combatBattalionLimit']

const strings = ['unitEditorAvatarDefaultHairColor', 'unitEditorAvatarDefaultEyeColor']

const json = ['combatTriangleMapping', 'combatMagicTriangleMapping', 'globalWeaponsTypes', 'globalMagicTypes']

const lists = ['combatTriangleTypes', 'combatNeutralTypes', 'combatMagicTriangleTypes', 'combatNeutralMagicTypes']

const formNames = ['unit-editor-basic-fields', 'unit-editor-friend-fields', 'unit-editor-avatar-fields', 'unit-editor-enemy-fields', 'unit-editor-npc-fields']

const misc = ['GameEditorWeaponTriangleFieldsTopCorner', 'GameEditorWeaponTriangleFieldsLeftCorner', 'GameEditorWeaponTriangleFieldsRightCorner', 'GameEditorMagicTriangleFieldsLeftCorner', 'GameEditorMagicTriangleFieldsRightCorner', 'GameEditorMagicTriangleFieldsTopCorner','UseWeatherOnLevels']

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

misc.forEach(property => {
    Object.defineProperty(window, property, {
        get: function() {
            return localStorage.getItem(property)
        },
        set: function(value) {
            localStorage.setItem(property, value)
        }
    })
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

const updateFormGlobals = () => {
    formNames.forEach(formName => {
        if (w2ui[formName]) {
            w2ui[formName].updateGlobals()
        } else {
            window.turnrootEditorLogs.push(`${new Date()}||error||Form ${formName} not found`)
        }
    })
}

export { booleans, integers, strings, json, lists, updateFormGlobals }