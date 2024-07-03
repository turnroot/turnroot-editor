import handleEvent from '../functions/handleRelationship.js'
import {w2form} from '../../../lib/w2ui.es6.min.js'

let relationship = new w2form({
    name: 'unit-editor-relationship-fields',
    fields: [
        {
            field: '',
            type: 'html',
            html: {
                html: '<h1>Relationships</h1>',
            }
        },
        {
            field: '',
            type: 'html',
            html: {
                html: '<h2>Max supports</h2>',
                column: 0,
            }
        },
        {
            field: 'html',
            type: 'html',
            html: {
                html: '',
                column: 0
            }
        },
        {
            field: '',
            type: 'html',
            html: {
                html: '<h2 style="margin-top:2.8rem;">Support speed</h2>',
                column: 1,
            }
        },
        {
            field: 'html',
            type: 'html',
            html: {
                html: '',
                column: 1
            }
        },
    ],
    record: {}
})

window.unitEditorRelationshipFields = relationship

export default relationship