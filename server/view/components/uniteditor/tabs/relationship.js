import handleEvent from '../functions/handleRelationship.js'
import {w2form} from '../../../lib/w2ui.es6.min.js'

let relationship = new w2form({
    name: 'unit-editor-relationship-fields',
    fields: [
        {
            field: 'html',
            type: 'html',
            html: {
                html: ''
            }
        }
    ],
    record: {}
})

window.unitEditorRelationshipFields = relationship

export default relationship