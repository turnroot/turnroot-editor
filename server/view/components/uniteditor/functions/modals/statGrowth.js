import {w2popup} from '../../../../lib/w2ui.es6.min.js'

let currentLevel = 1
let testStats = {}

const resetTestGrowths = (unchanged) => {
    Object.keys(unchanged).forEach((stat) => {
        testStats[stat] = unchanged[stat]
    })
    currentLevel = 1
}

window.unitEditorStatGrowthModalReset = (unchanged) => { return resetTestGrowths(unchanged) }

window.unitEditorStatGrowthModalReset = (stats) => { return resetTestGrowths(stats) }

let testGrowth = (stats, currentLevel) => {
    let html = ''
    Object.keys(stats).forEach((stat) => {
        let growth = stats[stat]
        let roll = Math.floor(Math.random() * 100)
        if (roll < growth) {
            testStats[stat]++
        }
        html += `<tr><td>${stat}</td><td>${testStats[stat]}</td></tr>`
    })
    currentLevel++
    return html
}

const build = (stats) => {
    testStats = {...stats}
    let levelUpTable = window.unitEditorStatGrowthModalTestGrowth(stats, currentLevel)
    let innerHtml = `
    <p>Each time a unit levels up, they have a 0-100% chance of any given stat increasing. You can set those here.</p>
    <table>
        <tr>
            <th>Stat</th>
            <th>Growth</th>
        </tr>
        ${Object.entries(stats).map(([stat, growth]) => `<tr><td>${stat}</td><td><input type="number" class="w2ui-input w2field" value="${growth}" id="growth-rate-modal-${stat}"></td></tr>`).join('')}
    </table>
    <div class = "flex"><button class="w2ui-btn" id ='test-growth-btn'>Test Growth</button><button class="w2ui-btn" id ='reset-growth-btn'>Reset </button></div>
    
    <p>This will take the base stats and the current growth rates and "level up" your unit. Each click increases the level by 1.<br/>Note that this isn't a prediction of what <em>will</em> happen- just an example of what <em>might</em> happen.</p>
    <p id="current-level">Current Level: Level ${currentLevel}</p>
    <table id ='level-up-table'>
        <tr>
            <th>Stat</th>
            <th>Value</th>
        </tr>
    </table>
    </div>`
    return innerHtml
}

window.unitEditorStatGrowthModalTestGrowth = (stats, currentLevel) => { return testGrowth(stats, currentLevel) }

window.unitEditorStatGrowthModalBuild = (stats) => { return build(stats) }

const statGrowthPopup = (stats) => {
    let div = document.createElement('div')
    let unchanged = {...stats} 
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.padding = '1rem'
    div.style.overflowY = 'auto'
    div.id = 'unit-editor-stat-growth-popup-inner'

    let innerHtml = window.unitEditorStatGrowthModalBuild(stats)

    div.innerHTML = innerHtml
    w2popup.open({
        title: 'Stat Growth',
        body: div,
        resizable: true,
        actions: {
            save: {
                text: 'Save',
                class: 'w2ui-btn',
                onClick(event) {
                    console.log('changed', stats)
                    w2popup.close()
                }
            },
            Cancel() {
                console.log('unchanged')
                stats = unchanged
                w2popup.close()
            }
        }
    }).then(() => {
        let popup = document.querySelector('#unit-editor-stat-growth-popup-inner').parentElement.parentElement.parentElement
        popup.style.height = '60vh'
        popup.style.width = '50vw'
        popup.style.minHeight = '400px'
        popup.style.top = '20vh'
        popup.style.left = '25vw'
        console.log('popup ready', stats)
        document.getElementById('test-growth-btn').addEventListener('click', () => {
            let levelUpTable = testGrowth(stats, currentLevel)
            document.getElementById('level-up-table').innerHTML = `
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
                ${levelUpTable}
            `
            currentLevel++
            document.getElementById('current-level').innerHTML = `Current Level: Level ${currentLevel}`
        })
        document.getElementById('reset-growth-btn').addEventListener('click', () => {
            resetTestGrowths(unchanged)
            document.getElementById('level-up-table').innerHTML = `
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            `
            currentLevel = 1
            document.getElementById('current-level').innerHTML = `Current Level: Level ${currentLevel}`
        })
    })

    Object.keys(stats).forEach((stat) => {
        let input = document.getElementById(`growth-rate-modal-${stat}`)
        input.addEventListener('change', (event) => {
            stats[stat] = Number(event.target.value)
        })
    })
}

export default statGrowthPopup