import { w2ui, w2alert, w2popup } from '../../lib/w2ui.es6.min.js'
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

export default logsPopup