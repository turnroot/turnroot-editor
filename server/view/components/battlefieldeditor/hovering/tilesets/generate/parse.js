import { w2alert, w2toolbar } from '../../../../../../view/lib/w2ui.es6.min.js'

const importTilesets = () => {
    if (!window.BattlefieldEditorTilesetsUnparsed) {
        w2alert('No tilesets were found. Since a default tileset is included, check your internet connection.', 'Fatal Connection Error')
        console.error('window.BattlefieldEditorTilesetsUnparsed is not defined')
        return
    }

    // Initialize BattlefieldEditorTilesetsSheets if not already defined
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
                                    tile.image = url
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
    let leftHtml = `<h4 style="margin:4px 0padding:4px 0border-bottom:solid 1px var(--list-background)">Tilesets</h4>`
    let i = -1
    window.BattlefieldEditorTilesets.forEach(tileset => {
        i++
        let style = i === 0
            ? "background-color:var(--node-title-background)display:flexjustify-content:space-betweenalign-items:center"
            : "display:flexjustify-content:space-betweenalign-items:center"
        leftHtml += `<div class="tileset" style="${style}">
            <p style="margin:0padding:0">${tileset.name}</p>
        </div>`
    })
    window.BattlefieldEditorTilesetsBoxLayout.html('left', leftHtml)

    let toolbarButtons = []
    i = -1
    window.BattlefieldEditorTilesets[0].sheets.forEach(sheet => {
        i++
        toolbarButtons.push({
            type: 'radio',
            group: '1',
            id: `battlefield-editor-tilesets-toolbar-${sheet.name}`,
            text: sheet.name,
            class: 'panel-tabs',
            checked: i === 0
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
            window.BattlefieldEditorActiveTilesetSheetName = window.BattlefieldEditorTilesets[0].sheets[0].name
            window.BattlefieldEditorActiveTilesetSheet = window.BattlefieldEditorTilesetsSheets[window.BattlefieldEditorActiveTilesetSheetName]

            let maxColumns = window.BattlefieldEditorTilesets[0].sheets[0].columns

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

                div.style.gridColumn = column
                div.style.gridRow = row
                tileContainer.appendChild(div)
            })

            BattlefieldEditorTilesetsLayoutMain.html('main', tileContainer)
        }
    } else {
        console.error('window.BattlefieldEditorTilesetsSheets is not currently defined')
    }
}

window.BattlefieldEditorImportTilesets = importTilesets
window.BattlefieldEditorImportTilesetsSecondHalf = secondHalf

export default importTilesets