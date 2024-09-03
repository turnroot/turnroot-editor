import Layer from './layer.js'

class Layers {
    constructor(x, y, resolution) {
        this.layers = []
        this.x = x
        this.y = y
        this.container = document.createElement('div')
        this.resolution = resolution
    }

    setTileInfoDiv(tileInfoDiv) {
        this.container.appendChild(tileInfoDiv)
        this.tileInfoDiv = tileInfoDiv
        for (let layer of this.layers) {
            layer.tileInfoDiv = tileInfoDiv
            for (let row of layer.tiles) {
                for (let tile of row) {
                    tile.tileInfoDiv = tileInfoDiv
                }
            }
        }
    }

    setLayersDiv(layersDiv){
        this.container.appendChild(layersDiv)
        this.layersDiv = layersDiv
        for (let layer of this.layers) {
            layer.layersDiv = layersDiv
        }
    }

    setTilesetsDiv(tilesetsDiv){
        this.container.appendChild(tilesetsDiv)
        this.tilesetsDiv = tilesetsDiv
        for (let layer of this.layers) {
            layer.tilesetsDiv = tilesetsDiv
        }
    }

    setLayersDivMin(layersDivMin){
        this.container.appendChild(layersDivMin)
        this.layersDivMin = layersDivMin
        for (let layer of this.layers) {
            layer.layersDivMin = layersDivMin
        }
    }

    addLayer(name) {
        let layer = new Layer(name, this.x, this.y, this.resolution)
        this.layers.push(layer)
        layer.setLayers(this.layers)
        if (this.layers.length === 1){
            layer.active = true
            console.log(layer)
        }
        this.container.appendChild(layer.container)
        let div = document.createElement('div')
        div.style = "display:flex;justify-content:space-between;align-items:center;" + (layer.active ? 'background-color:var(--node-title-background)' : '');
        div.id = name
        div.innerHTML = `
            <input type = "checkbox" checked class = "w2ui-input">
            <p style = "font-size:.75rem;margin:0;min-width:12ch">${name}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-open"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/></svg>
        `

        this.layersDiv.inner += div.outerHTML
        this.layersDiv.innerHTML = this.layersDiv.pre + this.layersDiv.inner + this.layersDiv.post

        this.layersDiv.addEventListener('click', (event) => {
            let clickedId = event.target.parentElement.id
            let type = event.target.tagName
            if (type === 'P' || type === 'p'){
                this.setActiveLayer(clickedId)
                let allContainer = event.target.parentElement.parentElement
                for (let layer of allContainer.children){
                    layer.style.backgroundColor = ''}
                event.target.parentElement.style.backgroundColor = 'var(--node-title-background)'
            } else if (type === 'SVG' || type === 'svg'){
                let clickedId = event.target.parentElement.id
                let layer = this.getLayer(clickedId)
                console.log(layer)
                if (layer.locked){
                    layer.unlock()
                    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                    newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                    newSvg.setAttribute('width', '16')
                    newSvg.setAttribute('height', '16')
                    newSvg.setAttribute('viewBox', '0 0 24 24')
                    newSvg.setAttribute('fill', 'none')
                    newSvg.setAttribute('stroke', 'currentColor')
                    newSvg.setAttribute('stroke-width', '3')
                    newSvg.setAttribute('stroke-linecap', 'round')
                    newSvg.setAttribute('stroke-linejoin', 'round')
                    newSvg.setAttribute('class', 'lucide lucide-lock-open')
                    newSvg.innerHTML = '<circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>'
                    event.target.replaceWith(newSvg)
                } else {
                    layer.lock()
                    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                    newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                    newSvg.setAttribute('width', '16')
                    newSvg.setAttribute('height', '16')
                    newSvg.setAttribute('viewBox', '0 0 24 24')
                    newSvg.setAttribute('fill', 'none')
                    newSvg.setAttribute('stroke', 'var(--slider-1)')
                    newSvg.setAttribute('stroke-width', '3')
                    newSvg.setAttribute('stroke-linecap', 'round')
                    newSvg.setAttribute('stroke-linejoin', 'round')
                    newSvg.setAttribute('class', 'lucide lucide-lock')
                    newSvg.innerHTML = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
                    event.target.replaceWith(newSvg)
                }
            } else if (type === "INPUT" || type === 'input'){
                let clickedId = event.target.parentElement.id
                let layer = this.getLayer(clickedId)
                if (event.target.checked){
                    layer.show()
                    this.setActiveLayer(clickedId)
                    let allContainer = event.target.parentElement.parentElement
                    for (let layer of allContainer.children){
                        layer.style.backgroundColor = ''}
                    event.target.parentElement.style.backgroundColor = 'var(--node-title-background)'
                } else {
                    layer.hide()
                }

            }

            
        })
        return layer
    }

    getLayer(name) {
        return this.layers.find(layer => layer.name === name)
    }

    clear() {
        this.layers = []
    }

    setActiveLayer(name) {
        this.layers.forEach(layer => {
            if (layer.name === name) {
                layer.active = true
            } else {
                layer.active = false
            }
        })
    }
}

export default Layers