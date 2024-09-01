import { w2layout } from '../../lib/w2ui.es6.min.js'
import Layers from './canvas/layers.js'
import tileInfoDiv from './hovering/tileInfo.js'
import {div, minDiv} from './hovering/layers.js'
import sidebar from './BattlefieldEditorToolbar.js'

import tilesets from '../../style/img/defaultAssets/tilesets/tilesets.json' assert { type: 'json' }
window.BattlefieldEditorTilesets = {}

let layers = new Layers(35, 40, 64)
layers.setLayersDiv(div)
layers.setLayersDivMin(minDiv)
layers.addLayer('terrain')
layers.addLayer('details')
layers.addLayer('buildings')
layers.addLayer('special tiles')
layers.addLayer('decorations')
layers.setTileInfoDiv(tileInfoDiv)

let layout = new w2layout({
    name: 'BattlefieldEditor',
    panels: [
        { type: 'left', size: 32, content: 'left', html: sidebar},
        { type: 'top', size: 32, content: 'top'},
        { type: 'main', content: 'main', html: layers.container},
    ]
})

window.BattlefieldEditorLayers = layers 
window.BattlefieldEditorTilesetsUnparsed = tilesets.tilesets

export default layout