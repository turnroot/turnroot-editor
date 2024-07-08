import {w2popup} from '../../../../lib/w2ui.es6.min.js'

window.w2popup = w2popup

const magicTypesPopup = () => {
    let innerHtml = ``
    w2popup.open({
        title: 'Magic Types',
        body: innerHtml,
        actions: ['Ok']
    }).ok((e) => {
        w2popup.close()
    })
}

window.GameEditorMagicTypesPopup = magicTypesPopup

export default magicTypesPopup