import {
    w2alert
} from '../../../lib/w2ui.es6.min.js'

let allFriendlyOrRecruitableUnits = []

const getAllFriendlyOrRecruitableUnits = async() => {
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
        allFriendlyOrRecruitableUnits = response.data
    }
}

getAllFriendlyOrRecruitableUnits()

const handleEvent = (event, form) => {
    let field = event.detail.field
    let value = event.detail.value

    window.turnrootEditorLogs.push(`${new Date()}||info||Relationship field ${field} requested change to ${value.current}`)
}

export default handleEvent