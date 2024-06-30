let hairColors

if (localStorage.getItem('hairColors')) {
    hairColors = JSON.parse(localStorage.getItem('hairColors'))
} else {
    hairColors = [
        'rgb(39, 31, 86)',
        'rgb(218, 145, 32)',
        'rgb(139, 69, 19)',
        'rgb(84, 42, 2)',
        'rgb(171, 33, 0)',
        'rgb(34, 223, 154)',
        'rgb(34, 162, 231)',
        'rgb(255, 192, 208)',
        'rgb(255, 222, 176)',
        'rgb(255, 105, 180)',
    ]
    localStorage.setItem('hairColors', JSON.stringify(hairColors))
}

const hexToRGB = (hex) => {
    let r = parseInt(hex.substring(1, 3), 16)
    let g = parseInt(hex.substring(3, 5), 16)
    let b = parseInt(hex.substring(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
}

const removeColor = (event) => {
    event.preventDefault()
    let color = event.target.style.backgroundColor
    hairColors = hairColors.filter(c => c !== color)
    window.turnrootEditorLogs.push(`${new Date()}||info||Removed hair color: ${color}`)
    let hairColorsHtml = `<div id = "unit-editor-avatar-hair-colors">`
    for (let color of hairColors) {
        hairColorsHtml += `<div class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;" oncontextmenu="setDefaultHairColor(event)" onclick="unitEditorAvatarRemoveHairColor(event)"></div>`
    }
    hairColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddHairColor(event)">Add color</button></div></div>`
    document.querySelector('#unit-editor-avatar-hair-colors').innerHTML = hairColorsHtml

    localStorage.setItem('hairColors', JSON.stringify(hairColors))
}

const setDefaultHairColor = (event) => {
    event.preventDefault()
    let colorDivs = document.querySelector("#unit-editor-avatar-hair-colors").querySelectorAll('.hidden-until-hover-wrapper')
    colorDivs.forEach(div => div.style.border = '')
    event.target.style.border = '2px solid var(--accent)'
    window.unitEditorAvatarDefaultHairColor = event.target.style.backgroundColor
}

window.setDefaultHairColor = setDefaultHairColor
window.unitEditorAvatarRemoveHairColor = removeColor

const addHairColor = (e) => {
    let color = hexToRGB(e.target.previousElementSibling.value)
    hairColors.push(color)
    window.turnrootEditorLogs.push(`${new Date()}||info||Added hair color: ${color}`)
    let hairColorsHtml = `<div id = "unit-editor-avatar-hair-colors">`
    for (let color of hairColors) {
        hairColorsHtml += `<div id="unit-editor-avatar-hair-colors" class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;" oncontextmenu="setDefaultHairColor(event)" onclick="unitEditorAvatarRemoveHairColor(event)"></div>`
    }
    hairColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddHairColor(event)">Add color</button></div></div>`
    document.querySelector('#unit-editor-avatar-hair-colors').innerHTML = hairColorsHtml

    localStorage.setItem('hairColors', JSON.stringify(hairColors))
}

window.unitEditorAvatarAddHairColor = addHairColor

let hairColorsHtml = `<div id = "unit-editor-avatar-hair-colors">`
for (let color of hairColors) {
    hairColorsHtml += `<div id="unit-editor-avatar-hair-colors" class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"  oncontextmenu="setDefaultHairColor(event)" onclick="unitEditorAvatarRemoveHairColor(event)"></div>`
}
hairColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddHairColor(event)">Add color</button></div></div>`

export default hairColorsHtml