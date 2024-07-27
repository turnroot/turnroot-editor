let lastPull = new Date()
let pulled = false 

const getAllObjects = async() => {

    console.log('getting all objects')
    let url = 'http://localhost:26068/data'

    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.queue = [
        {
            model: 'Object',
            method: 'getObjects'
        }
    ]
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }
    let now = new Date()
    if (now - lastPull < 10000 && pulled === true){
        if (window.allObjects){return window.allObjects} else {return {objectWeapons: [],
            objectConsumables: [],
            objectEquipables: [],
            objectGifts: [],
            all: []}}
    } 

    let response = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok){
        lastPull = now
        pulled = true       
        if (!response.objectWeapons){
            response.objectWeapons = []
        }
        if (!response.objectConsumables){
            response.objectConsumables = []
        }
        if (!response.objectEquipables){
            response.objectEquipables = []
        }
        if (!response.objectGifts){
            response.objectGifts = []
        }
        if (!response.json){
            response.json = []
        }
        try {
            
        response.json.forEach(object => {
            if (object.subtype === 'Weapon'){
                response.objectWeapons.push(object)
            } else if (object.subtype === 'Consumable'){
                response.objectConsumables.push(object)
            } else if (object.subtype === 'Equipable'){
                response.objectEquipables.push(object)
            } else if (object.subtype === 'Gift'){
                response.objectGifts.push(object)
            }
        })
        response.json.all = response.json.objectWeapons.concat(response.json.objectConsumables, response.json.objectEquipables, response.json.objectGifts)
        return response.json()
    } catch(e){
        console.error(e)
        return {
            objectWeapons: [],
            objectConsumables: [],
            objectEquipables: [],
            objectGifts: [],
            all: []
        }
    }
    } else {
        return {
            objectWeapons: [],
            objectConsumables: [],
            objectEquipables: [],
            objectGifts: [],
            all: []
        }
    }
}

export default getAllObjects

