let div = document.createElement('div')
import { w2field, query } from "../../../../lib/w2ui.es6.min.js"
div.style.width = '100%'
div.style.height = '100%'
div.style.padding = '1rem'
import rows from './presets/tiles/default.js'
import flierRows from './presets/tiles/fliers.js'
import pirateRows from "./presets/tiles/pirate.js"
import beastRows from "./presets/tiles/beast.js"

let innerHtml = `<div><h2>Tile rules</h2>
Units that move on their own get their tile interaction rules from here. Exercise extreme caution here- you can very easily break your game with a single misclick here. There are no guardrails. Pick a preset and do not modify specifics unless you're confident in what you're doing! The default tile rules are correct for 99% of units, including riding and infantry units.
<h3>What about fliers?</h3>
Flying units are a special case- they ignore guard, heal, tile damage, slow, and avoid rules. You should use the "Flier" tile preset for all flying units.
<h3>What are the presets?</h3>
<ul>
    <li><highlight>Default</highlight>: The default tile rules for most units.</li>
    <li><highlight>Flier</highlight>: The tile rules for flying units.</li>
    <li><highlight>Pirate</highlight>: Tile rules for units that are agile in water.</li>
    <li><highlight>Beast</highlight>: Tile rules for units that are agile in forests and unaffected by fog or mist.</li>
</ul>
If you're not sure which preset to use, use the Default preset. 
</div>
`

div.innerHTML = innerHtml

let rules = document.createElement('div')
rules.id = 'unitEditorBehaviorRules'
rules.style.width = '100%'
rules.style.display = 'grid'
rules.style.gridTemplateColumns = '1fr 1fr'

function applyCommonStyles(element, styles) {
    Object.keys(styles).forEach(styleKey => {
        element.style[styleKey] = styles[styleKey]
    })
}

let commonStyles = {
    padding: '.5rem',
    backgroundColor: 'var(--list-background)',
    border: '1px solid var(--window-text)',
    height: '4rem',
    color: 'var(--node-title)'
}

let allRights = [
    'move', 'see', 'stop', 'blind', 'hurt immediately', 'hurt on turn start', 'slow*1', 'slow horse*2', 'slow*.5', 'slow horse*1', 'slow*1.25', 'slow*2', 'blind*.5', 'slow*1.5', 'slow horse*.5', 'warp', 'use', 'heal', 'heal*1.5', 'guard*1.5', 'avoid*1', 'guard*1', 'avoid*.5', 'avoid*1.5', 'avoid*2', 'hidden', 'stop if enemy', 'arms', 'hidden', 'open'
]

let presets = {
    Default: rows,
    Flier: flierRows,
    Pirate: pirateRows,
    Beast: beastRows
}

let preset = presets.Default

preset.forEach(row => {
    let left = document.createElement('div')
    left.innerHTML = row.left
    applyCommonStyles(left, commonStyles)
    rules.appendChild(left)

    let right = document.createElement('div')
    applyCommonStyles(right, commonStyles)
    right.style.padding = '0'

    let selectContainer = document.createElement('div')
    selectContainer.className = 'w2ui-field'
    selectContainer.style.backgroundColor = 'var(--node-title-background)'
    selectContainer.style.color = 'var(--node-title)'
    let select = document.createElement('input')
    select.id = 'unitEditorBehaviorTiles' + row.left

    selectContainer.appendChild(select)

    console.log(new w2field('enum', {items: allRights, selected: row.right, el: select, renderDrop: false, renderMulti: true, renderInline: true, renderItems: true, openOnFocus: true}))


    right.appendChild(selectContainer)

    rules.appendChild(right)
})

div.appendChild(rules)

export default div
