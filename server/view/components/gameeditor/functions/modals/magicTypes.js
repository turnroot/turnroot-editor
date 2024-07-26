import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup
let unedited = {}

const updateMagicType = (i) => {
    let id = i.id

    let name = document.getElementById(`global-magic-type-${id}-name`).value
    //let icon = document.getElementById(`global-magic-type-${id}-icon`).value
    let oldId = id
    let newId = name.toLowerCase().replace(/ /g, '-')
    if (!window.globalMagicTypes){
        return
    }
    let magicTypes = window.globalMagicTypes[0]
    magicTypes.types = magicTypes.types.map(w => {
        if (w.id === oldId) {
            w.id = newId
            w.name = name
            //w.icon = icon
        }
        return w
    })
    window.globalMagicTypes = [magicTypes]
}

const deleteMagicType = (id) => {
    if (!window.globalMagicTypes){
        return
    }
    let magicTypes = window.globalMagicTypes[0]
    magicTypes.types = magicTypes.types.filter(w => w.id !== id)
    globalMagicTypes = [magicTypes]
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
    unedited = [JSON.parse(JSON.stringify(magicTypes))]

    let innerHtml = '<div style = "overflow-y:auto;height:350px;"><table id = "magic-types-table">'
    let tableHead = '<thead style = "font-weight:bold;margin-bottom:.5rem;text-align:center;"><tr><td>Name</td><td>Icon</td><td>Delete</td></tr>'
    let tableBody = '<tbody>'

    magicTypes.types.forEach(w => {
    tableBody += `
    <tr id = "${w.id}">
    <td><input type = "text" class = "w2ui-input" value=${w.name} id = "global-magic-type-${w.id}-name" onchange = "GameEditorMagicTypesUpdateType(${w.id})"></td>
    <td>${w.icon === "" ? "no icon" : w.icon}</td>
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
        height:400,
        width:400,
        actions: ['Ok', 'Cancel']
    }).ok((e) => {
        let table = document.getElementById('magic-types-table')
        table.querySelectorAll('tr').forEach(tr => {
            if (tr.id === "") return
            else if (!tr.id) return
            else GameEditorMagicTypesUpdateType(tr)
        })
        let body = {...globalMagicTypes[0]}
        body.id = globalMagicTypes[0].id
        window.updateQueue('globalMagicTypes', 'update', body)
        w2popup.close()
    }).cancel((e) => {
        globalMagicTypes = unedited
        w2popup.close()
    })
}

window.GameEditorMagicTypesPopup = magicTypesPopup

export default magicTypesPopup