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
Units that move on their own get their tile interaction rules from here. Exercise extreme caution here- you can very easily break your game with a single misclick here. There are no guardrails. Pick a preset and do not modify specifics unless you're confident in what you're doing! The default tile rules are correct for 99% of units, including riding and infantry units. You should use the "Flier" tile preset for all flying units.
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

let presetsButtons = document.createElement('div')
presetsButtons.style.display = 'flex'
presetsButtons.style.justifyContent = 'center'
presetsButtons.style.gap = '.25rem'
presetsButtons.style.marginBottom = '1rem'
presetsButtons.style.width = '100%'

let defaultButton = document.createElement('button')
defaultButton.innerHTML = 'Default'
defaultButton.className = 'w2ui-btn'

let flierButton = document.createElement('button')
flierButton.innerHTML = 'Flier'
flierButton.className = 'w2ui-btn'

let pirateButton = document.createElement('button')
pirateButton.innerHTML = 'Pirate'
pirateButton.className = 'w2ui-btn'

let beastButton = document.createElement('button')
beastButton.innerHTML = 'Beast'
beastButton.className = 'w2ui-btn'

let buttons = [defaultButton, flierButton, pirateButton, beastButton]

let presets = {
    Default: rows,
    Flier: flierRows,
    Pirate: pirateRows,
    Beast: beastRows
}

defaultButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    defaultButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build(presets.Default)
}

flierButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    flierButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build(presets.Flier)
}

pirateButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    pirateButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build(presets.Pirate)
}

beastButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    beastButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build(presets.Beast)
}

presetsButtons.appendChild(defaultButton)
presetsButtons.appendChild(flierButton)
presetsButtons.appendChild(pirateButton)
presetsButtons.appendChild(beastButton)

div.appendChild(presetsButtons)

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
    border: '1px solid var(--window-background)',
    height: '4rem',
    color: 'var(--node-title)'
}

let allRights = [
    'move', 'see', 'stop', 'blind', 'hurt immediately', 'hurt on turn start', 'slow*1', 'slow horse*2', 'slow*.5', 'slow horse*1', 'slow*1.25', 'slow*2', 'blind*.5', 'slow*1.5', 'slow horse*.5', 'warp', 'use', 'heal', 'heal*1.5', 'guard*1.5', 'avoid*1', 'guard*1', 'avoid*.5', 'avoid*1.5', 'avoid*2', 'hidden', 'stop if enemy', 'arms', 'hidden', 'open'
]

const build = (preset) => {
    rules.innerHTML = ''
    preset.forEach(row => {
        let left = document.createElement('div')
        left.innerHTML = row.left
        applyCommonStyles(left, commonStyles)
        rules.appendChild(left)

        let right = document.createElement('div')
        applyCommonStyles(right, commonStyles)
        right.style.padding = '0'

        let selectContainer = document.createElement('div')
        selectContainer.className = 'w2ui-field expand'
        selectContainer.style.backgroundColor = 'var(--node-title-background)'
        selectContainer.style.color = 'var(--node-title)'
        let select = document.createElement('input')
        select.id = 'unitEditorBehaviorTiles' + row.left.replace(' ', '')

        selectContainer.appendChild(select)

        new w2field('enum', {items: allRights, selected: row.right, el: select, renderDrop: false, renderMulti: true, renderInline: true, renderItems: true})


        right.appendChild(selectContainer)

        rules.appendChild(right)
    })
}

div.appendChild(rules)
defaultButton.click()

export default div
