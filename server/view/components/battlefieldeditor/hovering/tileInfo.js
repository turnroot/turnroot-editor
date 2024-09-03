let div = document.createElement('div')
div.style.position = 'fixed'
div.style.right = '.5rem'
div.style.bottom = '2rem'
div.style.zIndex = 2000
div.style.backgroundColor = 'var(--node-title)'
div.style.paddingLeft = '.25rem'
div.style.paddingRight = '.25rem'
div.style.borderRadius = '5px'
div.style.color = 'var(--node-title-background)'
div.style.fontWeight = 'bold'
div.style.fontSize = '.75rem'

const moveBattlefieldEditorToZeroZero = () => {
    console.log('moveBattlefieldEditorToZeroZero')
    document.querySelector('#layout_BattlefieldEditor_panel_main').querySelector(".w2ui-panel-content").scrollTo(0,0)
}

window.moveBattlefieldEditorToZeroZero = moveBattlefieldEditorToZeroZero
div.permanentContent = `<div style = "display:flex;align-items:center;margin-right:.5rem;height:100%;"><button onclick = "window.moveBattlefieldEditorToZeroZero()" class = "w2ui-btn" style = "min-width:0!important;margin-right:.5rem">0,0</button>|</div>`

export default div