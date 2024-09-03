import { w2alert, w2toolbar } from '../../../../../../view/lib/w2ui.es6.min.js'

const importTilesets = () => {

    if (!window.BattlefieldEditorActiveTilesetIndex) {
        window.BattlefieldEditorActiveTilesetIndex = 0
    }

    if (!window.BattlefieldEditorActiveTilesetSheetIndex) {
        window.BattlefieldEditorActiveTilesetSheetIndex = 0
    }

    if (!window.BattlefieldEditorTilesetsUnparsed) {
        w2alert('No tilesets were found. Since a default tileset is included, check your internet connection.', 'Fatal Connection Error')
        console.error('window.BattlefieldEditorTilesetsUnparsed is not defined')
        return
    }

    if (!window.BattlefieldEditorTilesetsSheets) {
        window.BattlefieldEditorTilesetsSheets = {}
    }

    const fetchPromises = []

    try {
        BattlefieldEditorTilesetsLayoutMain.html('main', 'Loading...')
        BattlefieldEditorTilesetsLayoutMain.html('bottom', '')
        window.BattlefieldEditorTilesetsUnparsed.forEach(tileset => {
            tileset.sheets.forEach(sheet => {
                if (window.BattlefieldEditorTilesetsSheets[sheet.name]) {
                    console.log('Sheet already loaded')
                    return
                }

                const fetchSheetPromise = fetch(sheet.path)
                    .then(response => response.json())
                    .then(data => {
                        console.log(sheet.name)
                        window.BattlefieldEditorTilesetsSheets[sheet.name] = data

                        const tileFetchPromises = data.map((tile, i) => {
                            let path = sheet.path.split('/')
                            path.pop()
                            path = path.join('/')
                            path += '/' + tile.name

                            return fetch(path)
                                .then(response => response.blob())
                                .then(blob => {
                                    let url = URL.createObjectURL(blob)
                                    let reader = new FileReader()
                                    reader.readAsDataURL(blob)
                                    reader.onloadend = () => {
                                        tile.image = reader.result
                                    }
                                    window.BattlefieldEditorTilesetsSheets[sheet.name][i] = tile
                                })
                                .catch(err => console.error(err))
                        })

                        return Promise.all(tileFetchPromises)
                    })
                    .catch(err => console.error(err))

                fetchPromises.push(fetchSheetPromise)
            })
        })

        Promise.all(fetchPromises)
            .then(() => {
                window.BattlefieldEditorTilesets = window.BattlefieldEditorTilesetsUnparsed
                secondHalf()
            })
            .catch(err => console.error(err))

    } catch (err) {
        console.error(err)
    }
}

