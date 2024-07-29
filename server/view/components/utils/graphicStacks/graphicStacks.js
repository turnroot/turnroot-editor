class graphicStacks {
    constructor(box, type="icon") {
        this.layers = []
        this.htmlObjects = []
        this.box = box
        this.box.style.position = "relative"
    }

    addLayer(layerData) {
        if (!layerData.x){
            layerData.x = 0
        }
        if (!layerData.y){
            layerData.y = 0
        }
        this.layers.push(layerData)
        let layerHtml = document.createElement("div")
        layerHtml.style.position = "absolute"
        layerHtml.style.width = layerData.width + "px"
        layerHtml.style.height = layerData.height + "px"
        layerHtml.style.backgroundSize = "cover"
        layerHtml.style.top = layerData.y + "px"
        layerHtml.style.left = layerData.x + "px"
        layerHtml.style.zIndex = 8000 + this.layers.length
        if (!layerData.transparent){
            layerHtml.style.backgroundImage = "url(" + layerData.url + ")"
        }
        this.box.appendChild(layerHtml)
        this.htmlObjects.push(layerHtml)
    }

    updateLayer(layerIndex, layerData) {
        let layerHtml = this.htmlObjects[layerIndex]
        layerHtml.style.backgroundImage = "url(" + layerData.url + ")"
        let layer = this.layers[layerIndex]
        layer.url = layerData.url
    }

    removeLayer(layerIndex) {
        this.layers.splice(layerIndex, 1)
        this.htmlObjects.splice(layerIndex, 1)
        this.box.removeChild(this.box.childNodes[layer])
    }

    clear() {
        this.layers = []
        this.box.innerHTML = ""
    }

    transform(layerIndex, transform) {
        let layerHtml = this.htmlObjects[layerIndex]
        layerHtml.style.transform = transform
        let layer = this.layers[layerIndex]
        layer.transform = transform
    }

    render(){
        return this.box
    }
}

export default graphicStacks