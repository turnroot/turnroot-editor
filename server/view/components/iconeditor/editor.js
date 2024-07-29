import { w2layout, w2form } from '../../lib/w2ui.es6.min.js'
import graphicStacks from '../utils/graphicStacks/graphicStacks.js'

let layers = [
    {
        x:0,
        y:0,
        width:200,
        height:200,
        url:"/style/img/placeholder-circle.png",
        transform:"",
    }
]

let iconEditorEditor = new w2layout({
    name: 'iconEditorEditor',
    panels: [
        {
            type: 'right',
            content: 'right',
            size:'250',
            style: 'overflow-y: hidden;',
            html: 'icon editor left'
        },
        {
            type: 'main',
            content: 'main',
            resizable: true,
            style: 'padding:1rem;',
            html: 'icon editor main'

        }
    ]
})

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

