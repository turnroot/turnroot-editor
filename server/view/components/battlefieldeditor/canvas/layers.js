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

    addLayer(name) {
        let layer = new Layer(name, this.x, this.y, this.resolution)
        this.layers.push(layer)
        layer.setLayers(this.layers)
        if (this.layers.length === 1){
            layer.active = true
            console.log(layer)
        }
        this.container.appendChild(layer.container)
        this.layersDiv.inner += `
        <div style = "display:flex;justify-content:space-between;align-items:center;${layer.active? 'background-color:var(--node-text)':'' }">
        <input type = "checkbox" checked class = "w2ui-input">
        <p style = "font-size:.75rem;margin:0;min-width:14ch">${name}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-open"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
        `
        this.layersDiv.innerHTML = this.layersDiv.pre + this.layersDiv.inner + this.layersDiv.post
        return layer
    }

    getLayer(name) {
        return this.layers.find(layer => layer.name === name)
    }

    removeLayer(name) {
        this.layers = this.layers.filter(layer => layer.name !== name)
    }

    clear() {
        this.layers = []
    }

    lockLayer(name) {
        let layer = this.getLayer(name)
        layer.lock()
    }

    unlockLayer(name) {
        let layer = this.getLayer(name)
        layer.unlock()
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