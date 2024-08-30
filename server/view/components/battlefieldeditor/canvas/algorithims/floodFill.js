const floodFill = (x, y, layer, tileInfo) => {
    let currentState = JSON.parse(JSON.stringify(layer.tiles))
    let startTile = layer.tiles[x][y]
    let seekers = new Set([startTile])
    let visited = new Set()

    while (seekers.size > 0){
        seekers.forEach(seeker => {
            let cardinals = {
                north: layer.tiles[seeker.x][seeker.y - 1],
                south: layer.tiles[seeker.x][seeker.y + 1],
                east: layer.tiles[seeker.x + 1][seeker.y],
                west: layer.tiles[seeker.x - 1][seeker.y]
            }
            if (cardinals.north && !(cardinals.north.filled) && !visited.has(cardinals.north)){
                seekers.add(cardinals.north)
            } 
            if (cardinals.south && !(cardinals.south.filled) && !visited.has(cardinals.south)){
                seekers.add(cardinals.south)
            }
            if (cardinals.east && !(cardinals.east.filled) && !visited.has(cardinals.east)){
                seekers.add(cardinals.east)
            }
            if (cardinals.west && !(cardinals.west.filled) && !visited.has(cardinals.west)){
                seekers.add(cardinals.west)
            }

            seeker.fill(tileInfo)
            visited.add(seeker)
            seekers.delete(seeker)
        })
    }

    let finalState = JSON.parse(JSON.stringify(layer.tiles))
    
    return {
        currentState,
        finalState
    }
}

export default floodFill