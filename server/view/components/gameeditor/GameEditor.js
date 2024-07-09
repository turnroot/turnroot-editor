import { w2layout } from '../../lib/w2ui.es6.min.js'
import gameEditorBottom from './bottom.js'

import gameDetails from './tabs/gameDetails.js'

import getAllWeaponTypes from './functions/weaponTypes/getAllWeaponTypes.js'

let layout = new w2layout({
    name: 'GameEditor',
    panels: [
        { type: 'main', content: 'main', html: gameDetails},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: gameEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

layout.on('render', async function(event){
    if (!window.globalWeaponsTypes){
        window.globalWeaponsTypes = await getAllWeaponTypes()
    }
})

export default layout