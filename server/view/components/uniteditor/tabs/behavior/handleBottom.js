import { w2ui } from "../../../../lib/w2ui.es6.min.js"
import behaviorSliders from './sliders.js'
import behaviorTiles from './tiles.js'


const handleBottom = (event, toolbar) => {
    let unitEditorBehaviorContainer = w2ui['unit-editor-behavior-container']
    if (event.detail.item.id === 'unit-editor-behavior-container-bottom-toolbar-sliders'){
        unitEditorBehaviorContainer.html('main', behaviorSliders)
    } else if (event.detail.item.id === 'unit-editor-behavior-container-bottom-toolbar-tiles'){
        unitEditorBehaviorContainer.html('main', behaviorTiles)
    }
}

export default handleBottom