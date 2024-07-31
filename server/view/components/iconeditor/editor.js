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

const cookSmall = (el, div) => {
    el.innerHTML = div.innerHTML
    el.style.transform = 'scale(0.25)'
    el.style.backgroundColor = 'var(--window-background-alt)'
    el.style.borderRadius = '99rem'
    el.style.marginTop = '1rem'
    el.style.width = '216px'
    el.style.height = '216px'
    el.style.overflow = 'hidden'
    el.style.position = 'relative'
    el.style.left = "-80px"
    el.style.top = "-92px"
}

iconEditorEditor.html('main', IconEditorControls())

iconEditorEditor.on('render', async function(event){
    let container = document.createElement('div')
    container.style.padding = '1rem'
    let h2 = document.createElement('h2')
    h2.innerHTML = 'Icon Preview'
    container.appendChild(h2)
    

    let div = document.createElement('div')
    div.style = `padding:1rem; width:216px; height:216px;`
    div.style.backgroundColor = 'var(--window-background-alt)'
    div.style.borderRadius = '99rem'

    container.appendChild(div)
    let graphicStack =  new graphicStacks(div)

    let smallGraphicStack = document.createElement('div')
    cookSmall(smallGraphicStack, div)

    container.appendChild(smallGraphicStack)

    window.IconEditorGraphicStack = graphicStack

    window.IconEditorStacksAddLayer = (layer) => {
        window.IconEditorGraphicStack.addLayer(layer)
        smallGraphicStack.innerHTML = div.innerHTML
    }
    window.IconEditorStacksUpdateLayer = (index, layer) => {
        window.IconEditorGraphicStack.updateLayer(index, layer)
        cookSmall(smallGraphicStack, div)
    }
    window.IconEditorStacksRemoveLayer = (index) => {
        window.IconEditorGraphicStack.removeLayer(index)
        cookSmall(smallGraphicStack, div)
    }
    window.IconEditorStacksClear = () => {
        window.IconEditorGraphicStack.clear()
        cookSmall(smallGraphicStack, div)
    }
    window.IconEditorStacksTransform = (index, transform) => {
        window.IconEditorGraphicStack.transform(index, transform)
        cookSmall(smallGraphicStack, div)
    }

    layers.forEach(layer => {
        window.IconEditorGraphicStack.addLayer(layer)
        cookSmall(smallGraphicStack, div)
    })
    iconEditorEditor.html('right', container)
})


window.iconEditorEditor = iconEditorEditor
export default iconEditorEditor

