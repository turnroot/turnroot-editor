const importTilesets = () => {
    if (!window.BattlefieldEditorTilesetsUnparsed) return
    try {
        window.BattlefieldEditorTilesetsUnparsed.forEach(tileset => {
            tileset.sheets.forEach(sheet => {
                if (window.BattlefieldEditorImportTilesets && window.BattlefieldEditorTilesets[sheet.name]) return
                fetch(sheet.path)
                    .then(response => response.json())
                    .then(data => {
                        console.log(sheet.name)
                        window.BattlefieldEditorTilesets[sheet.name] = data
                        window.BattlefieldEditorTilesetsResolution[sheet.name] = sheet.square_size
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
                                    window.BattlefieldEditorTilesets[sheet.name][i] = tile
                                })
                                .catch(err => console.error(err))
                        })
                    })
                    .catch(err => console.error(err))
            })
        })
    } catch (err) {
        console.error(err)
    }
}

window.BattlefieldEditorImportTilesets = importTilesets

export default importTilesets