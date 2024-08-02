import html2canvas from 'html2canvas'

const takeScreenshot = async (node) => {
    const canvas = await html2canvas(node, {backgroundColor: null, allowTaint: true})
    const img = canvas.toDataURL("image/png")
    return img
}
class graphicStacks {
    constructor(box, type="icon") {
        this.layers = []
        this.htmlObjects = []
        this.box = box
        this.box.style.position = "relative"
        this.box.style.overflow = "hidden"
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
        let rotateHtml = document.createElement("div")
        layerHtml.style.position = "absolute"
        rotateHtml.style.position = "absolute"
        layerHtml.style.width = layerData.width + "px"
        layerHtml.style.height = layerData.height + "px"
        rotateHtml.style.width = layerData.width + "px"
        rotateHtml.style.height = layerData.height + "px"
        rotateHtml.style.backgroundSize = "cover"
        layerHtml.style.backgroundSize = "cover"
        layerHtml.style.top = (layerData.y + 8) + "px"
        layerHtml.style.left = (layerData.x + 8) + "px"
        layerHtml.style.zIndex = 8000 + this.layers.length
        
        if (!layerData.transparent){
            rotateHtml.style.backgroundImage = "url(" + layerData.url + ")"
        }
        layerHtml.appendChild(rotateHtml)
        this.box.appendChild(layerHtml)
        this.htmlObjects.push(layerHtml)
    }

    updateLayer(layerIndex, layerData) {
        let layerHtml = this.htmlObjects[layerIndex]
        let rotateHtml = layerHtml.childNodes[0]
        rotateHtml.style.backgroundImage = "url(" + layerData.url + ")"
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
        let rotateHtml = layerHtml.childNodes[0]
        let transformArray = transform.split(" ")
        let transformWithoutRotate = ""
        transformArray.forEach((t) => {
            if (t.includes("rotate")){
                let rotate = t.replace("rotate(", "").replace("deg)", "")
                rotateHtml.style.transform = "rotate(" + rotate + "deg)"
            } else {
                transformWithoutRotate += t + " "
            }
        })
        layerHtml.style.transform = transformWithoutRotate
        let layer = this.layers[layerIndex]
        layer.transform = transform
    }

    render(){
        return this.box
    }

    async flatten(){
        let r =  takeScreenshot(this.box)
        return r
    }
}

export default graphicStacks