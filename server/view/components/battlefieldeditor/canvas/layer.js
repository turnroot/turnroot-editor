import Tile from './tile.js'

class Layer {
    constructor(name, x, y, resolution) {
        this.name = name
        this.x = x
        this.y = y
        this.rows = x
        this.columns = y
        this.tiles = []
        this.active = false
        this.currentTile = null
        this.locked = false
        this.container = null
        this.resolution = resolution
        this.layers = [] 

        this.container = document.createElement('div')

        for (let x = 0; x < this.x; x++) {
            this.tiles[x] = []
            for (let y = 0; y < this.y; y++) {
                this.tiles[x][y] = new Tile(x, y, this.resolution, this.resolution)
                this.tiles[x][y].initializeTile(x, y, this.resolution, this.resolution, this.name === 'hidden' ? true: false)
                this.tiles[x][y].tileInfoDiv = this.tileInfoDiv
                this.tiles[x][y].layer = this.name
                this.container.appendChild(this.tiles[x][y].div)

                document.addEventListener('mouseover', (event) => {
                    if (window.activeEditor !== 'battlefield-editor') return
                    if (this.name === 'hidden') return
                    if (event.target === this.tiles[x][y].div){
                        this.tiles[x][y].hover()
                    }

                })
                document.addEventListener('mouseout', (event) => {
                    if (this.name === 'hidden') return
                    if (window.activeEditor !== 'battlefield-editor') return
                    if (event.target === this.tiles[x][y].div){
                        this.tiles[x][y].unhover()
                    }

                })

                document.addEventListener('contextmenu', (event) => {
                    if (this.name === 'hidden') return
                    if (window.activeEditor !== 'battlefield-editor') return
                    if (event.target === this.tiles[x][y].div){
                    event.preventDefault()}
                })

                document.addEventListener('mousedown', (event) => {
                    if (this.name === 'hidden') return
                    if (window.activeEditor !== 'battlefield-editor') return
                    event.preventDefault()
                    if (event.target === this.tiles[x][y].div){
                        let activeLayer = this.layers.find(layer => layer.active)
                        let correctTile = activeLayer.tiles[x][y]
                        if (activeLayer.locked) return
                        correctTile.hover()
                        if (event.button === 0){
                            console.log(correctTile, window.BattlefieldEditorTileInfo, window.BattlefieldEditorBrush)
                            correctTile.click(window.BattlefieldEditorTileInfo, window.BattlefieldEditorBrush)
                        } else if (event.button === 2){
                            console.log(correctTile, window.BattlefieldEditorTileInfo, 'erase')
                            correctTile.click(window.BattlefieldEditorTileInfo, 'erase')
                        }
                    }
                    
                })

                document.addEventListener('mouseup', (event) => {
                    if (this.name === 'hidden') return
                    if (event.target === this.tiles[x][y].div){
                        let activeLayer = this.layers.find(layer => layer.active)
                        let correctTile = activeLayer.tiles[x][y]
                        correctTile.unhover()
                    }
                })
            }
        }
    }

    setLayers(layers) {
        this.layers = layers
    }

    lock() {
        this.locked = true
    }
    show(){
        this.container.style.display = 'block'
    }

    hide(){
        this.container.style.display = 'none'
    }

    unlock() {
        this.locked = false
    }

    fill(startX, startY, endX, endY, tile) {
        if (this.locked) return
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                this.tiles[x][y] = tile
            }
        }
    }

    clear() {
        if (this.locked) return
        this.tiles = []
        for (let x = 0; x < this.x; x++) {
            this.tiles[x] = []
            for (let y = 0; y < this.y; y++) {
                this.tiles[x][y] = null
            }
        }
    }

    clearArea(startX, startY, endX, endY) {
        if (this.locked) return
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                this.tiles[x][y] = null
            }
        }
    }

    getTile(x, y) {
        return this.tiles[x][y]
    }

    setTile(x, y, tile) {
        if (this.locked) return
        this.tiles[x][y] = tile
        this.currentTile = this.tiles[x][y]
    }

    setActive(active) {
        this.active = active
    }
}

export default Layer