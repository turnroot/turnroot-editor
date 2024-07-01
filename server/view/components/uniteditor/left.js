import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'

let units = []
let unitMap = {}
let nodes = []

let sidebar = new w2sidebar({
    name: 'UnitEditorLeft',
    flatButton: false,
    icon: {
        text(node) {
        }
    },
    nodes: []
    
})

window.UnitEditorLeftSidebar = sidebar

export default sidebar