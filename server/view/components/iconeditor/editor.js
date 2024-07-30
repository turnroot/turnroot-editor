import { w2layout, w2form } from '../../lib/w2ui.es6.min.js'
import {IconEditorControls, layers} from './controls.js'
import graphicStacks from '../utils/graphicStacks/graphicStacks.js'

let iconEditorEditor = new w2layout({
    name: 'iconEditorEditor',
    panels: [
        {
            type: 'right',
            content: 'right',
            size:'400',
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
    let container = document.createElement('div')
    container.style.padding = '1rem'
    let h2 = document.createElement('h2')
    h2.innerHTML = 'Icon Preview'
    container.appendChild(h2)
    
    let sizes = [{width: '216px', height: '216px'}, {width: '56px', height: '56px'}]
    let graphicStacksArray = sizes.map(size => {
        let div = document.createElement('div')
        div.style = `padding:1rem; width:${size.width}; height:${size.height};`
        div.style.backgroundColor = 'var(--window-background-alt)'
        div.style.borderRadius = '0.5rem'
        if (size.width === '56px') div.style.marginTop = '1rem';
        container.appendChild(div)
        return new graphicStacks(div)
    })

    window.IconEditorGraphicStack = graphicStacksArray[0]
    window.IconEditorGraphicStackTiny = graphicStacksArray[1]

    window.IconEditorStacksAddLayer = (layer) => {
        window.IconEditorGraphicStack.addLayer(layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        window.IconEditorGraphicStackTiny.addLayer(tmp)
    }
    window.IconEditorStacksUpdateLayer = (index, layer) => {
        window.IconEditorGraphicStack.updateLayer(index, layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        window.IconEditorGraphicStackTiny.updateLayer(index, tmp)
    }
    window.IconEditorStacksRemoveLayer = (index) => {
        window.IconEditorGraphicStack.removeLayer(index)
        window.IconEditorGraphicStackTiny.removeLayer(index)
    }
    window.IconEditorStacksClear = () => {
        window.IconEditorGraphicStack.clear()
        window.IconEditorGraphicStackTiny.clear()
    }
    window.IconEditorStacksTransform = (index, transform) => {
        window.IconEditorGraphicStack.transform(index, transform)
        window.IconEditorGraphicStackTiny.transform(index, transform)
    }

    layers.forEach(layer => {
        window.IconEditorGraphicStack.addLayer(layer)
        let tmp = JSON.parse(JSON.stringify(layer))
        tmp.width = 40
        tmp.height = 40
        window.IconEditorGraphicStackTiny.addLayer(tmp)
    })
    iconEditorEditor.html('right', container)
})


window.iconEditorEditor = iconEditorEditor
export default iconEditorEditor

