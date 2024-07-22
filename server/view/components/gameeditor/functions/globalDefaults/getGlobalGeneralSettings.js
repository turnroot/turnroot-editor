const getGlobalGeneralSettings = async() => {

    console.log('getting game general settings')
    let url = 'http://localhost:26068/data'

    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.queue = [
        {
            model: 'generalSettings',
            method: 'get'
        }
    ]
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }

    let response = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok){     
        return response.json()
    } else {
        return []
    }
}

export default getGlobalGeneralSettings

