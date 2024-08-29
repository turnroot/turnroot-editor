import { w2layout } from '../../lib/w2ui.es6.min.js'
import Layers from './canvas/layers.js'
import tileInfoDiv from './hovering/tileInfo.js'
let defaultLayers = new Layers(60, 60)
defaultLayers.setTileInfoDiv(tileInfoDiv)

let layout = new w2layout({
    name: 'BattlefieldEditor',
    panels: [
        { type: 'left', size: 30, resizable: true, content: 'top', html: '<div style="padding: 10px;">Left</div>'},
        { type: 'top', size: 30, resizable: false, content: 'top', html: '<div style="padding: 10px;">Top</div>'},
        { type: 'main', content: 'main', html: defaultLayers.container},
    ]
})

export default layout