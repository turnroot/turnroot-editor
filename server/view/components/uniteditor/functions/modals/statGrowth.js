import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

let original = {}
let growths = {}

const resetGrowths = (form) => {
    Object.keys(original).forEach((stat) => {
        growths[stat] = 0
        form.record['baseStatsGrowthAmount'+stat] = growths[stat]
    })
    document.querySelectorAll('.baseStatGrowthNumberInput').forEach((input) => {
        input.value = 0
    })
}

const changeGrowth = (stat, value, form) => {
    growths[stat] = parseInt(value)
    form.record['baseStatsGrowthAmount'+stat] = growths[stat]
}

const statGrowthPopup = (stats, form) => {
    original = {...stats}
    Object.keys(stats).forEach((stat) => {
        if (stat === 'hp') {
            growths[stat] = 100
        } else {
        growths[stat] = 0}
        form.record['baseStatsGrowthAmount'+stat] = growths[stat]
    })

window.UnitEditorBaseStatGrowthChange = changeGrowth
window.UnitEditorBaseStatGrowthReset = resetGrowths
window.UnitEditorBaseStatGrowthPopup = statGrowthPopup

    let innerHtml = `
    <h2>Set Stat Growths</h2>
    <p>Set the growths for each stat. Each growth is the % chance that the stat will increase on level up- for example, a growth of 50 on a base stat Strength would mean a 50% chance that Strength will increase on level up.</p>
    <table>
        <tr>
            <th>Stat</th>
            <th>Original</th>
            <th>Growth</th>
        </tr>
        ${Object.keys(stats).map((stat) => {
            return `
            <tr>
                <td>${stat}</td>
                <td>${stats[stat]}</td>
                <td><input type="number" class="w2ui-input baseStatGrowthNumberInput" min="0" max="100" value="${growths[stat]}" onchange="window.UnitEditorBaseStatGrowthChange('${stat}', this.value, window.unitEditorBasicFields)"></td>
            </tr>
            `
        }).join('')}
        </table>
        <button class="w2ui-btn" onclick="window.UnitEditorBaseStatGrowthReset(window.unitEditorBasicFields)">Reset</button>
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

export default statGrowthPopup