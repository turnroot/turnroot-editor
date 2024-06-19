let div = document.createElement('div')
import { w2field, query } from "../../../../lib/w2ui.es6.min.js"
div.style.width = '100%'
div.style.height = '100%'
div.style.padding = '1rem'

let innerHtml = `<div><h2>Tile rules</h2>
Units that move on their own get their tile interaction rules from here. Exercise <highlight>extreme caution</highlight> here- you can very easily break your game with a single misclick here. Do not modify unless you're confident in what you're doing! Otherwise, just load a preset.
<h3>What about flyers?</h3>
You may notice that most presets don't have any rules about flying. Flying units can move and see on most tiles, and aren't generally affected by effect tiles, so there's just one preset for them. You <em>must</em> use the "Flying" preset for all flying units for them to work properly.
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

let rows = [
    {left: 'ground', right: ['move', 'see']},
    {left: 'wall', right: ['stop', 'see']},
    {left: 'cliff', right: ['stop', 'blind']},
    {left: 'chasm', right: ['stop', 'see']},
    {left: 'trap', right: ['hurt immediately', 'hurt on turn start', 'see']},
    {left: 'fire', right: ['hurt on turn start', 'see']},
    {left: 'sand', right: ['move', 'slow*1', 'slow horse*2', 'see']},
    {left: 'stairs', right: ['move', 'slow*.5', 'slow horse*1', 'see']},
    {left: 'ice', right: ['move', 'slow*1.25', 'see']},
    {left: 'snow', right: ['move', 'slow*2', 'blind*.5']},
    {left: 'shallow_water', right: ['move', 'slow*1.5', 'slow horse*.5', 'see']},
    {left: 'deep_water', right: ['stop', 'see']},
    {left: 'locked_door', right: ['stop', 'blind']},
    {left: 'open_door', right: ['move', 'see']},
    {left: 'teleporter', right: ['move', 'see', 'warp']},
    {left: 'lever', right: ['move', 'see', 'use']},
    {left: 'switch', right: ['move', 'see', 'use']},
    {left: 'locked_chest', right: ['stop', 'see']},
    {left: 'open_chest', right: ['move', 'see']},
    {left: 'lava', right: ['stop', 'see']},
    {left: 'acid', right: ['stop', 'see']},
    {left: 'ranged_emplacement', right: ['move', 'see', 'arms']},
    {left: 'magic_emplacement', right: ['move', 'see', 'arms']},
    {left: 'heal', right: ['move', 'see', 'heal']},
    {left: 'stronghold', right: ['move', 'see', 'heal*1.5', 'guard*1.5', 'avoid*1']},
    {left: 'guard', right: ['move', 'see', 'guard*1']},
    {left: 'avoid', right: ['move', 'see', 'avoid*1']},
    {left: 'roof', right: ['stop', 'see']},
    {left: 'tallwall', right: ['stop', 'blind']},
    {left: 'shrubs', right: ['move', 'see', 'avoid*.5']},
    {left: 'bushes', right: ['move', 'slow*.5', 'see', 'avoid*1']},
    {left: 'trees', right: ['move', 'slow*1.5', 'see', 'avoid*1.5']},
    {left: 'boulder', right: ['stop', 'see']},
    {left: 'fence', right: ['stop', 'see']},
    {left: 'forest', right: ['move', 'slow*1.5', 'slow horse*2', 'blind*.5', 'avoid*2', 'hidden']},
    {left: 'fog', right: ['move', 'blind', 'stop if enemy', 'hidden']},
    {left: 'mist', right: ['move', 'blind*.5', 'stop if enemy']},
]

let allRights = [
    'move', 'see', 'stop', 'blind', 'hurt immediately', 'hurt on turn start', 'slow*1', 'slow horse*2', 'slow*.5', 'slow horse*1', 'slow*1.25', 'slow*2', 'blind*.5', 'slow*1.5', 'slow horse*.5', 'warp', 'use', 'heal', 'heal*1.5', 'guard*1.5', 'avoid*1', 'guard*1', 'avoid*.5', 'avoid*1.5', 'avoid*2', 'hidden', 'stop if enemy', 'arms', 'hidden'
]

rows.forEach(row => {
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
