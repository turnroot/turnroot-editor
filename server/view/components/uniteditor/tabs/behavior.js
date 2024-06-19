import CustomRangeSlider from '../../utils/coloredRange.js'

let div = document.createElement('div')
div.style.width = '100%'
div.style.height = '100%'
div.style.padding = '1rem'

let innerHtml = `<div><h2>Behavior</h2>
<small>Units that move on their own have their behaviors controlled by these sliders, which in turn influence the priority of the rules below. The presets will cover most common cases- for specific units, you can tweak things as needed. Generally, you just need to load a preset.</small></div>
`

div.innerHTML = innerHtml

let labels = [
    { left: 'Team Player', right: 'Lone Wolf' },
    { left: 'Hero', right: 'Coward' },
    { left: 'Strategic', right: 'Mindless' },
    { left: 'Selfless', right: 'Greedy'}
]

let values = {
    'unitEditorBehavior.TeamPlayer': 20,
    'unitEditorBehavior.Hero': 40,
    'unitEditorBehavior.Strategic': 50,
    'unitEditorBehavior.Selfless': 55,
    list: [20, 40, 50, 55]
}


let sliders = []
labels.forEach(label => {
    let sliderContainer = document.createElement('div')
    sliderContainer.style.display = 'flex'
    sliderContainer.style.justifyContent = 'space-between'
    sliderContainer.style.alignItems = 'center'

    let leftLabel = document.createElement('p')
    leftLabel.innerHTML = label.left
    leftLabel.style.width = '12%'

    let rightLabel = document.createElement('p')
    rightLabel.innerHTML = label.right
    rightLabel.style.width = '12%'

    let sliderMid = document.createElement('div')
    sliderMid.style.flexGrow = 2

    let slider = new CustomRangeSlider(sliderMid)
    sliders.push(slider)
    slider.onchange = (value) => {
        values[`unitEditorBehavior.${label.left.replace(' ', '')}`] = value
        updateWindow()
    }

    sliderContainer.appendChild(leftLabel)
    sliderContainer.appendChild(sliderMid)
    sliderContainer.appendChild(rightLabel)

    div.appendChild(sliderContainer)
})

let rules = document.createElement('div')
rules.id = 'unitEditorBehaviorRules'
rules.style.width = '100%'
rules.style.display = 'grid'
rules.style.gridTemplateColumns = '1fr 1fr 1fr 2rem'

function applyCommonStyles(element, styles) {
    Object.keys(styles).forEach(styleKey => {
        element.style[styleKey] = styles[styleKey];
    })
}

let commonStyles = {
    padding: '.5rem',
    border: '1px solid var(--window-text)',
    height: '2.5rem',
    color: 'var(--window-background-alt)'
};

let behaviorStyles = {
    'Team Player': 'unitEditorBehaviorTeamPlayer',
    'Lone Wolf': 'unitEditorBehaviorTeamPlayer',
    'Hero': 'unitEditorBehaviorHero',
    'Coward': 'unitEditorBehaviorHero',
    'Strategic': 'unitEditorBehaviorStrategic',
    'Mindless': 'unitEditorBehaviorStrategic',
    'Selfless': 'unitEditorBehaviorSelfless',
    'Greedy': 'unitEditorBehaviorSelfless'
}

let rows = [
    {left: 'Move towards', center: 'nearest foe', right: `Mindless`},
    {left: 'Move towards', center: 'disadvantaged foe', right: `Strategic`},
    {left: 'Move towards', center: 'last attacked foe', right: `Team Player`},
    {left: 'Move towards', center: 'safety', right: `Coward`},
    {left: 'Move towards', center: 'hurt ally (can heal or rally)', right: `Selfless`},
    {left: 'Move towards', center: 'nearest objective tile', right: `Strategic`},
    {left: 'Move towards', center: 'chest (if can open)', right: `Greedy`},
]

let index = 0

let headerLeft = document.createElement('div')
let headerCenter = document.createElement('div')
let headerRight = document.createElement('div')
let headerFarRight = document.createElement('div')

applyCommonStyles(headerLeft, commonStyles)
applyCommonStyles(headerCenter, commonStyles)
applyCommonStyles(headerRight, commonStyles)
applyCommonStyles(headerFarRight, commonStyles)

headerLeft.style.backgroundColor = 'var(--button-alt-text)'
headerCenter.style.backgroundColor = 'var(--button-alt-text)'
headerRight.style.backgroundColor = 'var(--button-alt-text)'
headerFarRight.style.backgroundColor = 'var(--button-alt-text)'
headerFarRight.style.color = 'var(--window-background-alt)'
headerLeft.style.color = 'var(--window-background-alt)'
headerCenter.style.color = 'var(--window-background-alt)'

headerLeft.innerHTML = '<strong>Rule</strong>'
headerCenter.innerHTML = '<strong>Target</strong>'
headerRight.innerHTML = '<strong>Priority</strong>'

