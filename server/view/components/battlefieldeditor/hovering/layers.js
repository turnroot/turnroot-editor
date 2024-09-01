let div = document.createElement('div')
div.id = 'battlefieldEditor-LayersBox'
div.style.position = 'fixed'
div.style.right = '.5rem'
div.style.top = '5rem'
div.style.zIndex = 98
div.style.backgroundColor = 'var(--window-background)'
div.style.paddingLeft = '.25rem'
div.style.paddingRight = '.25rem'
div.style.borderRadius = '5px'
div.style.color = 'var(--node-title)'

div.pre = '<div><div style = "display:flex;justify-content:space-between;align-items:center;"><p style = "margin:none;"><strong>LAYERS</strong></p><div style = "display:flex;align-items:center;"><svg onclick="window.battlefieldEditorToggleLayers()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/></svg></div></div>'
div.inner = ''
div.post = "</div>"

let minDiv = document.createElement('div')
minDiv.id = 'battlefieldEditor-LayersBoxMin'
minDiv.style.position = 'fixed'
minDiv.style.right = '.5rem'
minDiv.style.top = '6.25rem'
minDiv.style.zIndex = 99
minDiv.style.backgroundColor = 'rgba(0,0,0,.35)'
minDiv.style.paddingLeft = '.25rem'
minDiv.style.paddingRight = '.25rem'
minDiv.style.borderRadius = '5px'
minDiv.style.color = 'var(--node-title)'
minDiv.style.display = 'none'

minDiv.innerHTML = '<svg onclick="window.battlefieldEditorToggleLayers()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>'

const battlefieldEditorToggleLayers = () => {
    let layersBox = document.getElementById('battlefieldEditor-LayersBox')
    let minBox = document.getElementById('battlefieldEditor-LayersBoxMin')
    if (layersBox.style.display === 'none'){
        layersBox.style.display = 'block'
        minBox.style.display = 'none'
    } else {
        layersBox.style.display = 'none'
        minBox.style.display = 'block'
    }
}

window.battlefieldEditorToggleLayers = battlefieldEditorToggleLayers

export {div, minDiv}