let eyeColors

if (localStorage.getItem('eyeColors')) {
    eyeColors = JSON.parse(localStorage.getItem('eyeColors'))
} else {
    eyeColors  = [
        'rgb(104, 52, 2)',
        'rgb(124, 183, 74)',
        'rgb(34, 132, 181)',
        'rgb(130, 150, 210)'
    ]
    localStorage.setItem('eyeColors', JSON.stringify(eyeColors))
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
    console.log(color, eyeColors)
    eyeColors = eyeColors.filter(c => c !== color)
    console.log('Removed color:', color)
    let eyeColorsHtml = `<div id = "unit-editor-avatar-eye-colors">`
    for (let color of eyeColors) {
        eyeColorsHtml += `<div class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;" oncontextmenu="setDefaultEyeColor(event)" onclick="unitEditorAvatarRemoveEyeColor(event)"></div>`
    }
    eyeColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddEyeColor(event)">Add color</button></div></div>`
    document.querySelector('#unit-editor-avatar-eye-colors').innerHTML = eyeColorsHtml

    localStorage.setItem('eyeColors', JSON.stringify(eyeColors))
}

const setDefaultEyeColor = (event) => {
    event.preventDefault()
    let colorDivs = document.querySelector("#unit-editor-avatar-eye-colors").querySelectorAll('.hidden-until-hover-wrapper')
    colorDivs.forEach(div => div.style.border = '')
    event.target.style.border = '2px solid var(--accent)'
    window.unitEditorAvatarDefaultEyeColor = event.target.style.backgroundColor
}

window.setDefaultEyeColor = setDefaultEyeColor
window.unitEditorAvatarRemoveEyeColor = removeColor

const addEyeColor = (e) => {
    let color = hexToRGB(e.target.previousElementSibling.value)
    eyeColors.push(color)
    console.log('Added color:', color)
    let eyeColorsHtml = `<div id = "unit-editor-avatar-eye-colors">`
    for (let color of eyeColors) {
        eyeColorsHtml += `<div id="unit-editor-avatar-eye-colors" class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;" oncontextmenu="setDefaultEyeColor(event)" onclick="unitEditorAvatarRemoveEyeColor(event)"></div>`
    }
    eyeColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddEyeColor(event)">Add color</button></div></div>`
    document.querySelector('#unit-editor-avatar-eye-colors').innerHTML = eyeColorsHtml

    localStorage.setItem('eyeColors', JSON.stringify(eyeColors))
}

window.unitEditorAvatarAddEyeColor = addEyeColor

let eyeColorsHtml = `<div id = "unit-editor-avatar-eye-colors">`
for (let color of eyeColors) {
    eyeColorsHtml += `<div id="unit-editor-avatar-eye-colors" class="hidden-until-hover-wrapper" style="background-color:${color};width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"  oncontextmenu="setDefaultEyeColor(event)" onclick="unitEditorAvatarRemoveEyeColor(event)"></div>`
}
eyeColorsHtml += `<div style="display:flex;"><input type = "color" style = "width:2rem;height:2rem;display:inline-block;margin:0.25rem;border-radius:.25rem;"><button class= "w2ui-btn" onclick="unitEditorAvatarAddEyeColor(event)">Add color</button></div></div>`

export default eyeColorsHtml