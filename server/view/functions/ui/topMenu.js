import updateUiTheme from './updateTheme.js'
import { w2ui, w2alert, w2popup } from '../../lib/w2ui.es6.min.js'

let startupViews = ["settings:default-editor-welcome-message", "settings:default-editor-unit-editor"]
let themes = ["ocean_waves", "turnroot", "charcoal", "charcoal_blue", "charcoal_green", "chocolate", "midnight_spark", "snowdrift", "tokyo_night", "pink_dream", 'forest_mist', 'sunset_glow', 'pine_coast']

const renderLogs = () => {
    let logs = window.turnrootEditorLogs

    let logString = '<code><small>'
    logs.forEach(log => {
        let parts = log.split('||')
        let time = parts[0]
        let type = parts[1]
        let message = parts[2]
        let formattedTime = new Date(time).toLocaleTimeString()
        if (type === 'error') {
            logString += `<span style="background-color:red;">${formattedTime} - ${message}</span><br>`
        } else {
            logString += `${formattedTime} - ${message}<br>`
        }
        logString += '<br>'
    })
    logString += '</small></code>'

    return logString
}


const logsPopup = () => {
    let div = document.createElement('div')

    div.style.width = '100%'
    div.style.height = '100%'
    div.style.padding = '1rem'
    div.style.overflowY = 'auto'
    div.id = 'logs-popup-inner'

    div.innerHTML = renderLogs()

    w2popup.open({
        title: 'Logs',
        body: div,
        resizable: true,
    }).then(() => {
        let popup = document.querySelector('#logs-popup-inner').parentElement.parentElement.parentElement
        popup.style.height = '60vh'
        popup.style.width = '50vw'
        popup.style.minHeight = '400px'
        popup.style.top = '20vh'
        popup.style.left = '25vw'
    })
}

const handleEvent = (event, toolbar) => {
    if (!event.detail.item.id === 'logs'){
    window.turnrootEditorLogs.push(`${new Date()}||info||Top menu button clicked: ${JSON.stringify(event.target)} with details ${JSON.stringify(event.detail)}`)}
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
    else if (event.detail.item.id === 'collapseSidebar') {
        window.goFlat()
    }
    else if (event.detail.item.id === 'logs'){
        logsPopup()
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
    } else {
    }
}

export default handleEvent