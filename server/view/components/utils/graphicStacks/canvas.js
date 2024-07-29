function createCanvas() {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 800
    
    function stackImages(images) {
        images.forEach((image) => {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
        })
    }
    
    return {
        canvas,
        context,
        stackImages
    }
}