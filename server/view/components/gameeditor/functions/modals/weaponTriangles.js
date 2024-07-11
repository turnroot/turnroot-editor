import {w2alert, w2popup, w2toolbar, w2layout, w2ui} from '../../../../lib/w2ui.es6.min.js'
import Triangle from '../../../utils/triangle.js'

window.w2popup = w2popup

const buildPopup = () => {

    let config = [
        {type: 'radio', group: '1', id: 'game-editor-weapon-magic-triangles-popup-weapons', text: 'Weapons', class: 'panel-tabs', checked: true},
        {type: 'radio', group: '1', id: 'game-editor-weapon-magic-triangles-popup-magic', text: 'Magic', class: 'panel-tabs'},
    ]

    let layout = new w2layout({
        name: 'GameEditorWeaponMagicTrianglesPopupLayout',
        panels: [
            { type: 'main', content: 'main', 
            toolbar: {
                items: config,
                onClick(event) {
                    console.log(event.target)
                }
            }}
        ],
        style: 'height:100%'
    })
    return layout
}

const weaponTrianglesPopup = () => {
    let div = document.createElement('div')
    div.style.height="100%"
    div.style.width="100%"
    let layout = buildPopup()
    
    let fields = [
        {
            id: 'GameEditorWeaponTriangleFieldsTopCorner',
            el: 'topCorner',
            type: 'select',
            options: globalWeaponsTypes[0].types.map(t => {
                return {id: t.id, text: t.name}
            }),
            selected: GameEditorWeaponTriangleFieldsTopCorner && GameEditorWeaponTriangleFieldsTopCorner.length > 0 ? GameEditorWeaponTriangleFieldsTopCorner : []
        },
        {
            id: 'GameEditorWeaponTriangleFieldsLeftCorner',
            el: 'leftCorner',
            type: 'select',
            options: globalWeaponsTypes[0].types.map(t => {
                return {id: t.id, text: t.name}
            }),
            selected: GameEditorWeaponTriangleFieldsLeftCorner  && GameEditorWeaponTriangleFieldsLeftCorner? GameEditorWeaponTriangleFieldsLeftCorner : []
        },
        {
            id: 'GameEditorWeaponTriangleFieldsRightCorner',
            el: 'rightCorner',
            type: 'select',
            options: globalWeaponsTypes[0].types.map(t => {
                return {id: t.id, text: t.name}
            }),
            selected: GameEditorWeaponTriangleFieldsRightCorner && GameEditorWeaponTriangleFieldsRightCorner.length > 0 ? GameEditorWeaponTriangleFieldsRightCorner : []
        },
    ]

    let triangle = Triangle(3.5, 'var(--window-background)', 'var(--window-background-alt)', fields)

    let innerHtml = triangle.html

    layout.html('main', innerHtml)
    layout.render(div)
    window.GameEditorWeaponMagicTrianglesPopupLayout = layout

    let record = triangle.fields

    w2popup.open({
        title: 'Weapon/magic triangles',
        body: div,
        actions: ['Ok', 'Cancel'],
        height:500,
        width:500,
    }).ok((e) => {
        console.log(record)
        if (record.some(f => f.selected.length === 0)) {
            w2alert('All corners must have at least one type selected.')
            return
        }
        if (new Set(record.flatMap(f => f.selected)).size !== 3) {
            w2alert('All corners must have different types selected')
            return
        }
        w2popup.close()
        record.forEach(f => {
            window[f.id] = f.options.filter(o => o.selected).map(o => o.id)
            f.selected = f.options.filter(o => o.selected).map(o => o.id)
            console.log(f.selected)
        })
    }).cancel((e) => {
        w2popup.close()
    }).then(() => {
        GameEditorWeaponMagicTrianglesPopupLayout.panels[0].toolbar.refresh()
    })
}

window.GameEditorWeaponTrianglesPopup = weaponTrianglesPopup

export default weaponTrianglesPopup