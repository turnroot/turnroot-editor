
const getAllUnits = async() => {
    let url = 'http://127.0.0.1:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.queue = [
        {
            model: 'Person',
            method: 'getPeople'
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
    if (response.data){
        return response.data
    } else {
        return []
    }
}

export default getAllUnits

