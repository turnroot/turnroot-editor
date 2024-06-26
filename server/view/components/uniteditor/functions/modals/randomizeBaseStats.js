import {w2popup} from '../../../../lib/w2ui.es6.min.js'

let original
let variances

const resetVariances = (unchanged) => {
    Object.keys(unchanged).forEach((stat) => {
        variances[stat] = 0
    })
}

const baseStatRandomizerPopup = (stats) => {
    original = {...stats}
    Object.keys(stats).forEach((stat) => {
        variances[stat] = 0
    })

    let innerHtml = `
    <p>Each time a unit is created, their base stats are randomized within a range. You can set those ranges here.</p>
    <table>
        <tr>
            <th>Stat</th>
            <th>Min</th>
            <th>Max</th>
        </tr>
        ${Object.entries(variances).map(([stat, variance]) => `<tr><td>${stat}</td><td><input type="number" class="w2ui-input w2field" value="${variance}" id="variance-modal-${stat}"></td><td>+/-<input type="number" class="w2ui-input" value="${variance}" id="variance-modal-${stat}"></td></tr>`).join('')}
    </table>
    <div class = "flex"><button class="w2ui-btn" id ='randomize-stats-btn'>Randomize Stats</button><button class="w2ui-btn" id ='reset-stats-btn'>Reset </button></div>`

    w2popup.open({
        title: 'Randomize Base Stats',
        body: innerHtml,
        width: 800,
        height: 600,
        showMax: true,
        modal: true
    })
}

export default baseStatRandomizerPopup