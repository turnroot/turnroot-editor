import floodFill from './algorithims/floodFill.js'


class Tile {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.filled = false
        this.tileGlyph = null
        this.active = false
        this.opacity = 1
        this.div = null
        this.layer = null
        this.layers = []
    }

    initializeTile(x,y,width,height,background){
        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.left = `${width * x}px`
        div.style.top = `${height * y}px`
        div.style.width = `${width}px`
        div.style.height = `${height}px`
        div.style.backgroundImage = 'none'
        div.style.backgroundSize = 'cover'
        if (background){
            if (x % 2 === 0){
                if (y % 2 === 0){
                    div.style.backgroundColor = 'color-mix(in oklab, var(--window-background-alt), 60% var(--list-background))'
                } else {
                    div.style.backgroundColor = 'color-mix(in oklab, var(--slider-0), 60% var(--list-background))'
                }
            } else {
                if (y % 2 === 0){
                    div.style.backgroundColor = 'color-mix(in oklab, var(--slider-0), 60% var(--list-background))'
                } else {
                    div.style.backgroundColor = 'color-mix(in oklab, var(--window-background-alt), 60% var(--list-background))'
                }
            }
        }
        this.div = div
    }

    hover(){
        this.div.style.border = '2px solid var(--accent)'
        this.tileInfoDiv.innerHTML = `<div style = "display:flex;align-items:center">${this.tileInfoDiv.permanentContent} <p>${this.x}, ${this.y}</p></div>`
    }

    click(tileInfo, brush){
        this.active = true
        if (brush === 'brush'){
            this.div.style.border = '2px solid var(--accent)'
            this.tileGlyph = tileInfo.glyph.split(" ").join("")
            this.tileName = tileInfo.tileset + ":" + tileInfo.sheet + ":" + tileInfo.name
            this.div.style.backgroundImage = tileInfo.glyph

            this.filled = true
            console.log(this.tileGlyph)

        } else if (brush === 'erase'){
            this.tileGlyph = null
            this.div.style.backgroundImage = null
            this.filled = false
            
        } else if (brush === 'fill'){
            let {pre, post} = floodFill(this.x, this.y, this.layer, tileInfo)
            let div = document.createElement('div')
            div.style.position = 'absolute'
            div.style.left = '50%'
            div.style.bottom = '2rem'
            div.style.zIndex = 98
            div.id = 'battlefieldEditor-applyFill'
            div.style.paddingLeft = '.25rem'
            div.style.paddingRight = '.25rem'
            div.style.borderRadius = '5px'
            div.style.color = 'var(--node-title-background)'
            div.innerHTML = `<button class = "w2ui-btn" id = "battlefieldEditor-applyFill-buttonApply">Apply</button><button class = "w2ui-btn slider1" id = "battlefieldEditor-applyFill-buttonCancel">Cancel</button>`
            this.layer.container.appendChild(div)

            document.getElementById('battlefieldEditor-applyFill-buttonApply').addEventListener('click', () => {
                this.layer.container.removeChild(div)
                this.layer.tiles = post
                this.layer.tiles.forEach(row => {
                    row.forEach(tile => {
                        if (tile.filled){
                            tile.fill(tileInfo)
                        } else {
                            tile.clear()
                        }
                    })
                })
            })

            document.getElementById('battlefieldEditor-applyFill-buttonCancel').addEventListener('click', () => {
                this.layer.container.removeChild(div)
                this.layer.tiles = pre
                this.layer.tiles.forEach(row => {
                    row.forEach(tile => {
                        if (tile.filled){
                            tile.fill(tileInfo)
                        } else {
                            tile.clear()
                        }
                    })
                })
            })
        }

        else {}
    }

    fill(tileInfo){
        this.tileGlyph = tileInfo.glyph
        this.opacity = tileInfo.opacity
        this.filled = true
    }

    clear(){
        this.tileGlyph = null
        this.opacity = 1
        this.filled = false
    }

    unhover(){
        this.div.style.border = 'none'
    }

    div(){
        return this.div
    }
}

export default Tile