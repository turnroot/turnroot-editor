import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup
let unedited = {}

import {updateQueue} from '../../../../functions/edits/queue.js'

const updateMagicType = (i) => {
    let id = i.id

    let name = document.getElementById(`global-magic-type-${id}-name`).value
    //let icon = document.getElementById(`global-magic-type-${id}-icon`).value
    let oldId = id
    let newId = name.toLowerCase().replace(/ /g, '-')
    let ranges = []
    for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`global-magic-type-${id}-range-${i}`).checked) {
            ranges.push(i)
        } else {
            ranges = ranges.filter(r => r !== i)
        }
    }
    let defaultRange = document.getElementById(`global-magic-type-${id}-default-range`).value
    if (!window.globalMagicTypes){
        return
    }
    let magicTypes = window.globalMagicTypes[0]
    magicTypes.types = magicTypes.types.map(w => {
        if (w.id === oldId) {
            w.id = newId
            w.name = name
            //w.icon = icon
            w.ranges = ranges
            w.defaultRange = defaultRange
        }
        return w
    })
    window.globalMagicTypes = magicTypes
    localStorage.setItem('globalMagicTypes', JSON.stringify(magicTypes))
}

const deleteMagicType = (id) => {
    if (!window.globalMagicTypes){
        return
    }
    let magicTypes = window.globalMagicTypes[0]
    magicTypes.types = magicTypes.types.filter(w => w.id !== id)
    globalMagicTypes = window.magicTypes
    localStorage.setItem('globalMagicTypes', JSON.stringify(magicTypes))
    document.getElementById(id).remove()
}

const addMagicType = () => {
    let magicTypesTable = document.getElementById('magic-types-table')
    let tr = document.createElement('tr')
    tr.id = Math.floor(Math.random() * 100000)
    tr.innerHTML = `
    <td><input type = "text" class = "w2ui-input" value="" id = "global-magic-type-${tr.id}-name" onchange = "GameEditorMagicTypesUpdateType(${w.id})"></td>
    <td><input type = "text" class = "w2ui-input" value="" id = "global-magic-type-${tr.id}-icon"></td>
    <td>
        <div>
            <input type = "checkbox" id = "global-magic-type-${tr.id}-range-1" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <label for = "global-magic-type-${tr.id}-range-1">1</label>
            <input type = "checkbox" id = "global-magic-type-${tr.id}-range-2" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <label for = "global-magic-type-${tr.id}-range-2">2</label>
            <input type = "checkbox" id = "global-magic-type-${tr.id}-range-3" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <label for = "global-magic-type-${tr.id}-range-3">3</label>
            <input type = "checkbox" id = "global-magic-type-${tr.id}-range-4" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <label for = "global-magic-type-${tr.id}-range-4">4</label>
            <input type = "checkbox" id = "global-magic-type-${tr.id}-range-5" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <label for = "global-magic-type-${tr.id}-range-5">5</label>
        </div>
    </td>
    <td>
        <select id = "global-magic-type-${tr.id}-default-range" class = "w2ui-input" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
        <option value = "1">1</option>
        <option value = "2">2</option>
        <option value = "3">3</option>
        <option value = "4">4</option>
        <option value = "5">5</option>
        </select>
    </td>
    <td>
        <button class = "w2ui-btn accent" onclick = "GameEditorMagicTypesDeleteType(${tr.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    </td>
    `
    magicTypesTable.appendChild(tr)

}

window.GameEditorMagicTypesAddType = addMagicType
window.GameEditorMagicTypesDeleteType = deleteMagicType
window.GameEditorMagicTypesUpdateType = updateMagicType

const magicTypesPopup = () => {
    let magicTypes = window.globalMagicTypes[0]

    let innerHtml = '<div style = "overflow-y:auto;height:350px;"><table id = "magic-types-table">'
    let tableHead = '<thead style = "font-weight:bold;margin-bottom:.5rem;text-align:center;"><tr><td>Name</td><td>Icon</td><td>Ranges</td><td>Default</td><td>Delete</td></tr>'
    let tableBody = '<tbody>'

    magicTypes.types.forEach(w => {
    tableBody += `
    <tr id = "${w.id}">
    <td><input type = "text" class = "w2ui-input" value=${w.name} id = "global-magic-type-${w.id}-name" onchange = "GameEditorMagicTypesUpdateType(${w.id})"></td>
    <td>${w.icon === "" ? "no icon" : w.icon}</td>
    <td>
        <div>
            <input type = "checkbox" onchange = "GameEditorMagicTypesUpdateType(${w.id})" id = "global-magic-type-${w.id}-range-1" ${w.ranges.includes(1) ? "checked" : ""}>
            <label for = "global-magic-type-${w.id}-range-1">1</label>
            <input type = "checkbox" onchange = "GameEditorMagicTypesUpdateType(${w.id})" id = "global-magic-type-${w.id}-range-2" ${w.ranges.includes(2) ? "checked" : ""}>
            <label for = "global-magic-type-${w.id}-range-2">2</label>
            <input type = "checkbox" onchange = "GameEditorMagicTypesUpdateType(${w.id})" id = "global-magic-type-${w.id}-range-3" ${w.ranges.includes(3) ? "checked" : ""}>
            <label for = "global-magic-type-${w.id}-range-3">3</label>
            <input type = "checkbox"  onchange = "GameEditorMagicTypesUpdateType(${w.id})" id = "global-magic-type-${w.id}-range-4" ${w.ranges.includes(4) ? "checked" : ""}>
            <label for = "global-magic-type-${w.id}-range-4">4</label>
            <input type = "checkbox" onchange = "GameEditorMagicTypesUpdateType(${w.id})" id = "global-magic-type-${w.id}-range-5" ${w.ranges.includes(5) ? "checked" : ""}>
            <label for = "global-magic-type-${w.id}-range-5">5</label>
        </div>
    </td>
    <td>
        <select id = "global-magic-type-${w.id}-default-range" class = "w2ui-input" onchange = "GameEditorMagicTypesUpdateType(${w.id})">
            <option value = "1" ${w.defaultRange === 1 ? "selected" : ""}>1</option>
            <option value = "2" ${w.defaultRange === 2 ? "selected" : ""}>2</option>
            <option value = "3" ${w.defaultRange === 3 ? "selected" : ""}>3</option>
            <option value = "4" ${w.defaultRange === 4 ? "selected" : ""}>4</option>
            <option value = "5" ${w.defaultRange === 5 ? "selected" : ""}>5</option>
        </select>
    </td>
    <td>
        <button class = "w2ui-btn accent" onclick = "GameEditorMagicTypesDeleteType(${w.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    </td>
    </tr>
    `
    })
    innerHtml += tableHead 
    innerHtml += '</thead>'
    innerHtml += tableBody

    innerHtml += `</tbody></table><button class = "w2ui-btn" style = "margin-top:1rem;margin-bottom:1rem;" onclick = "GameEditorMagicTypesAddType()">Add type</button></div>`
    w2popup.open({
        title: 'Magic Types',
        body: innerHtml,
        height:480,
        width:700,
        actions: ['Ok', 'Cancel']
    }).ok((e) => {
        let table = document.getElementById('magic-types-table')
        table.querySelectorAll('tr').forEach(tr => {
            if (tr.id === "") return
            else if (!tr.id) return
            else GameEditorMagicTypesUpdateType(tr)
        })
        updateQueue('globalMagicTypes', 'update', globalMagicTypes)
        w2popup.close()
    }).cancel((e) => {
        globalMagicTypes = unedited
        w2popup.close()
    })
}

window.GameEditorMagicTypesPopup = magicTypesPopup

export default magicTypesPopup