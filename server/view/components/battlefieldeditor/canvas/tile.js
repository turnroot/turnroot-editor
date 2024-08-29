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
    }

    initializeTile(x,y,width,height){
        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.left = `${width * x}px`
        div.style.top = `${height * y}px`
        div.style.width = `${width}px`
        div.style.height = `${height}px`
        if (x % 2 === 0){
            if (y % 2 === 0){
                div.style.backgroundColor = '#222'
            } else {
                div.style.backgroundColor = 'black'
            }
        } else {
            if (y % 2 === 0){
                div.style.backgroundColor = 'black'
            } else {
                div.style.backgroundColor = '#222'
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
            this.tileGlyph = tileInfo.glyph
            this.filled = true
        }
        else if (brush === 'erase'){
            this.tileGlyph = null
            this.filled = false
        }  else {}
    }

    unhover(){
        this.div.style.border = 'none'
    }

    div(){
        return this.div
    }
}

export default Tile