import {
    w2alert, w2ui
} from '../../../lib/w2ui.es6.min.js'

import globalStats from './globals/getGlobalStats.js'

let globalStatsArray = []
globalStats.forEach((stat) => {globalStatsArray.push(stat.field)})

let numAvatars = 0 //get from database

const mapRange = function (value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const handleEvent = (form, event) => {
    let field = event.detail.field
    let value = event.detail.value

    window.turnrootEditorLogs.push(`${new Date()}||info||Unit field ${field} requested change to ${value.current}`)

    if (field === 'useAccentColors') {
        if (value.current === true) {
            form.show('unit-accent-color-1')
            form.show('unit-accent-color-2')
        } else {
            form.hide('unit-accent-color-1')
            form.hide('unit-accent-color-2')
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
        
    }

    else if (field === 'canRecruit'){
        if (value.current === true){
            let isUnique = form.get('isUnique')
            if (isUnique.el.checked === false){
                form.setValue('isUnique', true)
                w2alert('A recruitable unit must be unique. The "isUnique" checkbox has been checked.')
                form.show('randomize-base-stats')
            }
        }
    }

    else if (field === 'isUnique' && value.current === false && form.get('canRecruit').el.checked === true){
        let canRecruit = form.get('canRecruit')
        if (canRecruit.el.checked === true){
            form.setValue('canRecruit', false)
            w2alert('A recruitable unit must be unique. The "canRecruit" checkbox has been unchecked.')
            form.hide('randomize-base-stats')
        }
    }

    else if (field === 'isUnique'){
        if (value.current === true){
        form.show('randomize-base-stats')} else {
        form.hide('randomize-base-stats')
        }
    }

    else if (field === 'subtype') {
        form.lock('', true)
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
                        let bottomToolbar = w2ui['unit-editor-bottom-toolbar']
                        switch (value.current) {
                            case 'Avatar':
                                numAvatars++
                                form.show('orientation')
                                form.show('canSSupport')
                                form.show('canHaveChildren')
                                form.hide('canRecruit')
                                form.show('height')
                                form.show('birthdayDay')
                                form.show('birthdayMonth')
                                form.show('age')
                                form.hide('isUnique')
                                globalStats.forEach((stat, index) => {
                                    form.show(stat.field)
                                })
                                form.show('useAccentColors')
                                form.show('growth-rates')
                                form.show('base-stats-header')
                                form.unlock()
                                form.message()
                                form.disable('canSSupport')
                                bottomToolbar.get('unit-editor-bottom-toolbar-behavior').hidden = true
                                bottomToolbar.refresh()
                                break
                            case 'NPC':
                                form.hide('orientation')
                                form.hide('canSSupport')
                                form.hide('canHaveChildren')
                                form.hide('canRecruit')
                                globalStats.forEach((stat, index) => {
                                    form.hide(stat.field)
                                })
                                form.hide('growth-rates')
                                form.hide('unit-accent-color-1')
                                form.hide('unit-accent-color-2')
                                form.hide('base-stats-header')
                                form.hide('useAccentColors')
                                form.hide('height')
                                form.hide('birthdayDay')
                                form.hide('birthdayMonth')
                                form.hide('age')
                                form.show('isUnique')
                                form.unlock()
                                form.message()
                                bottomToolbar.get('unit-editor-bottom-toolbar-behavior').hidden = true
                                bottomToolbar.refresh()
                                break
                            case 'Friend':
                                form.show('orientation')
                                form.show('canSSupport')
                                form.show('canHaveChildren')
                                form.show('canRecruit')
                                globalStats.forEach((stat, index) => {
                                    form.show(stat.field)
                                })
                                form.show('growth-rates')
                                form.show('useAccentColors')
                                form.show('base-stats-header')
                                form.show('height')
                                form.show('birthdayDay')
                                form.show('birthdayMonth')
                                form.show('age')
                                form.show('isUnique')
                                form.unlock()
                                form.message()
                                form.enable('canSSupport')
                                bottomToolbar.get('unit-editor-bottom-toolbar-behavior').hidden = false
                                bottomToolbar.refresh()
                                break
                            case 'Enemy':
                                form.hide('canSSupport')
                                form.hide('orientation')
                                form.hide('canHaveChildren')
                                form.show('canRecruit')
                                globalStats.forEach((stat, index) => {
                                    form.hide(stat.field)
                                })
                                form.show('useAccentColors')
                                form.hide('growth-rates')
                                form.hide('base-stats-header')
                                form.hide('height')
                                form.hide('birthdayDay')
                                form.hide('birthdayMonth')
                                form.hide('age')
                                form.show('isUnique')
                                form.unlock()
                                form.message()
                                bottomToolbar.get('unit-editor-bottom-toolbar-behavior').hidden = false
                                bottomToolbar.refresh()
                                break
                        }
                        form.unlock()
                        form.message()
                    },
                    No() {
                        form.setValue('subtype', value.previous)
                        form.unlock()
                        form.message()
                    }
                }
            })
        }
    }
}

export default handleEvent