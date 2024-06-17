import {
    w2alert
} from '../../../lib/w2ui.es6.min.js'

let numAvatars = 1 //get from database

const handleEvent = (form, event) => {
    let field = event.detail.field
    let value = event.detail.value

    console.log('Field:', field, 'Value:', value)

    if (field === 'useAccentColors'){
        if (value.current === true){
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


    form.setValue('canSSupport', true)
    form.disable('canSSupport')
}

export default handleEvent