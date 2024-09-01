const importTilesets = () => {
    if (!window.BattlefieldEditorTilesetsUnparsed) return
    try {
        window.BattlefieldEditorTilesetsUnparsed.forEach(tileset => {
            tileset.sheets.forEach(sheet => {
                if (window.BattlefieldEditorTilesetsSheets && window.BattlefieldEditorTilesetsSheets[sheet.name]) return
                fetch(sheet.path)
                    .then(response => response.json())
                    .then(data => {
                        console.log(sheet.name)
                        window.BattlefieldEditorTilesetsSheets[sheet.name] = data
                        let i = -1
                        data.forEach(tile => {
                            i++
                            let path = sheet.path.split('/')
                            path.pop()
                            path = path.join('/')
                            path += '/' + tile.name
                            fetch(path)
                                .then(response => response.blob())
                                .then(blob => {
                                    let url = URL.createObjectURL(blob)
                                    tile.image = url
                                    window.BattlefieldEditorTilesetsSheets[sheet.name][i] = tile
                                })
                                .catch(err => console.error(err))
                        })
                    })
                    .catch(err => console.error(err))
            })
        })
        window.BattlefieldEditorTilesets = window.BattlefieldEditorTilesetsUnparsed
    } catch (err) {
        console.error(err)
    }
}

window.BattlefieldEditorImportTilesets = importTilesets

export default importTilesets