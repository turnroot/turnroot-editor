const initQueue = () => {
    window.editsQueue = {
        saved_at: Date.now(),
        queue: []
    }
}

const updateQueue = (key, value) => {
    let existing = window.editsQueue.queue.find(field => field.key === key)
    if (existing) {
        existing.value = value
    } else {
        window.editsQueue.queue.push({ key, value })
    }
}

export { initQueue, updateQueue}