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
    let box4 = document.createElement('select')
    box4.className = 'Triangle-box4'
    box4.multiple = true
    let box5 = document.createElement('select')
    box5.className = 'Triangle-box5'
    box5.multiple = true
    let box6 = document.createElement('select')
    box6.className = 'Triangle-box6'
    box6.multiple = true

    let boxes = {
        topCorner: box1,
        leftCorner: box2,
        rightCorner: box3,
        rightEdge: box4,
        bottomEdge: box5,
        leftEdge: box6
    }

    Object.keys(boxes).forEach(box => {
        console.log("Box: ", box, "Field: ", fields.find(f => f.el === box))
        boxes[box].id = fields.find(f => f.el === box).id
        let options = fields.find(f => f.el === box).options
        options.forEach(option => {
            let optionElement = document.createElement('option')
            optionElement.value = option.id
            optionElement.innerText = option.text
            optionElement.selected = f.selected.includes(option.id)
            box.appendChild(optionElement)
        })
        box.onchange = () => {
            fields.find(f => f.el === box).options = Array.from(box.children).map(o => {
                return {id: o.value, text: o.innerText, selected: o.selected}
            })
        }
    })

    let styleTag = document.createElement('style')
    let style = `
    .Triangle-innerTriangle,.Triangle-outerTriangle{width:0;height:0;border-style:solid;transform:rotate(0deg)}.Triangle-outerTriangle{border-width:0 calc(50px*${unit}) calc(75px*${unit});border-color:transparent transparent ${borderColor}}.Triangle-innerTriangle{position:relative;margin-left:calc(-46px*${unit});top:calc(3px*${unit});border-width:0 calc(46px*${unit}) calc(70px*${unit});border-color:transparent transparent ${backgroundColor}}.Triangle-box1,.Triangle-box2,.Triangle-box3,.Triangle-box4,.Triangle-box5,.Triangle-box6{position:absolute;background-color:${backgroundColor};width:min-content;padding:1rem}.Triangle-box1{top:0;left:calc(50%);transform:translateX(-50%)}.Triangle-box2,.Triangle-box3{top:calc(75px*${unit});transform:translateY(-50%)}.Triangle-box2{left:calc(${unit}*-50px)}.Triangle-box3{right:calc(${unit}*-50px)}.Triangle-box4{right:calc(${unit}*-27px);top:calc(37.5px*${unit});transform:translateY(-50%) translateX(50%)}.Triangle-box5,.Triangle-box6{transform:translateY(-50%) translateX(-50%)}.Triangle-box5{left:calc(${unit}*-27px);top:calc(37.5px*${unit})}.Triangle-box6{top:calc(75px*${unit})}`
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