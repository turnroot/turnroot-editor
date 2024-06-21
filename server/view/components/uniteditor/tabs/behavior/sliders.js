import CustomRangeSlider from '../../../utils/coloredRange.js'

let div = document.createElement('div')
div.style.width = '100%'
div.style.height = '100%'
div.style.padding = '1rem'

const setInnerHtml = () => {
    let html= `
    <div><h2>How does all this work?</h2>
    <em>As noted above, you should generally not worry about specific rules and just load a preset, then tweak the sliders.</em> 
    <h3>Sliders</h3>
    The sliders control the priority of a rule. The higher the priority, the more likely that rule is to occur.
    <h3>Customizing rules</h3>
    You can customize any rule with the dropdowns. For example, you could change Move towards nearest foe (Mindless) to Move towards nearest foe (Lone Wolf) by selecting 'Lone Wolf' from the dropdown.<br/><br/>
    The Priority and Target columns are customizable- the rule columns are set in stone. You can disable rules, but not add or change them. <br/><br/>`

return html
}

let explainer = document.createElement('div')
explainer.style.maxWidth = '100ch'
explainer.style.lineHeight = '1.5rem'

explainer.innerHTML = setInnerHtml()

div.appendChild(explainer)

let sliders = []
let slidersHTML = []

let innerHtml = `<div><h2>Behavior</h2>
<p>Units that move on their own have their behaviors controlled by these sliders, which in turn influence the priority of the rules below. The presets will cover most common cases- for specific units, you can tweak things as needed. Generally, you just need to load a preset.<br/><br/>For special behaviors, see the Specials tab.</p></div>
`

div.innerHTML = innerHtml

let presetsButtons = document.createElement('div')
presetsButtons.style.display = 'flex'
presetsButtons.style.flexWrap = 'wrap'
presetsButtons.style.justifyContent = 'center'
presetsButtons.style.gap = '.25rem'
presetsButtons.style.marginBottom = '1rem'
presetsButtons.style.width = '100%'

let defaultButton = document.createElement('button')
defaultButton.innerHTML = 'Foot Soldier'
defaultButton.className = 'w2ui-btn'

let mindlessCreatureButton = document.createElement('button')
mindlessCreatureButton.innerHTML = 'Mindless Creature'
mindlessCreatureButton.className = 'w2ui-btn'

let cautiousHealerButton = document.createElement('button')
cautiousHealerButton.innerHTML = 'Cautious Healer'
cautiousHealerButton.className = 'w2ui-btn'

let sniperButton = document.createElement('button')
sniperButton.innerHTML = 'Sniper'
sniperButton.className = 'w2ui-btn'

let steadfastTankButton = document.createElement('button')
steadfastTankButton.innerHTML = 'Steadfast Tank'
steadfastTankButton.className = 'w2ui-btn'


let independentAssassinButton = document.createElement('button')
independentAssassinButton.innerHTML = 'Independent Assassin'
independentAssassinButton.className = 'w2ui-btn'

let vengefulDemonButton = document.createElement('button')
vengefulDemonButton.innerHTML = 'Vengeful Demon'
vengefulDemonButton.className = 'w2ui-btn'

let weakCowardButton = document.createElement('button')
weakCowardButton.innerHTML = 'Weak Coward'
weakCowardButton.className = 'w2ui-btn'

let looterButton = document.createElement('button')
looterButton.innerHTML = 'Looter'
looterButton.className = 'w2ui-btn'

let buttons = [defaultButton, mindlessCreatureButton, cautiousHealerButton, sniperButton, steadfastTankButton, independentAssassinButton, vengefulDemonButton, weakCowardButton, looterButton]

