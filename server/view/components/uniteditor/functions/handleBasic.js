import {
    w2alert
} from '../../../lib/w2ui.es6.min.js'

import globalStats from './globals/getGlobalStats.js'

let numAvatars = 0 //get from database

const handleEvent = (form, event) => {
    let field = event.detail.field
    let value = event.detail.value

    console.log('Field:', field, 'Value:', value)

    if (field === 'useAccentColors') {
        if (value.current === true) {
            form.show('unit-accent-color-1')
            form.show('unit-accent-color-2')
        } else {
            form.hide('unit-accent-color-1')
            form.hide('unit-accent-color-2')
        }
    }

    if (field === 'subtype') {
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
                        switch (value.current) {
                            case 'Avatar':
                                numAvatars++
                                form.show('orientation')
                                form.show('canSSupport')
                                form.show('canHaveChildren')
                                globalStats.forEach((stat, index) => {
                                    form.show(stat.field)
                                })
                                form.show('useAccentColors')
                                form.show('growth-rates')
                                form.show('base-stats-header')
                                form.unlock()
                                form.message()
                                form.disable('canSSupport')
                                break
                            case 'NPC':
                                form.hide('orientation')
                                form.hide('canSSupport')
                                form.hide('canHaveChildren')
                                globalStats.forEach((stat, index) => {
                                    form.hide(stat.field)
                                })
                                form.hide('growth-rates')
                                form.hide('unit-accent-color-1')
                                form.hide('unit-accent-color-2')
                                form.hide('base-stats-header')
                                form.hide('useAccentColors')
                                form.unlock()
                                form.message()
                                break
                            case 'Friend':
                                form.show('orientation')
                                form.show('canSSupport')
                                form.show('canHaveChildren')
                                globalStats.forEach((stat, index) => {
                                    form.show(stat.field)
                                })
                                form.show('growth-rates')
                                form.show('useAccentColors')
                                form.show('base-stats-header')
                                form.unlock()
                                form.message()
                                form.enable('canSSupport')
                                break
                            case 'Enemy':
                                form.hide('canSSupport')
                                form.hide('orientation')
                                form.hide('canHaveChildren')
                                globalStats.forEach((stat, index) => {
                                    form.hide(stat.field)
                                })
                                form.show('useAccentColors')
                                form.hide('growth-rates')
                                form.hide('base-stats-header')
                                form.unlock()
                                form.message()
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