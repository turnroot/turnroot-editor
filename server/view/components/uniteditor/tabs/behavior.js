import CustomRangeSlider from '../../utils/coloredRange.js'

let div = document.createElement('div')
div.style.width = '100%'
div.style.height = '100%'

let range = new CustomRangeSlider(div)
range.onchange = (value) => {
    console.log(value)
}
let range2 = new CustomRangeSlider(div)
range2.onchange = (value) => {
    console.log(value)
}


export default div
