import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'

let units = [
    "Unit 1",
    "Unit 2",
    "Unit 3",
]
// get from database

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

export default sidebar