const createNewObject = async (
    subtype, familiarName
) => {
    console.log('creating new object')
    console.log(subtype)
    let url = 'http://localhost:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    

    if (subtype){
        if (subtype === 'weapon'){
            body.queue = [
                {
                    model: 'objectWeapon',
                    method: 'create',
                }
            ]
        } else if (subtype === 'gift'){
            body.queue = [
                {
                    model: 'objectGift',
                    method: 'create',
                }
            ]
        } else if (subtype === 'consumable'){
            body.queue = [
                {
                    model: 'objectConsumable',
                    method: 'create',
                }
            ]
        } else if (subtype === 'equipable'){
            body.queue = [
                {
                    model: 'objectEquipable',
                    method: 'create',
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

export default createNewObject