let lastPull = new Date()
let pulled = false 

const getImagesIconComponents = async() => {

    console.log('getting all images:iconComponents')
    let url = 'http://localhost:26068/data'

    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.queue = [
        {
            model: 'Images',
            method: 'getImagesByType'
        }
    ]
    body.type = 'iconComponents'
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }
    let now = new Date()
    if (now - lastPull < 10000 && pulled === true){
        if (window.allIcons){return window.allIcons} else {return []}
    } 

    let response = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok){
        lastPull = now
        pulled = true       
        return response.json()
    } else {
        console.error(response)
        return []
    }
}

export default getImagesIconComponents

