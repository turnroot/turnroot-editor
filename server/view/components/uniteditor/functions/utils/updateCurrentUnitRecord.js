const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

import handleEvent from '../handleBasic.js'
import dynamicRadios from '../../../utils/dynamicRadios.js'

const updateCurrentUnitRecord = async(n) => {
    window.currentUnit = n
    console.log('updating current unit record ', n.id)

    window.unitEditorBasicFields.record['fullName'] = n.fullName
    window.unitEditorBasicFields.record['title'] = n.title
    window.unitEditorBasicFields.record['name'] = n.name
    window.unitEditorBasicFields.record['id'] = n.id
    window.unitEditorBasicFields.record['subtype'] = c(n.which)

    handleEvent(window.unitEditorBasicFields, {detail: {field: 'subtype', value: {current: c(n.which)}}}, true)

    window.unitEditorBasicFields.record['pronouns'] = n.pronouns.singular + '/' + n.pronouns.object + '/' + n.pronouns.possessive + '/' + n.pronouns.possessives

    window.unitEditorBasicFields.record['age'] = n.age
    window.unitEditorBasicFields.record['height'] = n.height
    window.unitEditorBasicFields.record['canSSupport'] = n.canSSupport
    window.unitEditorBasicFields.record['canHaveChildren'] = n.canHaveChildren
    window.unitEditorBasicFields.record['isUnique'] = n.isUnique
    window.unitEditorBasicFields.record['canRecruit'] = n.isRecruitable

    window.unitEditorBasicFields.record['birthdayDay'] = n.birthday.day
    window.unitEditorBasicFields.record['birthdayMonth'] = n.birthday.month

    window.unitEditorBasicFields.record['notes'] = n.Notes
    window.unitEditorBasicFields.record['shortBio'] = n.shortDescription

    window.unitEditorBasicFields.record['useAccentColors'] = n.useAccentColors

    window.unitEditorBasicFields.record['unit-accent-color-1'] = n.accentColor1
    window.unitEditorBasicFields.record['unit-accent-color-2'] = n.accentColor2
    
    window.unitEditorBasicFields.refresh()

    window.unitEditorRelationshipFields.record = n.MaxSupports? n.MaxSupports : {}
    let iteratives = []
    let supportableUnits = window.allUnits
    supportableUnits = supportableUnits.filter(unit => {return unit.id !== window.currentUnit.id && !(unit.which === 'enemy' && !unit.isRecruitable) && unit.which !== 'npc'})
    supportableUnits.forEach(unit => {
        let iterative = {}
        iterative.fieldLabel = unit.name + ' ' + unit.id
        iterative.fieldOptions = unit.canSSupport? ['D', 'C', 'B', 'A', 'S'] : ['D', 'C', 'B', 'A']
        iterative.fieldValue =  'D'
        window.unitEditorRelationshipFields.record['max-Support-'+unit.id] = 'D'
        iteratives.push(iterative)
    })

    let radios = dynamicRadios(iteratives,'Max-support').innerHTML
    window.unitEditorRelationshipFields.fields[2].html.html = radios
    window.unitEditorRelationshipFields.fields[2].field = 'dynamicRadios-Max-support' 


    let speedIteratives = []
    supportableUnits.forEach(unit => {
        let iterative = {}
        iterative.fieldLabel = unit.name + ' ' + unit.id
        iterative.fieldOptions = ['Slow', 'Neutral', 'Fast']
        iterative.fieldValue =  'Neutral'
        window.unitEditorRelationshipFields.record['support-Speed-'+unit.id] = 'Neutral'
        speedIteratives.push(iterative)
    })

    let speedRadios = dynamicRadios(speedIteratives,'Support-speed').innerHTML
    window.unitEditorRelationshipFields.fields[4].html.html = speedRadios
    window.unitEditorRelationshipFields.fields[4].field = 'dynamicRadios-Support-speed'

    if (!window.currentUnit.canHaveChildren || !window.unitsCanHaveChildren){
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-header').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-inheritances').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-child-header').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-child').hidden = true
    } else {
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-header').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-inheritances').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-child-header').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-child').hidden = false
    }

    if (!window.combatAdjutants){
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-header').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-does').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-none-level-support').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-d-level-support').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-c-level-support').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-b-level-support').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-a-level-support').hidden = true
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-s-level-support').hidden = true
    } else {
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-header').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-does').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-none-level-support').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-d-level-support').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-c-level-support').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-b-level-support').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-a-level-support').hidden = false
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-chance-s-level-support').hidden = false
    }

    if (!window.combatPairUp){
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-pairup-header').hidden = true
    } else {
        window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-pairup-header').hidden = false
    }


    window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-adjutant-does').options.items = [
        window.combatAdjutantAttack? 'Attack' : null,
        window.combatAdjutantGuard? 'Guard' : null,
        window.combatAdjutantHeal? 'Heal' : null,
    ].filter(item => item !== null)

    window.unitEditorRelationshipFields.get('unit-editor-relationship-fields-parenting-child').options.items = supportableUnits.map(unit => {
        return {
            id: unit.id,
            text: unit.name + ' ' + unit.id
        }
    })

    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-does"] = "Attack"
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-none-level-support"] = 2
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-d-level-support"] = 4
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-c-level-support"] = 6
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-b-level-support"] = 8
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-a-level-support"] = 10
    window.unitEditorRelationshipFields.record["unit-editor-relationship-fields-adjutant-chance-s-level-support"] = 12

    window.unitEditorRelationshipFields.formHTML = window.unitEditorRelationshipFields.generateHTML()
    window.unitEditorRelationshipFields.render()
    window.unitEditorRelationshipFields.record['unit-editor-relationship-fields-parenting-inheritances'] = [
        'Eye color',
        'Hair color',
        'Skin color',
        'Height'
    ]
    window.unitEditorRelationshipFields.on('change', (event) => {
        window.unitEditorRelationshipFields.record[event.detail.originalEvent.target.name] = event.detail.originalEvent.target.getAttribute('data-value')
    })
}

export default updateCurrentUnitRecord