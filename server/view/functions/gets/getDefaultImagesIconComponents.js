const getDefaultImagesIconComponents = async () => {
    let url = '/style/img/defaultAssets/iconComponents/images.json'
    let response = await fetch(url).catch(err => {
        console.error(err)
    })
    let imagesJson = await response.json()
    
    return imagesJson['images']['iconComponent']
}

export default getDefaultImagesIconComponents