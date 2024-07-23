import { w2toolbar } from "../../lib/w2ui.es6.min.js"
import handleBottom from './functions/handleBottom.js'

let config = [
    {type: 'radio', group: '1', id: 'game-editor-bottom-toolbar-game-details', text: 'Game details', class: 'panel-tabs', checked: true},
    {type: 'radio', group: '1', id: 'game-editor-bottom-toolbar-game-settings', text: 'Game settings', class: 'panel-tabs' ,hidden: true},
    {type: 'radio', group: '1', id: 'game-editor-bottom-toolbar-assets', text: 'Assets', class: 'panel-tabs' ,hidden: true},
    {type: 'radio', group: '1', id: 'game-editor-bottom-toolbar-build-and-export', text: 'Build and export', class: 'panel-tabs',hidden: true},
]

let toolbar = new w2toolbar({
    name: 'game-editor-bottom-toolbar',
    items:  config,
})

toolbar.on('click', function (event) {
    event.done(() => {
        handleBottom(event, toolbar)
    })
})

toolbar.on('render', function(event){
    if(window.newUserOnboardingGameDetails === false){
        toolbar.show('game-editor-bottom-toolbar-game-settings')
        toolbar.show('game-editor-bottom-toolbar-assets')
        toolbar.show('game-editor-bottom-toolbar-build-and-export')
    }
})

export default toolbar