let rows = [
    {left: 'Move towards', center: 'nearest foe', right: `Mindless`},
    {left: 'Move towards', center: 'disadvantaged foe', right: `Strategic`},
    {left: 'Move towards', center: 'last attacked foe', right: `Team Player`},
    {left: 'Move towards', center: 'safety', right: `Coward`},
    {left: 'Move towards', center: 'cover', right: `Coward`},
    {left: 'Move towards', center: 'hurt ally (can heal or rally)', right: `Selfless`},
    {left: 'Move towards', center: 'nearest objective tile', right: `Strategic`},
    {left: 'Move towards', center: 'chest (if can open)', right: `Greedy`},
    {left: 'Move towards', center: 'door (if can open)', right: `Lone Wolf`},
    {left: 'Move towards', center: 'fortress', right: `Strategic`},
    {left: 'Move towards', center: 'emplacement', right: `Lone Wolf`},
    {left: 'Move towards', center: 'minimize receiving attack count', right: `Team Player`},
    {left: 'Move towards', center: 'team leader', right: `Team Player`},
    {left: 'Move towards', center: 'furthest distance', right: `Lone Wolf`},
    {left: 'Move towards', center: 'player avatar', right: `Hero`}
]

let presets = {
    Default: ['Move towards nearest foe', 'Move towards last attacked foe', 'Move towards disadvantaged foe', 'Move towards nearest objective tile', 'Move towards team leader'],
    MindlessCreature: ['Move towards nearest foe', 'Move towards last attacked foe', 'Move towards nearest objective tile', 'Move towards furthest distance'],
    CautiousHealer: ['Move towards disadvantaged foe', 'Move towards minimize receiving attack count', 'Move towards safety', 'Move towards hurt ally (can heal or rally)', 'move towards fortress', 'Move towards cover'],
    Sniper: ['Move towards disadvantaged foe', 'Move towards last attacked foe', 'Move towards furthest distance', 'Move towards minimize receiving attack count', 'move towards emplacement', 'Move towards safety', 'Move towards cover'],
    SteadfastTank: ['Move towards nearest foe', 'Move towards last attacked foe', 'Move towards fortress', 'Move towards player avatar', 'Move towards disadvantaged foe', 'Move towards team leader', 'Move towards nearest objective tile'],
    IndependentAssassin: ['Move towards disadvantaged foe', 'Move towards last attacked foe', 'Move towards furthest distance', 'Move towards minimize receiving attack count', 'Move towards safety', 'Move towards cover', 'Move towards player avatar'],
    WeakCoward: ['Move towards safety', 'Move towards cover', 'Move towards hurt ally (can heal or rally)', 'Move towards nearest objective tile', 'Move towards team leader', 'Move towards minimize receiving attack count'],
    Looter: ['Move towards chest (if can open)', 'Move towards door (if can open)', 'Move towards safety', 'Move towards disadvantaged foe', 'Move towards nearest objective tile', 'minimize receiving attack count'],
    VengefulDemon: ['Move towards last attacked foe', 'Move towards disadvantaged foe', 'Move towards nearest foe', 'Move towards player avatar']
}

let presetSliders = {
    Default: {
        'unitEditorBehavior.TeamPlayer': 20,
        'unitEditorBehavior.Hero': 40,
        'unitEditorBehavior.Strategic': 50,
        'unitEditorBehavior.Selfless': 55,
        list: [20, 40, 50, 55]
    },
    MindlessCreature: {
        'unitEditorBehavior.TeamPlayer': 90,
        'unitEditorBehavior.Hero': 50,
        'unitEditorBehavior.Strategic': 90,
        'unitEditorBehavior.Selfless': 50,
        list: [90, 50, 90, 50]  
    },
    CautiousHealer: {
        'unitEditorBehavior.TeamPlayer': 20,
        'unitEditorBehavior.Hero': 30,
        'unitEditorBehavior.Strategic': 20,
        'unitEditorBehavior.Selfless': 10,
        list: [20, 30, 20, 10]
},
    Sniper: {
        'unitEditorBehavior.TeamPlayer': 90,
        'unitEditorBehavior.Hero': 70,
        'unitEditorBehavior.Strategic': 10,
        'unitEditorBehavior.Selfless': 80,
        list: [90, 70, 10, 80]
    },
    SteadfastTank: {
        'unitEditorBehavior.TeamPlayer': 10,
        'unitEditorBehavior.Hero': 10,
        'unitEditorBehavior.Strategic': 60,
        'unitEditorBehavior.Selfless': 50,
        list: [10, 10, 60, 50]
    },
    IndependentAssassin: {
        'unitEditorBehavior.TeamPlayer': 90,
        'unitEditorBehavior.Hero': 90,
        'unitEditorBehavior.Strategic': 10,
        'unitEditorBehavior.Selfless': 90,
        list: [90, 90, 10, 90]
    },
    WeakCoward: {
        'unitEditorBehavior.TeamPlayer': 30,
        'unitEditorBehavior.Hero': 90,
        'unitEditorBehavior.Strategic': 40,
        'unitEditorBehavior.Selfless': 70,
        list: [30, 90, 40, 70]
    },
    Looter: {
        'unitEditorBehavior.TeamPlayer': 90,
        'unitEditorBehavior.Hero': 50,
        'unitEditorBehavior.Strategic': 50,
        'unitEditorBehavior.Selfless': 90,
        list: [90, 50, 50, 90]
    },
    VengefulDemon: {
        'unitEditorBehavior.TeamPlayer': 70,
        'unitEditorBehavior.Hero': 10,
        'unitEditorBehavior.Strategic': 50,
        'unitEditorBehavior.Selfless': 30,
        list: [70, 10, 50, 30]
    }
}

