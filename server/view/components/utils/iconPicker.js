class IconPicker {
    constructor(coords, icons) {
        this.coords = coords
        this.icons = icons
        this.images = []
        this.selectedIcon = null
        this.iconPromise = new Promise((resolve) => {
            this.resolveIcon = resolve
        })
    }

    show() {
        let overlay = document.createElement('div')
        overlay.id = 'IconPicker-overlay'
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
        display.id = 'IconPicker-display'
        display.style.width = '340px'
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
        searchInput.placeholder = 'Search icons'
        searchInput.style.marginBottom = '10px'
        searchInput.style.width = 'calc(100% - 20px)'
        searchInput.style.margin = '10px'
        searchInput.style.borderRadius = '5px'
        searchInput.style.color = 'var(--node-title)'
        display.appendChild(searchInput)

        let gridContainer = document.createElement('div')
        gridContainer.style.display = 'grid'
        gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)'
        gridContainer.style.gap = '10px'
        gridContainer.style.padding = '10px'
        display.appendChild(gridContainer)

        let addIcon = document.createElement('button')
        addIcon.style.width = '100px'
        addIcon.style.border = 'none'
        addIcon.style.borderRadius = '5px'
        addIcon.style.fontSize = '4rem'
        addIcon.style.fontWeight = 'bold'
        addIcon.style.appearance = 'none'
        addIcon.style.cursor = 'pointer'
        addIcon.style.outline = 'none'
        addIcon.style.height = '100px'
        addIcon.style.backgroundColor = 'var(--accent)'
        addIcon.style.color = 'white'
        addIcon.innerText = '+'
        addIcon.style.transition = 'filter .2s'
        addIcon.ariaLabel = 'Create new icon'
        addIcon.setAttribute('data-balloon-pos', 'right')

        addIcon.addEventListener('mouseenter', () => {
            addIcon.style.filter = 'brightness(.9)'
        })
        addIcon.addEventListener('mouseleave', () => {
            addIcon.style.filter = 'unset'
        })

        addIcon.addEventListener('click', () => {
            this.close()
            if (window.EditorWindowSidebar.get('sidebar-editors-visuals-list').expanded === false){
                window.EditorWindowSidebar.get('sidebar-editors-visuals-list').expanded = true
                window.EditorWindowSidebar.refresh()
            }
            window.EditorWindowSidebar.click('sidebar-editors-icons-editor')
            window.iconPickerReturnIconTo = window.currentObject
        })

        gridContainer.appendChild(addIcon)

        for (let icon of this.icons) {
            let image = document.createElement('img')
            image.src = icon.src
            image.alt = icon.name
            image.style.width = '100px'
            image.style.height = '100px'
            this.images.push(image)
            gridContainer.appendChild(image)
    
            image.addEventListener('click', () => {
                this.selectedIcon = icon
                this.close()
                this.resolveIcon(icon)
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
        let display = document.getElementById('IconPicker-display')
        if (display) {
            display.remove()
            let overlay = document.getElementById('IconPicker-overlay')
            if (overlay) {
                overlay.remove()
            }
        }
    }

    icon() {
        return this.iconPromise
    }
}

export default IconPicker