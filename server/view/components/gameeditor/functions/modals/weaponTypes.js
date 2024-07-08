import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

const weaponTypesPopup = () => {
    let innerHtml = ``
    w2popup.open({
        title: 'Weapon Types',
        body: innerHtml,
        actions: ['Ok']
    }).ok((e) => {
        w2popup.close()
    })
}

window.GameEditorWeaponTypesPopup = weaponTypesPopup

export default weaponTypesPopup