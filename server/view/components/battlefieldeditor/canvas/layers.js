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

    addLayer(name) {
        let layer = new Layer(name, this.x, this.y, this.resolution)
        this.layers.push(layer)
        this.container.appendChild(layer.container)
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