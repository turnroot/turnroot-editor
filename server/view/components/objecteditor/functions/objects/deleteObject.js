const deleteObject = async (
    id
) => {
    console.log('deleting object')
    let url = 'http://localhost:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    
    let subtype = window.currentObject.subtype
    if (subtype){
        if (subtype === 'weapon'){
            body.queue = [
                {
                    model: 'objectWeapon',
                    method: 'delete',
                    id: id
                }
            ]
        } else if (subtype === 'gift'){
            body.queue = [
                {
                    model: 'objectGift',
                    method: 'delete',
                    id: id
                }
            ]
        } else if (subtype === 'consumable'){
            body.queue = [
                {
                    model: 'objectConsumable',
                    method: 'delete',
                    id: id
                }
            ]
        } else if (subtype === 'equipable'){
            body.queue = [
                {
                    model: 'objectEquipable',
                    method: 'delete',
                    id: id
                }
            ]
        }
    } else {return w2alert('Error: no subtype provided')}
    console.log(body)
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }

    let response  = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok){
        let data = await response.json()
        console.log(data)
        return data
    } else {
        return w2alert('Error: invalid response from schemas server')
    }
}

export default deleteObject