import updateUiTheme from './updateTheme.js'
import { w2ui } from '../../../lib/w2ui.es6.min.js'

let startupViews = ["settings:default-editor-welcome-message", "settings:default-editor-unit-editor"]
let themes = ["ocean_waves", "turnroot", "charcoal", "charcoal_blue", "charcoal_green", "chocolate", "midnight_spark", "rainforest"]

const handleEvent = (event, toolbar) => {
    if (startupViews.includes(event.target)) {
        let startupView = event.target.split(':')[1]
        toolbar.get('settings').get('default-editor').items.forEach(item => {
            if (item.id === startupView) {
                item.style = 'background-color: var(--window-background-alt);'
            } else {
                item.style = ''
            }
        })
    }
    if (event.detail.item.id === 'collapseSidebar') {
        window.goFlat()
    }
    if (event.detail.item.id === 'show-status-bar') {
        let statusBar = w2ui.EditorWindowStatusBar
        let layout = w2ui.EditorWindowLayout
        if (event.detail.item.checked) {
            layout.show('bottom')
            layout.sizeTo('bottom', '24', true)
        } else {
            layout.hide('bottom')
            layout.sizeTo('bottom', '0', true)
        }
    }
    if (event.detail.subItem) {
        let themeSubitems = toolbar.get('settings').get('themes').items.map(item => item.id)
        console.log(themeSubitems, event.detail.subItem.id)
        if (themeSubitems.includes(event.detail.subItem.id)) {
            updateUiTheme(event.detail.subItem.id)
            toolbar.get('settings').get('themes').items.forEach(item => {
                if (item.id === event.detail.subItem.id) {
                    item.style = 'background-color: var(--window-background-alt);'
                } else {
                    item.style = ''
                }
            })
        }
    } else {
        console.log('Click:', event.detail.item.id)
    }
}

export default handleEvent