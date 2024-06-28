import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'

let units = []
if (window.allUnits){
    units = window.allUnits
}

let sidebar = new w2sidebar({
    name: 'UnitEditorLeft',
    flatButton: false,
    icon: {
        text(node) {
        }
    },
    nodes: 
        units.map(unit => { return { id: unit, text: unit } }) ,
    
})

window.UnitEditorLeftSidebar = sidebar

export default sidebar