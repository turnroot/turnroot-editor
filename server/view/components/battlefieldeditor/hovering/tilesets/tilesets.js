import {w2layout } from '../../../../lib/w2ui.es6.min.js'

let fullWidth = document.createElement('div')
fullWidth.style.width = '100%'
fullWidth.style.height = '100vh'
fullWidth.style.overflow = 'hidden'
fullWidth.style.display = 'flex'
fullWidth.style.justifyContent = 'start'
fullWidth.style.alignItems = 'flex-end'
fullWidth.style.position = 'fixed'
fullWidth.style.zIndex = 1000
fullWidth.style.pointerEvents = 'none'

let div = document.createElement('div')
div.id = 'battlefieldEditor-TilesetsBox'
div.style.position = 'fixed'
div.style.width = '60%'
div.style.maxWidth = '80vw'
div.style.marginLeft = '1rem'
div.style.bottom = '2rem'
div.style.zIndex = 98
div.style.backgroundColor = 'var(--window-background)'
div.style.paddingLeft = '.25rem'
div.style.paddingRight = '.25rem'
div.style.borderRadius = '5px'
div.style.color = 'var(--node-title)'
div.style.height = "276px"
div.style.pointerEvents = 'all'

div.addEventListener('mousedown', (e) => {
    if (!e.shiftKey) return
    div.style.cursor = 'move'
    console.log('drag start')
    div.startX = e.clientX - div.offsetLeft
    div.startY = e.clientY - div.offsetTop

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
})

function onMouseMove(e) {
    if (!e.shiftKey) return
    div.style.cursor = 'move'
    if (e.clientX === 0 && e.clientY === 0) return
    let newX = e.clientX - div.startX
    let newY = e.clientY - div.startY

    newX = Math.max(0, Math.min(newX, fullWidth.clientWidth - div.clientWidth))
    newY = Math.max(0, Math.min(newY, fullWidth.clientHeight - div.clientHeight))

    div.style.left = `${newX}px`
    div.style.top = `${newY}px`
}

function onMouseUp(e) {
    console.log('drag end')
    div.style.cursor = 'default'
    let newX = e.clientX - div.startX
    let newY = e.clientY - div.startY

    newX = Math.max(0, Math.min(newX, fullWidth.clientWidth - div.clientWidth))
    newY = Math.max(0, Math.min(newY, fullWidth.clientHeight - div.clientHeight))

    div.style.left = `${newX}px`
    div.style.top = `${newY}px`

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

fullWidth.appendChild(div)


window.BattlefieldEditorTilesetsBox = div

let layout = new w2layout({
    name: 'BattlefieldEditor-TilesetsLayout',
    box: div,
    panels: [
        { type: 'left', content: 'left', html: 'Tilesets', resizable: true},
        { type: 'main', content: 'main'},
    ]
})

window.BattlefieldEditorTilesetsBoxLayout = layout

let layout2 = new w2layout({
    name: 'BattlefieldEditor-TilesetsLayoutMain',
    panels: [
        { type: 'bottom', size: 32, content: 'bottom', html: 'Sheets'},
        { type: 'main', content: 'main', html: 'Main'},
    ]
})

window.BattlefieldEditorTilesetsLayoutMain = layout2

let config = [
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-basic', text: 'Basic Info', class: 'panel-tabs', checked: true},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-subtype', text: 'Subtype', class: 'panel-tabs'},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-behavior', text: 'Behavior', class: 'panel-tabs', hidden: true},
    {type: 'radio', group: '1', id: 'unit-editor-bottom-toolbar-relationship', text: 'Relationships', class: 'panel-tabs', hidden: false},
]

layout.html('main', layout2)
layout2.html('bottom', toolbar)


export default fullWidth