rules.appendChild(headerLeft)
rules.appendChild(headerCenter)
rules.appendChild(headerRight)
rules.appendChild(headerFarRight)

rows.forEach(row => {
    index++
    let left = document.createElement('div')
    let center = document.createElement('div')
    let right = document.createElement('div')
    let far_right = document.createElement('div')

    right.style.margin = '0'
    right.style.padding = '0!important'
    far_right.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-off"><path d="M13.67 8H18a2 2 0 0 1 2 2v4.33"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M22 22 2 2"/><path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586"/><path d="M9 13v2"/><path d="M9.67 4H12v2.33"/></svg>`
    far_right.style.display = 'flex'
    far_right.style.justifyContent = 'center'
    far_right.style.alignItems = 'center'
    far_right.style.backgroundColor = 'var(--node-title)'
    far_right.style.color = 'var(--window-background-alt)'
    far_right.style.height = '2.5rem'

    left.innerHTML = row.left
    center.innerHTML = row.center
    right.innerHTML = `
         <select id="unitEditorBehaviorRule${row.left.replace(' ', '')}" name="unitEditorBehaviorRule${row.left.replace(' ', '')}" class="w2ui-input " tabindex="1" style = "width:100%;height:100%;margin:0;font-size:1rem;border-radius:0;" onchange='window.unitEditorBehaviorUpdateWindow()'>
            <option value="Team Player" ${row.right === 'Team Player' ? 'selected' : ''}>Team Player</option>
            <option value="Lone Wolf" ${row.right === 'Lone Wolf' ? 'selected' : ''}>Lone Wolf</option>
            <option value="Hero" ${row.right === 'Hero' ? 'selected' : ''}>Hero</option>
            <option value="Coward" ${row.right === 'Coward' ? 'selected' : ''}>Coward</option>
            <option value="Strategic" ${row.right === 'Strategic' ? 'selected' : ''}>Strategic</option>
            <option value="Mindless" ${row.right === 'Mindless' ? 'selected' : ''}>Mindless</option>
            <option value="Selfless" ${row.right === 'Selfless' ? 'selected' : ''}>Selfless</option>
            <option value="Greedy" ${row.right === 'Greedy' ? 'selected' : ''}>Greedy</option>
         </select>`

    applyCommonStyles(left, commonStyles)
    applyCommonStyles(center, commonStyles)
    applyCommonStyles(right, commonStyles)

    left.style.backgroundColor = 'var(--node-text)'
    center.style.backgroundColor = 'var(--node-title)'
    if (behaviorStyles[row.right]) {
        right.children[0].style.backgroundColor = `color-mix(in oklab,var(--slider-0) ${window[behaviorStyles[row.right]]}%,var(--slider-1))`
    } else {
        right.children[0].style.backgroundColor = 'var(--node-text)'
    }
    rules.appendChild(left)
    rules.appendChild(center)
    rules.appendChild(right)
    rules.appendChild(far_right)
})

const updateWindow = () => {
    window.unitEditorBehaviorTeamPlayer = values['unitEditorBehavior.TeamPlayer']
    window.unitEditorBehaviorHero = values['unitEditorBehavior.Hero']
    window.unitEditorBehaviorStrategic = values['unitEditorBehavior.Strategic']
    window.unitEditorBehaviorSelfless = values['unitEditorBehavior.Selfless']

    let rulesRows = rules.children
    console.log(rulesRows)

    for (let i = 4; i < rulesRows.length; i += 4) {
        let row = [rulesRows[i], rulesRows[i + 1], rulesRows[i + 2], rulesRows[i + 3]]
        let value = row[2].children[0].value
        if (value === 'Team Player' || value === 'Lone Wolf'){
            row[2].style.backgroundColor = `color-mix(in oklab,var(--slider-0) ${window.unitEditorBehaviorTeamPlayer}%,var(--slider-1))`}
        else if (value === 'Hero' || value === 'Coward'){
            row[2].style.backgroundColor = `color-mix(in oklab,var(--slider-0) ${window.unitEditorBehaviorHero}%,var(--slider-1))`}
        else if (value === 'Strategic' || value === 'Mindless'){
            row[2].style.backgroundColor = `color-mix(in oklab,var(--slider-0) ${window.unitEditorBehaviorStrategic}%,var(--slider-1))`}
        else if (value === 'Selfless' || value === 'Greedy'){
            row[2].style.backgroundColor = `color-mix(in oklab,var(--slider-0) ${window.unitEditorBehaviorSelfless}%,var(--slider-1))`}
        else {
            row[2].style.backgroundColor = 'var(--node-text)'
        } 
    }
}

window.unitEditorBehaviorUpdateWindow = updateWindow

updateWindow()
sliders.forEach((slider, index) => {
    let value = values.list[index]
    slider.setValue(value)
})

div.appendChild(rules)

