let layers = [{
        name: 'background',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        url: "",
        transform: "",
        transparent: false,
    },
    {
        name: 'rim',
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
]


let svgs = {
    topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,

    topCenter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-up"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg>`,

    topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,

    centerLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>`,

    center: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-image"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/></svg>',

    centerRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>`,

    bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,

    bottom: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-down"><path d="M8 18L12 22L16 18"/><path d="M12 2V22"/></svg>`,

    bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,

}

const createButton = (svg) => {
    const button = document.createElement('button');
    button.innerHTML = svg
    button.className = 'w2ui-btn'
    button.style.cssText = 'width: 2rem; height: 4rem; padding: 0'
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
    transparentCheckbox.addEventListener('change', () => {
        layer.transparent = !transparentCheckbox.checked
        layerName.style.color = !layer.transparent ? "unset" : "var(--button-alt-text)"
        layerName.style.cursor = !layer.transparent ? "pointer" : "default"
    })

    checkboxDiv.appendChild(transparentCheckbox)
    layerRow.appendChild(checkboxDiv)

    layerRow.addEventListener("click", () => {
        if (!layer.transparent)
        {layerRow.style.backgroundColor = "var(--slider-1)"}
        Array.from(layersContainer.childNodes).forEach((row, index) => {
            if (layers[index].name !== layer.name ) {
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

    Object.values(svgs).forEach(svg => buttonContainer.appendChild(createButton(svg)))
    let keyboardShortcutNotes = document.createElement('div')
    keyboardShortcutNotes.innerHTML = `<small style = "width:100%"><h3>Keyboard shortcuts</h3>
    <ul>
    <li>Arrow keys (Left, Right, Up, down): move the layer</li>
    <li>Shift + Arrow keys move the layer faster</li>
    <li>Q and E rotate the layer</li>
    <li>W increases the size of the layer</li>
    <li>S decreases the size of the layer</li>
    <li>A, Shift + Spacebar, or Shift + Enter choose an image for the layer</li></ul>
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