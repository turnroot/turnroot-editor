import { w2layout } from '../../lib/w2ui.es6.min.js'
import gameEditorBottom from './bottom.js'

import gameDetails from './tabs/gameDetails.js'

import getAllWeaponTypes from './functions/globalDefaults/getAllWeaponTypes.js'
import getAllMagicTypes from './functions/globalDefaults/getAllMagicTypes.js'
import getGlobalGameDetails from './functions/globalDefaults/getGlobalGameDetails.js'
import getGlobalGeneralSettings from './functions/globalDefaults/getGlobalGeneralSettings.js'

let layout = new w2layout({
    name: 'GameEditor',
    panels: [
        { type: 'main', content: 'main', html: gameDetails},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: gameEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

layout.on('render', async function(event){
    if (!window.globalWeaponsTypes || window.globalWeaponsTypes.length === 0 || !window.globalWeaponsTypes[0].types){
        window.globalWeaponsTypes = await getAllWeaponTypes()
    }
    if (!window.globalMagicTypes || window.globalMagicTypes.length === 0 || !window.globalMagicTypes[0].types){
        window.globalMagicTypes = await getAllMagicTypes()
    }
    if (!window.globalGameDetails){
        window.globalGameDetails = await getGlobalGameDetails()
        window.GameEditorRequiredGameDetails.record = window.globalGameDetails[0]
        window.GameEditorRequiredGameDetails.refresh()
    } else {
        window.GameEditorRequiredGameDetails.record = window.globalGameDetails[0]
        window.GameEditorRequiredGameDetails.refresh()
    }
    if (!window.globalGeneralSettings){
        window.globalGeneralSettings = await getGlobalGeneralSettings()
        window.globalGeneralSettings.forEach(setting => {
            window[setting.setting] = setting.value
            window.GameEditorGlobalFields.record[setting.setting] = setting.value
        })
        window.GameEditorGlobalFields.refresh()
    }
})

export default layout