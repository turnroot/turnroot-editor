import updateUiTheme from './updateTheme.js'
import { w2ui } from '../../lib/w2ui.es6.min.js'

let startupViews = ["settings:default-editor-welcome-message", "settings:default-editor-unit-editor"]

const handleEvent = (event, toolbar) => {

    if (startupViews.includes(event.target)) {
        let startupView = event.target.split(':')[1]
        sessionStorage.setItem('startupView', startupView)
        toolbar.get('settings').get('default-editor').items.forEach(item => {
            if (item.id === startupView) {
                item.style = 'background-color: var(--window-background-alt);'
            } else {
                item.style = ''
            }
        })
    }
    else if (event.detail.item.id === 'collapseSidebar') {
        window.goFlat()
    }
    else if (event.detail.item.id === 'forums') {
        window.open('https://community.turnroot.com', '_blank')
    }
    else if (event.detail.item.id === 'help') {
        window.open('https://docs.turnroot.com', '_blank')
    }
    else if (event.detail.item.id === 'show-status-bar') {
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
        if (event.detail.subItem.id === 'font-family-fira-sans') {
            window.localStorage.setItem('font-family', 'Fira Sans')
            document.documentElement.style.setProperty('--font-family', 'Fira Sans')
            toolbar.get('settings').get('font-family').items.forEach(item => {
                if (item.id === 'font-family-fira-sans') {
                    item.style = 'background-color: var(--window-background-alt);'
                } else {
                    item.style = ''
                }
            })
        } else if (event.detail.subItem.id === 'font-family-lexend') {
            window.localStorage.setItem('font-family', 'Lexend')
            document.documentElement.style.setProperty('--font-family', 'Lexend')
            toolbar.get('settings').get('font-family').items.forEach(item => {
                if (item.id === 'font-family-lexend') {
                    item.style = 'background-color: var(--window-background-alt);'
                } else {
                    item.style = ''
                }
            })
        } else if (event.detail.subItem.id === 'font-family-clean-sans') {
            window.localStorage.setItem('font-family', 'Clear Sans')
            document.documentElement.style.setProperty('--font-family', 'Clear Sans')
            toolbar.get('settings').get('font-family').items.forEach(item => {
                if (item.id === 'font-family-clean-sans') {
                    item.style = 'background-color: var(--window-background-alt);'
                } else {
                    item.style = ''
                }
            })
        } else if (event.detail.subItem.id === 'font-family-figtree') {
            window.localStorage.setItem('font-family', 'Figtree')
            document.documentElement.style.setProperty('--font-family', 'Figtree')
            toolbar.get('settings').get('font-family').items.forEach(item => {
                if (item.id === 'font-family-figtree') {
                    item.style = 'background-color: var(--window-background-alt);'
                } else {
                    item.style = ''
                }
            })
        } else {
        let themeSubitems = toolbar.get('settings').get('themes').items.map(item => item.id)
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
    } 
}
}

export default handleEvent