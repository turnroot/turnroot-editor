import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

let original = {}
let variances = {}

const resetVariances = (form) => {
    Object.keys(original).forEach((stat) => {
        variances[stat] = 0
        form.record['baseStatsRandomizedAmount'+stat] = variances[stat]
    })
    document.querySelectorAll('.baseStatRandomizerNumberInput').forEach((input) => {
        input.value = 0
    })
}

const changeVariance = (stat, value, form) => {
    variances[stat] = parseInt(value)
    form.record['baseStatsRandomizedAmount'+stat] = variances[stat]
}

const disableStatRandomization = (stat, form) => {
    form.record['baseStatsRandomizedEnabled'+stat] = !form.record['baseStatsRandomizedEnabled'+stat]
}

window.UnitEditorBaseStatRandomizerChangeVariance = changeVariance
window.UnitEditorBaseStatRandomizerDisableStatRandomization = disableStatRandomization
window.UnitEditorBaseStatRandomizerResetVariances = resetVariances

const baseStatRandomizerPopup = (stats, form) => {
    original = {...stats}
    Object.keys(stats).forEach((stat) => {
        variances[stat] = 0
        form.record['baseStatsRandomizedEnabled'+stat] = true
        form.record['baseStatsRandomizedAmount'+stat] = variances[stat]
    })

    let innerHtml = `
    <h2>Randomize Base Stats</h2>
    <p>When a non-unique unit is spawned, set the random variance for the base stats. Each variance is the min/max the stat could be increased by- for example, a variance of 3 on a base stat HP at 25 would mean a random spawn could have between 22-28 HP.</p>
    <table>
        <tr>
            <th>Stat</th>
            <th>Original</th>
            <th>Randomized</th>
            <th>Enabled</th>
        </tr>
        ${Object.keys(stats).map((stat) => {
            return `
            <tr>
                <td>${stat}</td>
                <td>${stats[stat]}</td>
                <td><input type="number" class="w2ui-input baseStatRandomizerNumberInput" min="0" max="${Math.floor(stats[stat]/2)}" value="${variances[stat]}" onchange="UnitEditorBaseStatRandomizerChangeVariance('${stat}', this.value, window.unitEditorBasicFields)"></td>
                <td><input type="checkbox" checked onchange="UnitEditorBaseStatRandomizerDisableStatRandomization('${stat}', window.unitEditorBasicFields)"></td>
            </tr>
            `
        }).join('')}
        </table>
        <button class="w2ui-btn" onclick="UnitEditorBaseStatRandomizerResetVariances(window.unitEditorBasicFields)">Reset</button>
        <button class="w2ui-btn accent" onclick="window.w2popup.close()">Ok</button>
    `

    w2popup.open({
        body: innerHtml,
        width: 800,
        height: 700,
        showMax: false,
        showClose: false,
        modal: false,
    })
}

export default baseStatRandomizerPopup