const secondHalf = () => {
    let leftHtml = `<h4 style="margin:4px 0;padding:4px 0;border-bottom:solid 1px var(--list-background)">Tilesets</h4>`
    let i = -1
    window.BattlefieldEditorTilesets.forEach(tileset => {
        i++
        let style = i === window.BattlefieldEditorActiveTilesetIndex
            ? "background-color:var(--node-title-background);display:flex;justify-content:space-between;align-items:center"
            : "display:flex;justify-content:space-between;align-items:center"
        leftHtml += `<div class="tileset" style="${style}">
            <p style="margin:0;padding:0" onclick = "window.BattlefieldEditorChangeTileset(${i})>${tileset.name}"</p>
        </div>`
    })
    window.BattlefieldEditorTilesetsBoxLayout.html('left', leftHtml)

    let toolbarButtons = []
    i = -1
    window.BattlefieldEditorTilesets[window.BattlefieldEditorActiveTilesetIndex].sheets.forEach(sheet => {
        i++
        toolbarButtons.push({
            type: 'radio',
            group: '1',
            id: `battlefield-editor-tilesets-toolbar-${sheet.name}`,
            text: sheet.name,
            class: 'panel-tabs',
            checked: i === window.BattlefieldEditorActiveTilesetSheetIndex,
            onClick: (function(index) {
                return function() {
                    window.BattlefieldEditorChangeSheet(index)
                }
            })(i)
        })
    })

    let toolbar = new w2toolbar({
        name: 'battlefield-editor-tilesets-toolbar',
        items: toolbarButtons,
        onClick(event) {
            console.log(event)
        }
    })

    BattlefieldEditorTilesetsLayoutMain.html('bottom', toolbar)

    if (Object.keys(window.BattlefieldEditorTilesetsSheets).length > 0) {
        if (window.BattlefieldEditorTilesets) {
            window.BattlefieldEditorActiveTilesetSheetName = window.BattlefieldEditorTilesets[window.BattlefieldEditorActiveTilesetIndex].sheets[window.BattlefieldEditorActiveTilesetSheetIndex].name
            window.BattlefieldEditorActiveTilesetSheet = window.BattlefieldEditorTilesetsSheets[window.BattlefieldEditorActiveTilesetSheetName]

            let maxColumns = window.BattlefieldEditorTilesets[window.BattlefieldEditorActiveTilesetIndex].sheets[window.BattlefieldEditorActiveTilesetSheetIndex].columns

            let tileContainer = document.createElement('div')
            tileContainer.style.display = 'grid'
            tileContainer.style.gridTemplateColumns = `repeat(${maxColumns}, 64px)`
            window.BattlefieldEditorTilesetsBox.style.width = `calc(${maxColumns * 64}px + 7rem)`

            window.BattlefieldEditorActiveTilesetSheet.forEach(tile => {
                let row = tile.name.split('_')[1]
                let column = tile.name.split('_')[2]
                let div = document.createElement('div')
                div.style.width = '64px'
                div.style.height = '64px'
                div.style.backgroundImage = `url(${tile.image})`
                div.style.backgroundSize = '64px'
                div.style.cursor = 'pointer'

                div.ariaLabel = tile.type
                div.setAttribute('data-balloon-pos', 'up')

                div.style.gridColumn = column
                div.style.gridRow = row

                div.onmouseenter = () => {
                    if (div.active) return
                    div.style.border = 'solid 1px var(--accent)'
                }

                div.onmouseout = () => {
                    if (div.active) return
                    div.style.border = 'none'
                }

                div.onclick = () => {
                    window.BattlefieldEditorTileInfo = {
                        glyph: div.style.backgroundImage,
                        type: tile.type,
                        name: tile.name,
                        sheet: window.BattlefieldEditorActiveTilesetSheetName,
                        tileset: window.BattlefieldEditorTilesets[window.BattlefieldEditorActiveTilesetIndex].name
                    }
                    div.style.border = 'solid 3px var(--slider-1)'
                    div.style.opacity = 1
                    div.active = true

                    let otherDivs = tileContainer.querySelectorAll('div')
                    otherDivs.forEach(otherDiv => {
                        if (otherDiv !== div) {
                            otherDiv.style.border = 'none'
                            otherDiv.style.opacity = .5
                            otherDiv.active = false
                        }
                    })
                }

                div.ondblclick = () => {
                    window.BattlefieldEditorTileInfo = {}
                    let divs = tileContainer.querySelectorAll('div')
                    divs.forEach(d => {
                        d.style.opacity = 1
                        d.active = false
                        d.style.border = 'none'
                    })
                }

                tileContainer.appendChild(div)
            })

            BattlefieldEditorTilesetsLayoutMain.html('main', tileContainer)
            window.BattlefieldEditorTilesetsLayoutTileContainer = tileContainer
        }
    } else {
        console.error('window.BattlefieldEditorTilesetsSheets is not currently defined')
    }
}

window.BattlefieldEditorImportTilesets = importTilesets
window.BattlefieldEditorImportTilesetsSecondHalf = secondHalf

window.BattlefieldEditorChangeSheet = (index) => {
    window.BattlefieldEditorActiveTilesetSheetIndex = index
    window.BattlefieldEditorImportTilesetsSecondHalf()
}

window.BattlefieldEditorChangeTileset = (index) => {
    window.BattlefieldEditorActiveTilesetIndex = index
    window.BattlefieldEditorImportTilesetsSecondHalf()
}

export default importTilesets