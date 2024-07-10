import {w2popup} from '../../../../lib/w2ui.es6.min.js'
import Triangle from '../../../utils/triangle.js'

window.w2popup = w2popup

const weaponTrianglesPopup = () => {
    let fields = [
        {
            id: 'GameEditorWeaponTriangleFieldsTopCorner',
            el: 'topCorner',
            type: 'select',
            options: globalWeaponsTypes[0].types.map(t => {
                return {id: t.id, text: t.name}
            }),
        }
    ]

    if (GameEditorWeaponTriangleFieldsTopCorner){
        fields[0].selected = GameEditorWeaponTriangleFieldsTopCorner
    } else {
        fields[0].selected = []
    }

    let triangle = Triangle(3.5, 'var(--window-background)', 'var(--window-background-alt)', fields)
    
    let innerHtml = triangle.html
    console.log(triangle)
    w2popup.open({
        title: 'Weapon/magic triangles',
        body: innerHtml,
        actions: ['Ok'],
        height:500,
    }).ok((e) => {
        w2popup.close()
    })
}

window.GameEditorWeaponTrianglesPopup = weaponTrianglesPopup

export default weaponTrianglesPopup