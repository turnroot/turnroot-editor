const importTilesets = () => {
    if (!window.BattlefieldEditorTilesetsUnparsed) return
    try {
        window.BattlefieldEditorTilesetsUnparsed.forEach(tileset => {
            tileset.sheets.forEach(sheet => {
                fetch(sheet.path)
                    .then(response => response.json())
                    .then(data => {
                        console.log(sheet.name)
                        window.BattlefieldEditorTilesets[sheet.name] = data
                    })
                    .catch(error => {
                        console.error('Error fetching tileset:', error)
                    })
            })
        })
    } catch (e) {
        console.error(e)
    }
}

window.BattlefieldEditorImportTilesets = importTilesets

export default importTilesets