let div = document.createElement('div')
import { w2field, query } from "../../../../lib/w2ui.es6.min.js"
div.style.width = '100%'
div.style.height = '100%'
div.style.padding = '1rem'

let innerHtml = `<div><h2>Specials</h2>
Specials are a way to add unique behaviors to units.
`
div.innerHTML = innerHtml
let rules = document.createElement('div')
rules.style.width = '100%'
rules.style.display = 'grid'
rules.style.gridTemplateColumns = '6fr 9fr 1fr'

function applyCommonStyles(element, styles) {
    Object.keys(styles).forEach(styleKey => {
        element.style[styleKey] = styles[styleKey]
    })
}

let commonStyles = {
    padding: '.5rem',
    backgroundColor: 'var(--list-background)',
    border: '1px solid var(--window-background)',
    height: '4rem',
    color: 'var(--node-title)'
}

let rows = [
    {left: 'Flees', right: 'The unit will flee, avoid enemies, and refuse to attack or counterattack.'},
    {left: 'Invincible', right: 'The unit is immune to all damage.'},
    {left: 'Here to steal', right: 'The unit will only approach units with items to steal or chests.'},
    {left: 'Will not move', right: 'The unit will not move from its starting position.'},
    {left: 'Will not attack first', right: 'The unit will not attack first.'},
    {left: 'Can\'t be targeted', right: 'The unit cannot be targeted by enemies.'},
    {left: 'Suicidal', right: 'The unit will seek their own death.'},
    {left: 'Here for the objective', right: 'The unit will only move towards objective tiles, ignoring enemies.'},
    {left: 'Protect the leader', right: 'The unit will stay adjacent to the leader.'},
    {left: 'Will not move until attacked', right: 'The unit will not move until attacked.'},
    {left: 'Will not move until enemy in range', right: 'The unit will not move until an enemy is in range.'},
    {left: 'Ignores terrain', right: 'The unit can move through any terrain.'},
    {left: 'Move through units', right: 'The unit can move through other units.'},
    {left: 'Kill the avatar', right: 'The unit will always attack the avatar.'},
]

rows.forEach(row => {
    let left = document.createElement('div')
    left.innerHTML = row.left
    applyCommonStyles(left, commonStyles)
    rules.appendChild(left)

    let right = document.createElement('div')
    right.innerHTML = row.right
    applyCommonStyles(right, commonStyles)
    right.style.backgroundColor = 'var(--node-title)'
    right.style.color = 'var(--window-background-alt)'
    rules.appendChild(right)

    let far_right = document.createElement('div')
    far_right.innerHTML = `<input type="checkbox" class="w2ui-input" style="width:2rem;height:2rem;" id = "unitEditorBehaviorSpecials${row.left.replace(/ /g, "").replace(/'/g, "")}">`
    applyCommonStyles(far_right, commonStyles)
    far_right.style.backgroundColor = 'var(--node-title)'
    far_right.style.color = 'var(--window-background-alt)'
    rules.appendChild(far_right)
})

div.appendChild(rules)

export default div