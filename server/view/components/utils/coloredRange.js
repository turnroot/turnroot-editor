let activeSlider = null

class CustomRangeSlider {
    constructor(container, hv = 'h', value = 50) {
        this.value = value
        this.container = container
        this.hv = hv
        this.onchange = (value) => {return value}
        this.sliderDiv = document.createElement('div')
        this.sliderDiv.style.width = '100%'
        this.sliderDiv.style.height = 'min-content'
        this.container.appendChild(this.sliderDiv)
        this.thumb = undefined
        this.track = undefined
        this.coloredRange()
        this.dragging = false

    }

    setValue(value) {
        this.value = parseInt(value)
        this.thumb.style.right = `${100 - this.value}%`
        let scaledPercent = Math.ceil((this.value * 1.1) - 10 - 1)
        let colormix = `color-mix(in oklab,var(--slider-0) ${scaledPercent}%,var(--slider-1))`
        this.thumb.style.backgroundColor = colormix
    
    }

    coloredRange() {
        let childDiv = document.createElement('div')
        if (this.hv === 'h') {
            childDiv.style.width = '100%'
            childDiv.style.height = '1.5rem'
        } else {
            childDiv.style.width = '1.5rem'
            childDiv.style.height = '100%'
        }
        childDiv.style.display = 'flex'
        childDiv.style.justifyContent = 'center'
        childDiv.style.alignItems = 'center'
        let track = document.createElement('div')
        this.track = track
        if (this.hv === 'h') {
            track.style.width = '90%'
            track.style.height = '3px'
        } else {
            track.style.width = '3px'
            track.style.height = '90%'
        }
        track.style.backgroundColor = "color-mix(in srgb,var(--window-background) 60%,var(--window-background-alt))"
        track.style.position = 'relative'
        childDiv.appendChild(track)

        let thumb = document.createElement('div')
        this.thumb = thumb
        thumb.className = 'no-transition'
        thumb.style.width = '1.25rem'
        thumb.style.height = '1.25rem'
        thumb.style.borderRadius = '.25rem'
        thumb.style.position = 'relative'
        thumb.style.right = `${this.value}%`
        thumb.style.backgroundColor = `var(--slider-0)`

        thumb.onmousedown = (event) => {
            event.preventDefault()
            activeSlider = this
            activeSlider.thumb = thumb
            activeSlider.sliderDiv = this.sliderDiv
            activeSlider.track = track
            this.dragging = true
            thumb.style.width = '1.4rem'
            thumb.style.height = '1.4rem'
        }

        this.sliderDiv.onmousedown = (event) => {
            event.preventDefault()
            activeSlider = this
            activeSlider.dragging = true
            activeSlider.thumb = thumb
            let thumbRect = thumb.getBoundingClientRect()
            let clickedInsideThumbRect = false
            if (event.clientX >= thumbRect.left && event.clientX <= thumbRect.right && event.clientY >= thumbRect.top && event.clientY <= thumbRect.bottom) {
                clickedInsideThumbRect = true
            }
            if (!clickedInsideThumbRect) {
            activeSlider.sliderDiv = this.sliderDiv
            activeSlider.track = track
            let right = `${(100 - ((event.clientX - track.getBoundingClientRect().left) / track.getBoundingClientRect().width) * 100) - 12}`
            if (right < 10) right = 10
            if (right > 100) right = 100
            let scaledPercent = Math.ceil((right * 1.1) - 10 - 1)
            if (scaledPercent > 100) scaledPercent = 100
            let colormix = `color-mix(in oklab,var(--slider-0) ${scaledPercent}%,var(--slider-1))`
            thumb.style.backgroundColor = colormix
            activeSlider.thumb.style.right = `${right}%`
            }
        }


        childDiv.appendChild(thumb)

        this.sliderDiv.appendChild(childDiv)
    }
}

document.onmouseup = (event) => {
    if (activeSlider) {
        activeSlider.dragging = false
        activeSlider.thumb.style.width = '1.25rem'
        activeSlider.thumb.style.height = '1.25rem'
        activeSlider = null
    }
}

document.onmousemove = (event) => {
    if (activeSlider?.dragging) {
        event.preventDefault()
        activeSlider.thumb.style.width = '1.4rem'
        activeSlider.thumb.style.height = '1.4rem'

        let rect = activeSlider.track.getBoundingClientRect()
        let clientX = event.clientX
        let percent = ((clientX - rect.left) / rect.width) * 100
        if (percent < 10) percent = 10
        if (percent > 100 ) percent = 100

        let scaledPercent = Math.ceil((percent * 1.1) - 10 - 1)

        let colormix = `color-mix(in oklab,var(--slider-0) ${scaledPercent}%,var(--slider-1))`
        activeSlider.thumb.style.right = `${100 - percent}%`
        activeSlider.thumb.style.backgroundColor = colormix
        activeSlider.onchange(scaledPercent)
    }
}

export default CustomRangeSlider