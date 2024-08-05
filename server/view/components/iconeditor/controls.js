let layers = [{
        name: 'backgroundRim',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "/style/img/placeholder-circle.png",
        transform: "",
        transparent: false,
    },
    {
        name: 'backgroundColor',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: false,
    },
    {
        name: 'graphic1',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: false,
    },
    {
        name: 'graphic2',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: true,
    },
    {
        name: 'graphic3',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: true,
    },
    {
        name: 'graphic4',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: true,
    },
]

let intervalId

let svgs = {
    topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,

    topCenter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-up"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg>`,

    topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,

    centerLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>`,

    center: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-off"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><path d="M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11"/><path d="M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',

    centerRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>`,

    bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,

    bottom: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-down"><path d="M8 18L12 22L16 18"/><path d="M12 2V22"/></svg>`,

    bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,
}

const createButton = (svg) => {
    const button = document.createElement('button')
    button.innerHTML = svg.svg
    button.className = 'w2ui-btn'
    button.style.cssText = 'width: 2rem; height: 4rem; padding: 0'
    button.setAttribute('button-is-held-down', 'false')

    const Do = () => {
        if (window.IconEditorGraphicStacksCurrentLayer.transform === "") {
            window.IconEditorGraphicStacksCurrentLayer.transform = "rotate(0deg) translateY(0px) translateX(0px) scale(1)"
        }
        console.log(window.IconEditorGraphicStacksCurrentLayer.transform)
        if (svg.key === 'topLeft') {
            let rotateMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/rotate\(([^)]+)\)/)
            let rotate = rotateMatch ? parseFloat(rotateMatch[1]) : 0
            let transformRotate = `rotate(${rotate - 1}deg)`
            window.IconEditorGraphicStacksCurrentLayer.transform = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/rotate\(([^)]+)\)/, transformRotate)
        } else if (svg.key === 'topCenter') {
            let translateYMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/translateY\(([^)]+)\)/)
            let translateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0
            let transformTranslate = `translateY(${translateY - 1}%)`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/translateY\(([^)]+)\)/, transformTranslate)
        } else if (svg.key === 'topRight') {
            let rotateMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/rotate\(([^)]+)\)/)
            let rotate = rotateMatch ? parseFloat(rotateMatch[1]) : 0
            let transformRotate = `rotate(${rotate + 1}deg)`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/rotate\(([^)]+)\)/, transformRotate)
        } else if (svg.key === 'centerLeft') {
            let translateXMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/translateX\(([^)]+)\)/)
            let translateX = translateXMatch ? parseFloat(translateXMatch[1]) : 0
            let transformTranslate = `translateX(${translateX - 1}%)`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/translateX\(([^)]+)\)/, transformTranslate)
        } else if (svg.key === 'center') {
            window.IconEditorGraphicStacksCurrentLayer.transform = "rotate(0deg) translateY(0px) translateX(0px) scale(1)"
        } 
        else if (svg.key === 'centerRight') {
            let translateXMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/translateX\(([^)]+)\)/)
            let translateX = translateXMatch ? parseFloat(translateXMatch[1]) : 0
            let transformTranslate = `translateX(${translateX + 1}%)`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/translateX\(([^)]+)\)/, transformTranslate)
        } else if (svg.key === 'bottomLeft') {
            let scaleMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/scale\(([^)]+)\)/)
            let scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1
            let transformScale = `scale(${scale - 0.01})`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/scale\(([^)]+)\)/, transformScale)
        } else if (svg.key === 'bottom') {
            let translateYMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/translateY\(([^)]+)\)/)
            let translateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0
            let transformTranslate = `translateY(${translateY + 1}%)`
            window.IconEditorGraphicStacksCurrentLayer.transform  = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/translateY\(([^)]+)\)/, transformTranslate)
        } else if (svg.key === 'bottomRight') {
            let scaleMatch = window.IconEditorGraphicStacksCurrentLayer.transform.match(/scale\(([^)]+)\)/)
            let scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1
            let transformScale = `scale(${scale + 0.01})`
            window.IconEditorGraphicStacksCurrentLayer.transform = window.IconEditorGraphicStacksCurrentLayer.transform.replace(/scale\(([^)]+)\)/, transformScale)
        }
        window.IconEditorStacksTransform(layers.indexOf(window.IconEditorGraphicStacksCurrentLayer), window.IconEditorGraphicStacksCurrentLayer.transform)
    }

    button.addEventListener('mousedown', () => {

        button.setAttribute('button-is-held-down', 'true')
        if (button.getAttribute('button-is-held-down') === 'true') {
            intervalId = setInterval(Do, 25)
        }
    }) 
    button.addEventListener('mouseup', async() => {
        window.currentIcon.components = window.IconEditorGraphicStack.layers
        button.setAttribute('button-is-held-down', 'false')
        clearInterval(intervalId)
        window.currentIcon.compositeImage = await window.IconEditorGraphicStack.flatten()
        console.log(window.currentIcon)
        window.updateQueue('Icon', 'update', window.currentIcon)
    })

    return button
}

