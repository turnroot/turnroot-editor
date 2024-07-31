class ImageIconComponentPicker {
    constructor(coords, icons) {
        this.coords = coords
        this.image = icons
        this.images = []
        this.selectedImage = null
        this.imagePromise = new Promise((resolve) => {
            this.resolveImage = resolve
        })
    }

    show() {
        let overlay = document.createElement('div')
        overlay.id = 'ImageIconComponentPicker-overlay'
        overlay.style.position = 'fixed'
        overlay.style.top = '0'
        overlay.style.left = '0'
        overlay.style.width = '100%'
        overlay.style.height = '100%'
        overlay.style.zIndex = '9998'
        overlay.style.display = 'block'
        document.body.appendChild(overlay)
    

        overlay.addEventListener('click', () => {
            this.close()
        })
        let display = document.createElement('div')
        display.id = 'ImageIconComponentPicker-display'
        display.style.width = '560px'
        display.style.height = '500px'
        display.style.position = 'fixed'
        display.style.zIndex = '9999'
        display.style.top = this.coords.y + 'px'
        display.style.left = this.coords.x + 'px'
        display.style.backgroundColor = 'var(--node-title-background)'
        display.style.overflowX = 'hidden'
        display.style.overflowY = 'auto'
        display.style.borderRadius = '5px'

        let searchInput = document.createElement('input')
        searchInput.className = 'w2ui-input'
        searchInput.type = 'text'
        searchInput.placeholder = 'Search images'
        searchInput.style.marginBottom = '10px'
        searchInput.style.width = 'calc(100% - 20px)'
        searchInput.style.margin = '10px'
        searchInput.style.borderRadius = '5px'
        searchInput.style.color = 'var(--node-title)'
        display.appendChild(searchInput)

        let gridContainer = document.createElement('div')
        gridContainer.style.display = 'grid'
        gridContainer.style.gridTemplateColumns = 'repeat(5, 1fr)'
        gridContainer.style.gap = '10px'
        gridContainer.style.padding = '10px'
        display.appendChild(gridContainer)

        for (let icon of this.icons) {
            let image = document.createElement('img')
            image.src = icon.src
            image.alt = icon.name
            image.style.maxWidth = "100px"
            image.style.height = "100px"
            image.style.width = "auto"
            image.style.maxHeight = "100px"
            this.images.push(image)
            gridContainer.appendChild(image)
    
            image.addEventListener('click', () => {
                this.selectedImage = icon
                this.close()
                this.resolveImage(icon)
            })
        }

        searchInput.addEventListener('input', () => {
            let searchValue = searchInput.value.toLowerCase()
            if (searchValue === '') {
                for (let image of this.images) {
                    if (!gridContainer.contains(image)) {
                        gridContainer.appendChild(image)
                    }
                }
            }
            for (let image of this.images) {
                if (!image.alt.replace(/\s+/g, '').toLowerCase().includes(searchValue.replace(/\s+/g, ''))) {
                    gridContainer.removeChild(image)
                } else if (!gridContainer.contains(image)) {
                    gridContainer.appendChild(image)
                }
            }
        })
        document.body.appendChild(display)
    }

    close() {
        let display = document.getElementById('ImageIconComponentPicker-display')
        if (display) {
            display.remove()
            let overlay = document.getElementById('ImageIconComponentPicker-overlay')
            if (overlay) {
                overlay.remove()
            }
        }
    }

    icon() {
        return this.iconPromise
    }
}

export default ImageIconComponentPicker