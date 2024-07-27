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
        let data = await response.json()
        let dataObject = {all: data, objectWeapons: [], objectConsumables: [], objectEquipables: [], objectGifts: [], objectMagic: []}
        lastPull = now
        pulled = true       
        
        console.log(dataObject)
        try {
            
        data.forEach(object => {
            if (object.subtype === 'Weapon'){
                dataObject.objectWeapons.push(object)
            } else if (object.subtype === 'Consumable'){
                dataObject.objectConsumables.push(object)
            } else if (object.subtype === 'Equipable'){
                dataObject.objectEquipables.push(object)
            } else if (object.subtype === 'Gift'){
                dataObject.objectGifts.push(object)
            } else if (object.subtype === 'Magic'){
                dataObject.objectMagic.push(object)
            }
        })
        return dataObject
    } catch(e){
        console.error(e)
        return {
            objectWeapons: [],
            objectConsumables: [],
            objectEquipables: [],
            objectGifts: [],
            objectMagic: [],
            all: []
        }
    }
    } else {
        return {
            objectWeapons: [],
            objectConsumables: [],
            objectEquipables: [],
            objectGifts: [],
            objectMagic: [],
            all: []
        }
    }
}

export default getAllObjects