const setInnerHtml = (currentRoll) => {
    let html= `
    <div><h2>How does all this work?</h2>
 
    <em>As noted above, you should generally not worry about specific rules and just load a preset, then tweak the sliders.</em> 
    <h3>Disabling a rule</h3>
    The presets are designed to be subtractive- if you want to disable a certain rule, click on the 'bot-hide' icon in the right column. For example, if you want to disable the unit from moving towards chests, ever, click on the 'bot-hide' icon in the right column of the 'Move towards chest (if can open)' row. The unit will no longer move towards chests.
    <h3>Sliders</h3>
    The sliders control the priority of a rule. The higher the priority, the more likely that rule is to occur.<br/><br/>
    Let's say you've loaded the default 'Foot Soldier' preset. The first rule in the preset is 'Move towards nearest foe (Mindless).' As the 'Strategic/Mindless' slider is about 60% percent towards strategic by default, this rule has a 40% chance of being used on any given movement. If you move the 'Strategic/Mindless' slider all the way to 'Mindless', the rule will have a 100% chance of being used. If you move it all the way to 'Strategic', the rule will have a 0% chance of being used. If you move it to 50%, the rule will have a 50% chance of being used.
    <h3>An example movement</h3>
    <details>
    Let's say again you're using the default 'Foot Soldier' preset. This foot soldier is not injured, in range of enemies, and can attack. There are also safe tiles, allies, and a leader nearby.<br/><br/>
    Let's make a random 'roll' (between 0 and 100) for this movement:<br/><br/>
    ${currentRoll} <button class = 'w2ui-btn' onclick="window.unitEditorBehaviorRandomRoll()" >Reroll</button><br/><br/>
    The first rule, 'Move towards nearest foe (Mindless)', has a 50% chance of being used. The roll was ${currentRoll}. The rule is ${currentRoll > 50 ? 'used' : 'not used'}.<br/><br/>
    The next rule, 'Move towards disadvantaged foe (Strategic)', has a 50% chance of being used. The roll was ${currentRoll}. The rule is ${currentRoll > 50 ? 'used' : 'not used'}.<br/><br/>
    The next rule, 'Move towards last attacked foe (Team Player)', has a 80% chance of being used. The roll was ${currentRoll}. The rule is ${currentRoll > 20 ? 'used' : 'not used'}.<br/><br/>
    As this unit is not injured, the "Move towards safety (Coward)" rule is not used.  There are no hurt allies, so "Move towards hurt ally (Selfless)" is ignored.<br/><br/>
    There is no objective tile, so "Move towards nearest objective tile (Strategic)" is ignored.<br/><br/>
    There is no chest, so "Move towards chest (if can open) (Greedy)" is ignored.<br/><br/>
    Now we know that these rules will be used:<br/>
    ${currentRoll > 40 ? 'Move towards nearest foe (Mindless)<br/>' : ''}
    ${currentRoll > 50 ? 'Move towards disadvantaged foe (Strategic)<br/>' : ''}
    ${currentRoll > 20 ? 'Move towards last attacked foe (Team Player)<br/><br/>' : ''}
    Which of these rules takes priority? The random roll is used again, respecting the slider values:<br/>
`

if (currentRoll <= 100 && currentRoll > 50){
    html += `The 'Move towards last attacked foe (Team Player)' rule is used.`
} 
else if (currentRoll <= 50 && currentRoll > 20){
    html += `The 'Move towards disadvantaged foe (Strategic)' rule is used.`
}
else if (currentRoll <= 20){
    html += `The 'Move towards nearest foe (Mindless)' rule is used.`
}

html +=`
</details>
<h3>Customizing rules</h3>
You can customize any rule with the dropdowns. For example, you could change Move towards nearest foe (Mindless) to Move towards nearest foe (Lone Wolf) by selecting 'Lone Wolf' from the dropdown.<br/><br/>
The Priority and Target columns are customizable- the rule columns are set in stone. You can disable rules, but not add or change them. Rules control every aspect of unit movement, so be careful when changing them. You could, for instance, easily change a 'cannot move on high walls' rule to 'cannot move on ground' rule, which would prevent the unit from moving at all under any circumstances.<br/><br/>`

return html

}

let explainer = document.createElement('div')
explainer.style.maxWidth = '100ch'
explainer.style.lineHeight = '1.5rem'
let randomRoll = () => {return Math.floor(Math.random() * 101)}
window.unitEditorBehaviorCurrentRoll=0
window.unitEditorBehaviorRandomRoll = () => {
    window.unitEditorBehaviorCurrentRoll = randomRoll()
    explainer.innerHTML = setInnerHtml(window.unitEditorBehaviorCurrentRoll, window.unitEditorBehaviorSecondRoll)
}
window.unitEditorBehaviorRandomRoll()

let currentRoll = window.unitEditorBehaviorCurrentRoll

explainer.innerHTML = setInnerHtml(currentRoll)

div.appendChild(explainer)
headerRight.style.backgroundColor = 'var(--button-alt-text)'

export default div
