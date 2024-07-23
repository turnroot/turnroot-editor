import {
    w2alert, w2ui
} from '../../../lib/w2ui.es6.min.js'

import {updateQueue} from '../../../functions/edits/queue.js'

import globalStats from './globals/getGlobalStats.js'

let globalStatsArray = []
globalStats.forEach((stat) => {globalStatsArray.push(stat.field)})

let numAvatars = 0

const mapRange = function (value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const subtypeConfig = {
    Avatar: {
        show: ['orientation', 'canSSupport', 'canHaveChildren', 'height', 'birthdayDay', 'birthdayMonth', 'age', 'useAccentColors', 'growth-rates', 'base-stats-header'],
        hide: ['canRecruit', 'isUnique', 'randomize-base-stats'],
        disable: ['canSSupport'],
        enable: [],
        toolbarShow: ['unit-editor-bottom-toolbar-relationship']
    },
    NPC: {
        hide: ['orientation', 'canSSupport', 'canHaveChildren', 'canRecruit', 'growth-rates', 'accentColor1', 'accentColor2', 'base-stats-header', 'randomize-base-stats', 'useAccentColors', 'height', 'birthdayDay', 'birthdayMonth', 'age'],
        show: ['isUnique'],
        enable: [],
        disable: [],
        toolbarShow: []
    },
    Friend: {
        show: ['orientation', 'canSSupport', 'canHaveChildren', 'canRecruit', 'growth-rates', 'useAccentColors', 'base-stats-header', 'height', 'birthdayDay', 'birthdayMonth', 'randomize-base-stats', 'age', 'isUnique'],
        enable: ['canSSupport'],
        hide: [],
        disable: [],
        toolbarShow: ['unit-editor-bottom-toolbar-relationship', 'unit-editor-bottom-toolbar-behavior']
    },
    Enemy: {
        hide: ['canSSupport', 'orientation', 'canHaveChildren', 'growth-rates', 'height', 'birthdayDay', 'birthdayMonth', 'age'],
        enable: [],
        disable: [],
        show: ['canRecruit', 'useAccentColors', 'randomize-base-stats', 'isUnique'],
        toolbarShow: ['unit-editor-bottom-toolbar-behavior']
    }
}

function applySubtypeConfig(form, config) {
    ['show', 'hide', 'enable', 'disable'].forEach(action => {
        (config[action] || []).forEach(field => form[action](field))
    })
    globalStats.forEach((stat, index) => {
        form[config.hide.includes(stat.field) ? 'hide' : 'show'](stat.field)
    })
    let bottomToolbar = w2ui['unit-editor-bottom-toolbar']
    bottomToolbar.hide('unit-editor-bottom-toolbar-relationship')
    bottomToolbar.hide('unit-editor-bottom-toolbar-behavior')
    bottomToolbar.show('unit-editor-bottom-toolbar-basic')
    config.toolbarShow.forEach(tab => bottomToolbar.show(tab))
    bottomToolbar.refresh()
}

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value
    
    if (window.allUnits){
        window.allUnits.forEach(unit => {
            if (unit.which === 'avatar'){
                numAvatars++
            }
        })
    }

    if (field === 'name') {
        if (value.current.length === 0) {
            value.current = value.previous
            window.unitEditorBasicFields.record.name = value.previous
            window.unitEditorBasicFields.refresh()
            return w2alert('Name cannot be empty')
        }
        if (window.UnitEditorLeftSidebar){
        window.UnitEditorLeftSidebar.nodes.forEach(node => {
            if (node.id === form.record.id) {
                node.text = value.current + ' ' + form.record.id
            }
            window.UnitEditorLeftSidebar.refresh()
        })}
    }

    else if (field === 'useAccentColors') {
        if (value.current === true) {
            form.show('accentColor1')
            form.show('accentColor2')
        } else {
            form.hide('accentColor1')
            form.hide('accentColor2')
        }
    }

    else if (globalStatsArray.includes(field) && field !== 'mov'){
        let meter = w2ui['unit-editor-basic-fields'].get('base-stats-balance').el
        let statFields = globalStatsArray
        let statValueTotal = 0
        statFields.forEach(stat => {
            statValueTotal += form.getValue(stat)
        })
        let value = statValueTotal
        let min = globalStatsArray.length * 5.8
        let max = globalStatsArray.length * 9.1
        let newValue = mapRange(value, min, max, 0, 180) - 90

        meter.querySelector('.balanceMeterNeedle').style.transform = `rotate(${newValue}deg)`
        meter.querySelector('.balanceMeterNeedle').style.opacity = '1'
        
    }

    else if (field === 'canRecruit'){
        if (value.current === true){
            let isUnique = form.get('isUnique')
            if (isUnique.el.checked === false){
                form.setValue('isUnique', true)
                form.record.isUnique = true
                w2alert('A recruitable unit must be unique. The "isUnique" checkbox has been checked.')
                form.show('randomize-base-stats')
            }
        }
    }

    else if (field === 'isUnique' && value.current === false && form.get('canRecruit').el.checked === true){
        let canRecruit = form.get('canRecruit')
        if (canRecruit.el.checked === true){
            form.setValue('canRecruit', false)
            form.record.canRecruit = false
            w2alert('A recruitable unit must be unique. The "canRecruit" checkbox has been unchecked.')
            form.hide('randomize-base-stats')
        }
    }

    else if (field === 'isUnique'){
        if (value.current === true){
        form.hide('randomize-base-stats')} else {
        form.show('randomize-base-stats')
        }
    }

    else if (field === 'subtype') {
        form.lock('', true)
        if (automated){
            applySubtypeConfig(form, subtypeConfig[value.current])
            if (value.current === 'Enemy' && form.record.canRecruit === true) {
                w2ui['unit-editor-bottom-toolbar'].show('unit-editor-bottom-toolbar-relationship')
            }
            
            form.unlock()
            return
        }
        if (value.current === 'Avatar' && numAvatars > 0) {
            form.message({
                body: '<div class="w2ui-centered">You already have an Avatar unit. You cannot create another.</div>',
                width: 400,
                height: 200,
                actions: {
                    OK() {
                        form.setValue('subtype', value.previous)
                        form.unlock()
                        form.message()
                    }
                }
            })
        } else {
            form.message({
                body: '<div class="w2ui-centered">Do you want to change the subtype? This will significantly alter your unit.</div>',
                width: 400,
                height: 200,
                actions: {
                    Yes() {
                        if (value.previous === 'Avatar' && value.current !== 'Avatar') {
                            numAvatars--
                        }
                        applySubtypeConfig(form, subtypeConfig[value.current])
                        form.unlock()
                        form.message()
                    },
                    No() {
                        form.setValue('subtype', value.previous)
                        form.record['subtype'] = value.previous
                        form.unlock()
                        form.message()
                        form.refresh()
                    }
                }
            })
        }
    }
    updateQueue('Person', 'updatePerson', form.record)
}

export default handleEvent