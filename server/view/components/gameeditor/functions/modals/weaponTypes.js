import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

const weaponTypesPopup = () => {
    let innerHtml = `<button class="w2ui-btn accent" onclick="window.w2popup.close()">Ok</button>`
    w2popup.open({
        title: 'Weapon Types',
        body: innerHtml,
    })
}

window.GameEditorWeaponTypesPopup = weaponTypesPopup

export default weaponTypesPopup