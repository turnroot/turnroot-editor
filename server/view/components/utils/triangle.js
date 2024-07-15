import { w2field } from "../../lib/w2ui.es6.min.js"

const Triangle = (unitSize, backgroundColor, borderColor, fields) => {
    let div = document.createElement('div')
    let unit = unitSize

    let outerTriangle = document.createElement('div')
    outerTriangle.className = 'Triangle-outerTriangle'
    let innerTriangle = document.createElement('div')
    innerTriangle.className = 'Triangle-innerTriangle'
    let box1 = document.createElement('select')
    box1.multiple = true
    box1.className = 'Triangle-box1'
    let box2 = document.createElement('select')
    box2.className = 'Triangle-box2'
    box2.multiple = true
    let box3 = document.createElement('select')
    box3.className = 'Triangle-box3'
    box3.multiple = true
    let box4 = document.createElement('div')
    box4.className = 'Triangle-box4'
    let box5 = document.createElement('div')
    box5.className = 'Triangle-box5'
    let box6 = document.createElement('div')
    box6.className = 'Triangle-box6'

    box4.innerHTML = '<svg style = "transform:rotate(58deg)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>'

    box5.innerHTML = '<svg style = "transform:rotate(-238deg)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>'

    box6.innerHTML = '<svg style = "transform:rotate(180deg)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>'

    let boxes = {
        topCorner: box1,
        leftCorner: box2,
        rightCorner: box3,
    }

    Object.keys(boxes).forEach(box => {
        let f = fields.find(f => f.el === box)
        if (!f) return
    
        boxes[box].id = f.id
        let options = f.options
        options.forEach(option => {
            let optionElement = document.createElement('option')
            optionElement.value = option.id
            optionElement.innerText = option.text
            optionElement.selected = f.selected.includes(option.id)
            boxes[box].appendChild(optionElement)
        })

        let updateSelected = () => {
            f.options = Array.from(boxes[box].children).map(o => {
                return {id: o.value, text: o.innerText, selected: o.selected}
            })
            f.selected = f.options.filter(o => o.selected).map(o => o.id)
        }

        updateSelected()
        boxes[box].onclick = () => {
            updateSelected()
        }
    })

    let styleTag = document.createElement('style')
    let style = `
    .Triangle-innerTriangle,.Triangle-outerTriangle{width:0;height:0;border-style:solid;transform:rotate(0deg)}.Triangle-outerTriangle{border-width:0 calc(50px*${unit}) calc(75px*${unit});border-color:transparent transparent ${borderColor}}.Triangle-innerTriangle{position:relative;margin-left:calc(-46px*${unit});top:calc(3px*${unit});border-width:0 calc(46px*${unit}) calc(70px*${unit});border-color:transparent transparent ${backgroundColor}}.Triangle-box1,.Triangle-box2,.Triangle-box3,.Triangle-box4,.Triangle-box5,.Triangle-box6{position:absolute;width:min-content;padding:1rem}.Triangle-box1{top:0;left:calc(50%);transform:translateX(-50%)}.Triangle-box2,.Triangle-box3{top:calc(75px*${unit});transform:translateY(-50%)}.Triangle-box2{left:calc(${unit}*-50px)}.Triangle-box3{right:calc(${unit}*-50px)}.Triangle-box4{right:calc(${unit}*-27px);top:calc(37.5px*${unit});transform:translateY(-50%) translateX(50%)}.Triangle-box5,.Triangle-box6{transform:translateY(-50%) translateX(-50%)}.Triangle-box5{left:calc(${unit}*-27px);top:calc(37.5px*${unit})}.Triangle-box6{top:calc(75px*${unit})}`
    styleTag.innerText = style
    div.appendChild(styleTag)

    outerTriangle.appendChild(innerTriangle)
    outerTriangle.appendChild(box1)
    outerTriangle.appendChild(box2)
    outerTriangle.appendChild(box3)
    outerTriangle.appendChild(box4)
    outerTriangle.appendChild(box5)
    outerTriangle.appendChild(box6)

    div.appendChild(outerTriangle)

    return {html: div, fields: fields}
}

export default Triangle