import { w2layout, w2form } from '../../lib/w2ui.es6.min.js'
import {IconEditorControls, layers} from './controls.js'
import graphicStacks from '../utils/graphicStacks/graphicStacks.js'

let iconEditorEditor = new w2layout({
    name: 'iconEditorEditor',
    panels: [
        {
            type: 'right',
            content: 'right',
            size:'250',
            style: 'overflow: hidden;',
            html: 'icon editor left'
        },
        {
            type: 'main',
            content: 'main',
            resizable: true,
            style: 'padding:1rem;',

        }
    ]
})

iconEditorEditor.html('main', IconEditorControls())

iconEditorEditor.on('render', async function(event){
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.innerHTML = 'Icon Previews'
    h2.style.marginTop = '0'
    div.appendChild(h2)
    div.style.padding="1rem"
    div.style.width = '100%'
    div.style.height = '100%'
    let graphicStack = new graphicStacks(div)
    let tiny = new graphicStacks(div)
    window.IconEditorGraphicStack = graphicStack
    window.IconEditorGraphicStackTiny = tiny

    window.IconEditorStacksAddLayer = (layer) => {
        graphicStack.addLayer(layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        tiny.addLayer(tmp)
    }
    window.IconEditorStacksUpdateLayer = (index, layer) => {
        graphicStack.updateLayer(index, layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        tiny.updateLayer(index, tmp)
    }
    window.IconEditorStacksRemoveLayer = (index) => {
        graphicStack.removeLayer(index)
        tiny.removeLayer(index)
    }
    window.IconEditorStacksClear = () => {
        graphicStack.clear()
        tiny.clear()
    }
    window.IconEditorStacksTransform = (index, transform) => {
        graphicStack.transform(index, transform)
        tiny.transform(index, transform)
    }

    layers.forEach(layer => {
        graphicStack.addLayer(layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        tiny.addLayer(tmp)
    })
    iconEditorEditor.html('right', window.IconEditorGraphicStack.render())
})


window.iconEditorEditor = iconEditorEditor
export default iconEditorEditor