const build = (p) => {
    rules.innerHTML = ''
    sliders.forEach((slider, index) => {
        let value = presetSliders[p].list[index]
        slider.setValue(value)
    })

    let preset = presets[p]

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
    
    let index = 0
    
    let headerLeft = document.createElement('div')
    let headerCenter = document.createElement('div')
    let headerRight = document.createElement('div')
    
    applyCommonStyles(headerLeft, commonStyles)
    applyCommonStyles(headerCenter, commonStyles)
    applyCommonStyles(headerRight, commonStyles)
    
    headerLeft.style.backgroundColor = 'var(--button-alt-text)'
    headerCenter.style.backgroundColor = 'var(--button-alt-text)'
    headerRight.style.backgroundColor = 'var(--button-alt-text)'
    headerLeft.style.color = 'var(--window-background-alt)'
    headerCenter.style.color = 'var(--window-background-alt)'
    
    headerLeft.innerHTML = '<strong>Rule</strong>'
    headerCenter.innerHTML = '<strong>Target</strong>'
    headerRight.innerHTML = '<strong>Priority</strong>'
    
    rules.appendChild(headerLeft)
    rules.appendChild(headerCenter)
    rules.appendChild(headerRight)

    rows.forEach(row => {
        if (preset.includes(row.left + ' ' + row.center)) {
        let left = document.createElement('div')
        let center = document.createElement('div')
        let right = document.createElement('div')
    
        left.innerHTML = row.left
        center.innerHTML = row.center
        right.innerHTML = `
            <select id="unitEditorBehaviorRule${row.left.replace(' ', '')+row.center.replace(' ', '')}" name="unitEditorBehaviorRule${row.left.replace(' ', '')+row.center.replace(' ', '')}" class="w2ui-input " tabindex="1" style = "width:100%;height:100%;margin:0;font-size:1rem;border-radius:0;" onchange='window.unitEditorBehaviorUpdateWindow()'>
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
        applyCommonStyles(right, commonStyles, false)

        right.style.margin = '0'
        right.style.padding = '0px!important'
    
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
    }})
}

defaultButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    defaultButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('Default')
}

mindlessCreatureButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    mindlessCreatureButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('MindlessCreature')
}

cautiousHealerButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    cautiousHealerButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('CautiousHealer')
}

sniperButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    sniperButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('Sniper')
}

steadfastTankButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    steadfastTankButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('SteadfastTank')
}

independentAssassinButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    independentAssassinButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('IndependentAssassin')
}

weakCowardButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    weakCowardButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('WeakCoward')
}

vengefulDemonButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    vengefulDemonButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('VengefulDemon')
}

looterButton.onclick = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 80%,var(--slider-1))'
    })
    looterButton.style.backgroundColor = 'color-mix(in srgb,var(--node-background) 40%,var(--slider-1))'
    build('Looter')
}


buttons.forEach(button => {
    presetsButtons.appendChild(button)
})

div.appendChild(presetsButtons)


let labels = [
    { left: 'Team Player', right: 'Lone Wolf' },
    { left: 'Hero', right: 'Coward' },
    { left: 'Strategic', right: 'Mindless' },
    { left: 'Selfless', right: 'Greedy'}
]

let values = {
    'unitEditorBehavior.TeamPlayer': 50,
    'unitEditorBehavior.Hero': 50,
    'unitEditorBehavior.Strategic': 50,
    'unitEditorBehavior.Selfless': 50,
    list: [50, 50, 50, 50]
}

let slider, leftLabel, rightLabel, sliderMid
labels.forEach(label => {

    leftLabel = document.createElement('p')
    leftLabel.innerHTML = label.left
    leftLabel.style.width = '12%'

    rightLabel = document.createElement('p')
    rightLabel.innerHTML = label.right
    rightLabel.style.width = '12%'

    sliderMid = document.createElement('div')
    sliderMid.style.flexGrow = 2

    slider = new CustomRangeSlider(sliderMid)
    slider.onchange = (value) => {
        values[`unitEditorBehavior.${label.left.replace(' ', '')}`] = value
        updateWindow()
    }
    slidersHTML.push([
        leftLabel,
        sliderMid,
        rightLabel
    ])
    sliders.push(slider)
})

slidersHTML.forEach(slider => {
    let sliderContainer = document.createElement('div')
    sliderContainer.innerHTML = ''
    sliderContainer.style.display = 'flex'
    sliderContainer.style.justifyContent = 'space-between'
    sliderContainer.style.alignItems = 'center'
    sliderContainer.appendChild(slider[0])
    sliderContainer.appendChild(slider[1])
    sliderContainer.appendChild(slider[2])
    div.appendChild(sliderContainer)
})


let rules = document.createElement('div')
rules.id = 'unitEditorBehaviorRules'
rules.style.width = '100%'
rules.style.display = 'grid'
rules.style.gridTemplateColumns = '1fr 1fr 1fr'

function applyCommonStyles(element, styles, padding=true) {
    Object.keys(styles).forEach(styleKey => {
        if (!padding && styleKey === 'padding') {element.style.padding = '0'; return} else {
        element.style[styleKey] = styles[styleKey]}
    })
}

let commonStyles = {
    padding: '.5rem',
    border: '1px solid var(--window-background)',
    height: '2.5rem',
    color: 'var(--window-background-alt)'
}

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

let index = 0

let headerLeft = document.createElement('div')
let headerCenter = document.createElement('div')
let headerRight = document.createElement('div')

applyCommonStyles(headerLeft, commonStyles)
applyCommonStyles(headerCenter, commonStyles)
applyCommonStyles(headerRight, commonStyles)

headerLeft.style.backgroundColor = 'var(--button-alt-text)'
headerCenter.style.backgroundColor = 'var(--button-alt-text)'
headerRight.style.backgroundColor = 'var(--button-alt-text)'
headerLeft.style.color = 'var(--window-background-alt)'
headerCenter.style.color = 'var(--window-background-alt)'

headerLeft.innerHTML = '<strong>Rule</strong>'
headerCenter.innerHTML = '<strong>Target</strong>'
headerRight.innerHTML = '<strong>Priority</strong>'

rules.appendChild(headerLeft)
rules.appendChild(headerCenter)
rules.appendChild(headerRight)

const updateWindow = () => {
    console.log('updating window')
    window.unitEditorBehaviorTeamPlayer = values['unitEditorBehavior.TeamPlayer']
    window.unitEditorBehaviorHero = values['unitEditorBehavior.Hero']
    window.unitEditorBehaviorStrategic = values['unitEditorBehavior.Strategic']
    window.unitEditorBehaviorSelfless = values['unitEditorBehavior.Selfless']

    values.list = [window.unitEditorBehaviorTeamPlayer, window.unitEditorBehaviorHero, window.unitEditorBehaviorStrategic, window.unitEditorBehaviorSelfless]

    let rulesRows = rules.children

    for (let i = 3; i < rulesRows.length; i += 3) {
        let row = [rulesRows[i], rulesRows[i + 1], rulesRows[i + 2]]
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
        console.log(row[2].style.backgroundColor)
    }
}

window.unitEditorBehaviorUpdateWindow = updateWindow

updateWindow()
sliders.forEach((slider, index) => {
    let value = values.list[index]
    slider.setValue(value)
})

div.appendChild(rules)


headerRight.style.backgroundColor = 'var(--button-alt-text)'

export default div
