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
        this.coloredRange()
        this.dragging = false
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
        thumb.className = 'no-transition'
        thumb.style.width = '1.25rem'
        thumb.style.height = '1.25rem'
        thumb.style.borderRadius = '.25rem'
        thumb.style.position = 'absolute'
        thumb.style.left = `${this.value}%`
        thumb.style.backgroundColor = `var(--slider-0)`

        thumb.onmousedown = (event) => {
            event.preventDefault()
            activeSlider = this
            activeSlider.thumb = thumb
            activeSlider.track = track
            this.dragging = true
            thumb.style.width = '1.4rem'
            thumb.style.height = '1.4rem'
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
        let x = event.clientX - rect.left
        let percent = Math.round(x / rect.width * 100)
        if (percent < 5) percent = 5
        if (percent > 94) percent = 94
        activeSlider.thumb.style.left = `${percent}%`
        let colormix = `color-mix(in oklab,var(--slider-0) ${percent}%,var(--slider-1))`
        activeSlider.thumb.style.backgroundColor = colormix
        let scaledPercent = Math.floor(percent * (100 / 89) - 5)
        activeSlider.onchange(scaledPercent)
    }
}

export default CustomRangeSlider