import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

const weaponTrianglesPopup = () => {
    let innerHtml = ``
    w2popup.open({
        title: 'Weapon/magic triangles',
        body: innerHtml,
        actions: ['Ok']
    }).ok((e) => {
        w2popup.close()
    })
}

window.GameEditorWeaponTrianglesPopup = weaponTrianglesPopup

export default weaponTrianglesPopup