const createLayerRow = (layer, layersContainer) => {
    const layerRow = document.createElement('div')
    layerRow.style.transition = "all 0.2s"
    layerRow.style.display = "flex"
    layerRow.style.justifyContent = "space-between"

    const layerName = document.createElement('span')
    layerName.innerHTML = layer.name
    layerName.style.color = !layer.transparent ? "unset" : "var(--button-alt-text)"
    layerName.style.cursor = !layer.transparent ? "pointer" : "default"
    layerRow.appendChild(layerName)

    const checkboxDiv = document.createElement('div')

    const transparentCheckbox = document.createElement('input')
    transparentCheckbox.type = 'checkbox'
    transparentCheckbox.checked = !layer.transparent
    transparentCheckbox.addEventListener('change', async() => {
        layer.transparent = !transparentCheckbox.checked
        layerName.style.color = !layer.transparent ? "unset" : "var(--button-alt-text)"
        layerName.style.cursor = !layer.transparent ? "pointer" : "default"
        window.currentIcon.components = window.IconEditorGraphicStack.layers
        window.currentIcon.compositeImage = await window.IconEditorGraphicStack.flatten()
        window.updateQueue('Icon', 'update', window.currentIcon)
    })

    checkboxDiv.appendChild(transparentCheckbox)
    layerRow.appendChild(checkboxDiv)

    layerRow.addEventListener("click", () => {
        if (!layer.transparent) {
            layerRow.style.backgroundColor = "var(--slider-1)"
        }
        Array.from(layersContainer.childNodes).forEach((row, index) => {
            if (layers[index].name !== layer.name) {
                row.style.backgroundColor = "var(--window-background-alt)"
            }
        })
        window.IconEditorGraphicStacksCurrentLayer = layer
    })
    layerRow.addEventListener("mouseenter", () => {
        if (window.IconEditorGraphicStacksCurrentLayer !== layer && !layer.transparent) {
            layerRow.style.backgroundColor = "var(--window-background)"
        }
    })
    layerRow.addEventListener("mouseleave", () => {
        if (window.IconEditorGraphicStacksCurrentLayer !== layer && !layer.transparent) {
            layerRow.style.backgroundColor = "var(--window-background-alt)"
        }
    })
    return layerRow
}

const IconEditorControls = () => {
    const container = document.createElement('div')
    const buttonContainer = document.createElement('div')
    buttonContainer.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 0.25rem .15rem; width: 6rem; margin-top: 1rem'
    const layersContainer = document.createElement('div')
    layersContainer.style.cssText = 'background-color: var(--window-background-alt); padding: 1rem; border-radius: 0.5rem';
    const layersTitle = document.createElement('h2')
    layersTitle.innerHTML = 'Layers'

    Object.entries(svgs).forEach(([key, svg]) => {
        buttonContainer.appendChild(createButton({ key, svg }))
    })

    const lastRowSpanAllColumns = document.createElement('div')
    lastRowSpanAllColumns.style.cssText = 'grid-column: 1 / span 3'
    buttonContainer.appendChild(lastRowSpanAllColumns)
    let lastRowSpanAllColumnsButton = document.createElement('button')
    lastRowSpanAllColumnsButton.innerHTML = '<div style = "display:flex;align-items:center;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-image"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/></svg><p>Set layer image</p></div>'
    lastRowSpanAllColumnsButton.className = 'w2ui-btn'
    lastRowSpanAllColumnsButton.style.cssText = 'width: 99.5%; height: 4rem; padding: 0'

    lastRowSpanAllColumnsButton.addEventListener('click', async (event) => {
        if (window.IconEditorGraphicStacksCurrentLayer === undefined) {
            return window.w2alert('Please select an icon layer')
        }
        window.currentIcon.components = window.IconEditorGraphicStack.layers
        window.ImageIconComponentPicker.coords = {x: event.clientX, y: event.clientY - 200}
        window.ImageIconComponentPicker.show()
        let result = await window.ImageIconComponentPicker.icon()
        window.IconEditorGraphicStacksCurrentLayer.url = result.url
        window.IconEditorStacksUpdateLayer(layers.indexOf(window.IconEditorGraphicStacksCurrentLayer), window.IconEditorGraphicStacksCurrentLayer)
        window.currentIcon.compositeImage = await window.IconEditorGraphicStack.flatten()
        window.updateQueue('Icon', 'update', window.currentIcon)
    })
    lastRowSpanAllColumns.appendChild(lastRowSpanAllColumnsButton)

    let keyboardShortcutNotes = document.createElement('div')
    keyboardShortcutNotes.innerHTML = `<small style = "width:100%"><h3>Keyboard shortcuts</h3>
    <ul>
    <li>Arrow keys (Left, Right, Up, down): move the layer</li>
    <li>Q and E rotate the layer</li>
    <li>W increases the size of the layer</li>
    <li>D decreases the size of the layer</li>
    <li>A or S select an image for the layer</li>
    <li>C resets the position, scale, and rotation</li>
    </ul>
    </small>`

    const buttonsTitle = document.createElement('div')
    buttonsTitle.innerHTML = '<h2>Layer Controls</h2>'

    layers.forEach(layer => layersContainer.appendChild(createLayerRow(layer, layersContainer)))

    container.append(layersTitle, layersContainer, buttonsTitle, buttonContainer, keyboardShortcutNotes)
    return container
}

export {
    IconEditorControls,
    layers
}